# memory.md — Ahmed hakkında, projeleri ve çalışma şekli

Bu dosyayı Claude'a (VS Code) bağlam olarak ver (ör. repo kökünde `CLAUDE.md` olarak kopyala ya da her oturum başında "memory.md'yi oku" de).
Hermes Agent ile aylarca çalışılan sohbetlerden damıtıldı. Gizli anahtar içermez.

## 1. Kullanıcı
- Ahmed, Türk. Türkçe ve İngilizce karışık yazar; en iyi Türkçe cevap alır. Cevaplar Türkçe olsun.
- Kısa ve emir cümleleriyle yönlendirir ("dont", "1", "clear", "fix it", "başla", "devam"). Karar verdikten sonra tekrar tartışma, alternatif sunma, uyarıyı yineleme; hemen uygula.
- Fazlı çalışır: spec → mimari → UX → prototip. "Yapabilir misin?" diye sorarsa önce cevap/plan ver, kod yazma; "başla"/"devam"/"go" dediğinde kodla. İzni açıkça verdiyse (ör. "fazları otomatik yap") sormadan sürdür.
- Büyük değişiklikten önce kısaca anladığını yeniden anlat. Önemli kilometre taşlarında çalışan uygulamanın ekran görüntüsünü göster.
- Dürüstlük ister: yapılmayanı, tahmin edileni, test edilmeyeni ve nedenini açıkça yaz. Kozmetik işlerle rapor şişirmek başarısızlık sayılır. "Neyi bilerek atladım ve neden" bilgisi değerlidir.
- Kendi bilmediği şeyler için (ör. Firebase konsolu, Vercel) düz, adım adım, tıklama tıklama talimat bekler; uzun çok seçenekli sorular onu şaşırtır.
- Güvenlik/gizlilik katmanlarını (UAC, telemetri, Defender, BitLocker) bilinçli olarak kapatmıştır. Sonucu bir kez söyle, ahlak dersi verme. Yaş doğrulaması/yasal formaliteler onu ilgilendirmiyor.
- Tercihleri: kısa özet + ne değişti + ne doğrulandı + ne kaldı. Uzun anlatım yok.

## 2. Makine (eski bilgisayar, taşınıyor)
- Lenovo ThinkPad P51, Windows 10 Pro, i7-7820HQ, 64 GB RAM, Samsung NVMe, Quadro M2200 + Intel HD 630 (Optimus). Yavaşlık neredeyse hiç RAM/disk kaynaklı değil.
- Terminal süreci yönetici değil: korumalı kayıt defteri/servis düzenlemeleri "Access Denied" verir; bunları kullanıcıdan GUI ya da yükseltilmiş komut istemiyle yaptır.
- Yeni bilgisayara taşıma: masaüstündeki `Tasima` klasöründe (Hermes yedeği, repo dışı dosyalar, anahtarlar, kur.cmd, OKU_BENI.txt).

## 3. Projeler (hepsi GitHub'da, `qlupala9p` hesabı, private)
| Proje | Repo / yer | Not |
|---|---|---|
| **FenLab** (ana) | `qlupala9p/FenLab` (master) → `Documents\FenLab\FenLab-Unity` | Unity 6000.6.4f1 |
| FenLab web yayını | `qlupala9p/FenLab-Web` (public, GitHub Pages) → `Documents\FenLab\web_pub` | https://qlupala9p.github.io/FenLab-Web/ |
| FenLab site | `qlupala9p/FenLab-Site` → `Documents\FenLab\site` | Vercel: https://fenlab-mauve.vercel.app (admin: /admin, öğretmen: /teacher) |
| **Mist** | `qlupala9p/Mist` → `C:\Users\ahmed\mist-app` | Electron oyun kütüphanesi (Steam/Epic/Riot/Xbox/Minecraft kapak kartları, `games.json`, cyan/mor atom ikonu). Oyunlar: VALORANT, Fortnite, Stardew Valley, Silksong, Lunar Client, CS2, Rocket League, Fall Guys. Riot oyunları `RiotClientServices.exe --launch-product` ile açılır, oyun exe'siyle değil. |
| **Dynamic Island** | `qlupala9p/Dynamic-Island-for-win10-win11` → `C:\Users\ahmed\dynamic-island-app` | Şeffaf lacivert cam hap, üst ortada. Modlar: saat / WhatsApp bildirimleri (UserNotificationListener) / canlı skorlar (TheSportsDB, Avrupa ligleri). Başlangıç klasörüyle açılır. Gerçek veri, sahte veri yok. |

