# skills.md — FenLab ve diğer projeler için çalışma prosedürleri

Claude (VS Code) için "nasıl yapılır" rehberi. `memory.md` kim/ne/neden, bu dosya nasıl. Yollar eski bilgisayara göredir; kullanıcı adı farklıysa uyarla.

## 1. Çalışma düzeni
1. "Yapabilir misin?" → önce cevap/plan, kod yok. "Başla/devam" → uygula.
2. Büyük işte kısa "anladığım" özeti yaz, sonra kodla.
3. İş bitince **derle → tur çalıştır → ekran görüntüsüne bak → rapor et**. Kanıtsız "bitti" deme.
4. Raporu üç parçaya böl: ne yapıldı, ne doğrulandı, neyi atladım/tahmin ettim. Sonda tek cümlelik sonraki adım.
5. Her tamamlanan iş grubunda Windows + WebGL + ChromeOS yayınla (sorma).

## 2. FenLab derleme
Proje: `Documents\FenLab\FenLab-Unity`. Unity: `C:\Program Files\Unity\Hub\Editor\6000.6.4f1\Editor\Unity.exe`. Aynı anda tek Unity örneği; kullanıcının açık FenLab.exe'si çıktıyı kilitler (kapatmasını iste).
```
# Windows
Unity.exe -batchmode -projectPath <proje> -executeMethod FenLab.EditorTools.BuildLab.BuildAll -quit -logFile ../unity_build_labNN.txt
# Web (>10 dk, arka planda çalıştır)
Unity.exe -batchmode -projectPath <proje> -executeMethod FenLab.EditorTools.BuildWebGLPlayer.Build -quit -logFile ../unity_build_webNN.txt
```
- Başarı: logda `Exiting batchmode successfully`. Hata: `grep "error CS"` (VBCSCompiler/ILPPTrigger gürültüsü hata değil; yalnızca pipe hatası varsa yeniden çalıştır).
- Terminal komutu ~400 sn'yi aşarsa zaman aşımı olur: uzun işi arka planda çalıştır, log'u 400 sn'den kısa döngülerle yokla.

## 3. Doğrulama (Unity'yi göremezsin)
- Tur: `Builds\Windows\FenLab.exe -fenlab-<mod> -screen-width 1280 -screen-height 720 -screen-fullscreen 0 -logFile X`. Modlar: `tests` (Faz 4-5 ve PhET ekranları), `sweep` (41 çekim), `labs2 [-live]`, `acts`, `menu`, `lessons`, `games`, `guide`, `social`, `tutdemo`... Çekimler `Builds\Windows\Shots\*.png`.
- Sonra `grep -ci exception <log>` = 0 olmalı ve PNG'lere görsel olarak bak (taşma, kesik yazı, üst üste binme).
- Build bitmeden tur başlatma; tur başında log "input init"te biterse bir kez daha çalıştır.
- Tur kodu (AutoShots.cs): adımları `t` + sahne sayacıyla sırala (bir karede birden çok çekim yapma). Dev kancası çağrısı ile Shot() ayrı adımlarda olmalı.
- Dil: ekran turu `-en` ile İngilizce, `-tr` ile Türkçe başlatır ve ayarı kalıcı yapar; testten sonra bir kez `-tr` ile aç.
- Web testi: `uv run --with playwright python _webtest.py` (Edge, swiftshader). Sayfa hatası `errors: []` olmalı.

## 4. Yayın
1. `git -c user.name="FenLab Dev" -c user.email=ahmed@fenlab.local commit ...`
2. Push: `GIT_TERMINAL_PROMPT=0 git -c credential.helper= -c "credential.helper=!gh auth git-credential" push origin HEAD`
3. Web: `python Tools/package_webgl.py <ver>` ("dpr cap applied" çıkmalı; sürümü HER web yayınında artır, yoksa service-worker eski kalır) → `Builds\WebGL` içeriğini `..\web_pub`'a kopyala → web_pub'da commit+push → ~60 sn sonra canlı siteyi kontrol et.
4. Windows: `python Tools/zip_release.py <ver> <önceki>` + `python Tools/make_installer.py <ver>` → `gh release create v<ver>-windows <setup.exe> <zip> --repo qlupala9p/FenLab`; ChromeOS: `gh release create v<ver>-chromeos <WebGL zip> --repo qlupala9p/FenLab`.
5. Site (Vercel): `cd site; mv .git ../site_git_tmp; vercel deploy --prod --yes; mv ../site_git_tmp .git` (repo yazarı Vercel üyesi değilse deploy engellenir).

