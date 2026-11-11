MIS 457 - Week 4 Project
Proje: Etkinlik Keşfet

DOSYALAR
- index.html: Sayfanın HTML yapısı
- style.css: Görünüm ve mobil uyum
- app.js: Fetch, async/await, arama ve dört durum
- data.json: Örnek etkinlik verileri

ÇALIŞTIRMA
1. ZIP dosyasını bir klasöre çıkar.
2. Klasörü Visual Studio Code ile aç.
3. VS Code içinden Live Server eklentisini kur.
4. index.html dosyasına sağ tıkla ve "Open with Live Server" seç.
5. Tarayıcıda etkinlik kartlarının yüklendiğini kontrol et.

ÖNEMLİ: fetch() yerel dosyalarda file:// üzerinden çalışmayabilir.
Bu nedenle projeyi Live Server gibi bir yerel HTTP sunucusu ile aç.

DÖRT DURUMU TEST ETME
- Loading: Sayfa ilk açıldığında veya "Verileri yeniden yükle" seçildiğinde görünür.
- Success: data.json içindeki etkinlikler başarıyla yüklendiğinde görünür.
- Empty: "Boş durumu göster" butonuna basıldığında görünür. Ayrıca data.json içeriği [] yapılırsa gerçek yükleme de empty durumunu gösterir.
- Error: "Hata durumunu göster" butonuna basıldığında görünür. Gerçek hata testi için data.json dosyasının adını geçici olarak değiştirip sayfayı yenileyebilirsin. Testten sonra dosya adını geri getir.

WEEK 4 GEREKSİNİMLERİ
[✓] Mock data, app.js içinden data.json dosyasına taşındı.
[✓] fetch() kullanıldı.
[✓] async/await kullanıldı.
[✓] Loading, success, empty ve error durumları eklendi.
[✓] JSON verileri dinamik HTML kartlarına dönüştürüldü.
[✓] Mobil uyumlu tasarım eklendi.

TESLİM ÖNCESİ
- Projeyi Live Server ile çalıştırıp kontrol et.
- Grup üyelerinin adlarını LMS açıklamasına ekle.
- Grup GitHub deposuna gönderilecekse dosyaları depoya yükle.
- Hocanın istediği LMS teslim biçimini ve grup teslim kuralını kontrol et.

Bu proje Week 4 gereksinimlerine göre hazırlanmış başlangıç uygulamasıdır.