## 4. FenLab ne?
- TÜBİTAK odaklı, lise (9-12) Fizik/Kimya/Biyoloji eğitim uygulaması. 148 başlık, 118 benzersiz konu, 98 animasyon sahnesi, ~4.440 test sorusu, 34 rozet.
- Tez: **"Hata yapmaktan korkma, sonucunu gör."**
- Hesap/misafir girişi, sınıf seçimi (9-12, değiştirilebilir), Patika ana ekranı, kademeli konu kilidi (%60 kuralı), konu anlatımı + animasyon + test (kolay/orta/zor) + uygulama/oyun, 3B laboratuvarlar (Kimya/Fizik/Biyoloji, hepsi Kimya-lab kalitesinde), arkadaş/düello/sohbet, admin paneli, öğretmen paneli (sınıf kodu, ödev, ön/son test), TYT/AYT deneme modu, güvenlik ehliyeti, laboratuvar raporu (PDF), vaka dosyaları, PhET Lab (71 Türkçe simülasyon + görev + mini test), English arayüz (yalnızca arayüz).
- Sunum hedefi: önce öğretmeni, sonra üniversite akademisyenleri. "Wow" etkisi aşırı düzen (9-12 Patika yolu, tutarlı konu yapısı) ve derin mekanik animasyonlardan (ör. göz optiği) gelmeli.
- Yayın: Windows (kurulum + zip), web (GitHub Pages), ChromeOS (WebGL zip). Telefon/tablet = yalnızca web. macOS/iOS yok, APK yok.
- Yaratıcı kredisi: "Creator: lupa (Arda Özkır)". Eklenmeyecek: collaborator Gmail, yaş doğrulama.

## 5. Kullanıcının ürün kararları (bağlayıcı)
- Sınıf değiştirilebilir, misafir girişi var. Konular ilerlemeyle açılır (%60).
- Yalnızca ses efekti, müzik yok.
- Tüm laboratuvarlar Kimya-lab kalitesinde; Biyoloji/Kimya'da Fizik'teki gibi sürükle/efekt her istasyonda ("çok önemli").
- Öğretmenler yalnızca admin tarafından, Gmail ile eklenir.
- Büyük, renkli formüller. Ampi (maskot) tasarımı bana bırakıldı. Geçişler hafif olsun.
- İngilizce birebir doğrulanmış çeviri ister (şu an yalnızca arayüz, ders/test Türkçe).
- 3B odalar profesyonel hat ister (Meshy kullanılmadı; şu an procedural cam/ışık/oda).
- Ders içerikleri resmî MEB kitaplarıyla karşılaştırılmalı; "zor" testler gerçekten zor olmalı; her konu için detaylı örnekli anlatım.
- Her iş partisi bitince Windows + WebGL + ChromeOS derlenir, yayınlanır, sorulmaz.

## 6. Dürüst sınırlar (raporlarda hep söyle)
- Testler, anlatımlar ve PhET görevleri yapay zekâ yazımı; fen öğretmeni incelemesi yok.
- Sınıf-deney eşlemesi, eşikler, süreler, XP ekonomisi benim tahminim; deneme sınavı soruları ÖSYM sorusu değil.
- Gerçek öğrenciyle test yapılmadı. Telefon kullanımı zor (tablet iyi), gerçek öğrenci→sunucu sınıf akışı, admin Google girişi, Resend rapor maili (anahtar yok) sınanmadı.
- RTX 5090 gecikme düzeltmesi doğrulanmadı. Gerçek fare tıklamasını Unity'de göremiyorum; ekran turu + görsel inceleme kullanıyorum.
- PhET lisansı CC BY-NC 4.0: ücretli dağıtımda bu bölüm kullanılamaz. FenLab ücretsiz kaldığı sürece sorun yok.

## 7. Güvenlik / gizlilik
- Anahtarlar (Firebase servis hesabı, admin kodu, Vercel env, Resend, Meshy) repoda yok; `site/.env.local` ve `../secrets/` yerelde. Yeni bilgisayarda `vercel env pull` ve elle kopya.
- Meshy anahtarı için ortam/konfig yoklaması kullanıcı tarafından engellendi; onay olmadan tekrar deneme.
- Silme/öldürme komutları onay ister; üzerine yazan kopyayı tercih et.

## 8. Durum (son bilinen)
- Son sürüm v0.22.0 (Windows, ChromeOS, web yayında). Fazlar 1-7 bitti (Faz 7 yalnızca arayüz İngilizcesi; PLAN_v0.16.md'de ✓ konmadı).
- Sıradaki mantıklı işler: öğretmen kontrol paketi, ders/test/animasyon İngilizce çevirisi, gerçek öğrenci denemesi.