## 5. Kod kuralları (IMGUI, tüm arayüz kodla çizilir)
- Yuvarlak şekil: `Rnd.Fill/Outline`. Animasyonlu alfayı nicemle (doku sızıntısı). Özel çizimde `GUI.color = Color.white` sıfırla.
- Yeni ekran = `UiMode` + `DrawOverlays` çağrısı + Esc/Geri + `DevXxx` test kancası + AutoShots turu. İlk karşılaşma kartları `GameProgress.Flag` ile.
- Modal altındaki ekranı `GUI.enabled=false` ile çiz, sonra modalı çiz.
- Ayrı Ensure*Styles() ile tembel oluşan stilleri başka ekrandan çizerken önce Ensure çağır (yoksa her karede NullReference).
- Metin: `Lang.T()` otomatik (FenLab.Lab içinde `GUI` shim'i etiketleri çevirir). Yeni UI metnini `Resources/lang_en.txt`'ye (Türkçe\tEnglish) ekle. WebGL fontunda eksik semboller için `WebTxt`; yeni glifi önce font cmap'inde kontrol et.
- Lab2 canlı katman: `F2Handle`, `F2Burst`, `F2Pop`, `F2OnTick/F2OnReset/F2Carry`; istasyon tick'ini sarmala (`var old = S.tick; S.tick = dt => { old(dt); ... }`).
- Animasyonlar zamanın saf fonksiyonudur (durum tutma).
- Web'de `Application.targetFrameRate` ayarlama; opak tam ekran UI altında 3B kamerayı kapat.

## 6. Python patch betikleri / dosya yazma
- Çok satırlı, tırnaklı yamaları bash heredoc ile değil, Python dosyasıyla yap (heredoc sessizce hiçbir şey çalıştırmayabilir). Çapa bulunamazsa assert/print et; sonra bir işaretçiyi grep'le doğrula.
- Dosyalar CRLF olabilir: değiştirmeden önce normalleştir.
- Mevcut dosyanın üzerine `write_file` reddedilebilir: yeni isme yaz, `cp -f` ile üzerine kopyala.

## 7. İçerik hatları
- Dersler: `Tools/lessons_v2/*.json` → `python Tools/build_lessons.py` → `LessonGenData.cs`. MEB kontrolü için kitap metinleri `..\mebbooks\*.txt`. Ajan yeniden yazdıktan sonra Türkçe karakter oranı < %1 ise bozuktur (ASCII Türkçe).
- Testler: testbank → `merge_tests.py` → `normalize_glyphs.py`.
- PhET: `Resources/phet_catalog.json` (71 sim, resmî Türkçe açıklama/kazanım) ve `phet_content.json` (tahmin, görev, 3 soruluk mini test). Kaynak: `phet.colorado.edu/services/metadata/1.2/simulations?format=json&type=html&locale=tr`. Lisans CC BY-NC 4.0; kaynak göster, PhET'i kopyalama. Web'de iframe (`FenAuth.jslib` içinde `FenPhetOpen`), Windows'ta tarayıcı.
- Hesap/bulut: Firebase proje `fen-lab-a58d7`, yalnızca Google girişi. Firestore kuralları `Tools/firestore.rules`; yayımlamak için servis hesabı anahtarı (`../secrets/`) ve `fb_admin.py deploy-rules`.
- Sosyal/sohbet/admin: `SocialJson.cs`, `LabGameSocialNet.cs`, `LabGameChat.cs`, site `api/*.js`. Değişiklikten sonra `site/test/api_test.js`, `Tools/social_net_test.py`, `Tools/net_e2e.py` geçmeli.

## 8. Windows kabuğu (Hermes terminali git-bash idi)
- Yerel yollar: native araçlara `C:/Users/...` ver, `/c/Users/...` değil (MSYS yolu native araçlara çevrilmez).
- Kayıt defteri/servis yazımı için yönetici gerekir; kullanıcıdan GUI ya da yükseltilmiş komut iste.
- Silme/kill komutları onay bekletebilir.

## 9. Diğer projeler
- **Mist** (`mist-app`): Electron. `npm install`, `npm start`; paketleme `dist\Mist-win32-x64\Mist.exe`. `games.json` kütüphaneyi tanımlar. Riot oyunları `RiotClientServices.exe --launch-product`.
- **Dynamic Island** (`dynamic-island-app`): Electron + PowerShell dinleyicileri (`whatsapp_listener.ps1`, `media_listener.ps1`, `volume_listener.ps1`); otomatik başlatma `install_autostart.ps1`; gerçek veri, mock yok.

## 10. Sık hatalar
- `GUI.color` sızıntısı (koyu kutu/metin), başka ekrandan çağrılan stil NullReference'ı, aynı karede birden çok `ScreenCapture`.
- Web'in Windows'tan farklı görünmesi neredeyse hep eski service-worker önbelleğidir: sürümü artır, Ctrl+F5.
- Önceden yayımlamadan önce Firestore kuralları kullanıcı tarafından yayımlanmadıysa ağ özelliği olan sürümü yayınlama.
- Unity batchmode'da URP/Input System/Addressables 6000.6'da sorun çıkarabilir (URP için UniversalRendererData gerekir).
- Meshy GLB hattı denenmedi; 3B yükseltme procedural yapıldı.
