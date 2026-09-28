# 📡 MeshengerTR - Progressive Web App (PWA)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![ISO 22324](https://img.shields.io/badge/Emergency%20Standard-ISO%2022324-red.svg)](https://www.iso.org/standard/60079.html)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Ready-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Status](https://img.shields.io/badge/Status-Beta%20v1.2-orange.svg)]()

**MeshengerTR**, afet ve acil durumlarda (deprem, sel, şebeke çökmesi vb.) internet veya GSM kapsama alanı olmasa dahi cihazlar arasında P2P (Peer-to-Peer) haberleşme sağlayan, **ISO 22324 Kamu Uyarı ve Renk Kodlama Standartlarına** uygun olarak geliştirilmiş responsive Progressive Web App (PWA) uygulamasıdır.

---

## 🌟 Öne Çıkan Özellikler (Key Features)

### 🎧 1. Enkaz Ses Dinleyici ve Amplifikatör (Rubble Audio Listener)
* **300Hz High-Pass Süzgeç:** Enkaz altındaki düşük frekanslı yapıcı gürültüleri eleyerek hayati tıklama, vurma ve insan sesi frekanslarını belirginleştirir.
* **3x / 5x / 10x Ses Kazancı (Amplifikasyon):** Web Audio API vasıtasıyla mikrofondan alınan zayıf enkaz seslerini 10 katına kadar güçlendirir.
* **Canlı Ses Spektrogramı & Tepe Noktası Uyarısı (Peak Warning):** Gerçek zamanlı RMS ses analizi ile enkaz altından ses geldiğinde ekran üzerinde otomatik kırmızı uyarı tetikler.

### 📢 2. Akustik Düdük Siren (3.5 kHz Acoustic Whistle)
* Arama-kurtarma ekiplerinin ve dedektör köpeklerin kolaylıkla fark edebileceği **3.5 kHz yüksek frekanslı sürekli düdük sinyali** üretir.

### ⚡ 3. SOS Ekran Flaşörü (Strobe SOS Light)
* Ekranı yüksek frekanslı beyaz flaşör moduna alarak karanlık enkaz alanlarında görsel yer tespiti sağlar.

### 📍 4. Acil Durum Konum Yayını (Emergency Location Beacon)
* Cihazın GPS koordinatlarını alarak yakın ağdaki P2P düğümlerine yayınlar.

### 📱 5. %100 Çevrimdışı PWA Desteği (Offline Service Worker)
* Uygulama bir kez açıldıktan sonra Service Worker sayesinde **hiç internet olmadan** telefonun ana ekranından tıpkı yerel bir uygulama gibi çalıştırılabilir.

---

## 📲 Kurulum ve PWA Olarak Ekleme (Installation)

### 🤖 Android (Google Chrome / Brave / Edge)
1. Tarayıcınızda **MeshengerTR PWA** adresini açın.
2. Ekranın altında çıkan **"Uygulamayı Yükle"** butonuna basın veya tarayıcı menüsünden **"Ana Ekrana Ekle"** seçeneğini seçin.

### 🍎 iOS (Safari - iPhone / iPad)
1. Safari tarayıcısında adresi açın.
2. Alt menüdeki **Paylaş (Share)** simgesine dokunun.
3. **"Ana Ekrana Ekle" (Add to Home Screen)** seçeneğini seçin.

---

## 🔗 Orijinal Kaynak Projeler ve Referanslar (Upstream Repositories)

MeshengerTR projesi, aşağıdaki saygın açık kaynak projelerden ve topluluk çalışmalarından esinlenilerek geliştirilmiştir:

1. **Meshenger Android App (Upstream Original):**  
   👉 [https://github.com/meshenger-app/meshenger-android](https://github.com/meshenger-app/meshenger-android)  
   *P2P şifreli sesli/görüntülü görüşme ve sunucusuz mesh haberleşme mimarisi referansı.*

2. **Enkaz Dinleme Uygulaması (Upstream Original):**  
   👉 [https://github.com/ozansarier/enkazdinlemeuygulamasi](https://github.com/ozansarier/enkazdinlemeuygulamasi)  
   *Enkaz arama-kurtarma ses analiz algoritmaları ve frekans filtreleme referansı.*

3. **Qaul Mesh Network:**  
   👉 [https://github.com/qaul/qaul.net](https://github.com/qaul/qaul.net)  
   *İnternetsiz bağımsız P2P iletişim ve acil durum mesh ağ protokolleri.*

---

## ⚖️ Uluslararası Yasal Sorumluluk Reddi ve Test Aşaması Bildirimi / International Legal Disclaimer

### 🇹🇷 [TR] Yasal Sorumluluk Reddi
1. **Test ve Geliştirme Aşaması:** Bu uygulama (**MeshengerTR**) aktif test ve geliştirme aşamasındadır (BETA). Uygulama hiçbir koşulda resmi bir arama-kurtarma cihazı veya garanti edilen tek acil durum iletişim kanalı olarak değerlendirilemez.
2. **Garanti Reddi:** İşbu yazılım **"OLDUĞU GİBİ" (AS IS)** sunulmakta olup, kesintisiz çalışma, verilerin iletilmesi veya enkaz altındaki seslerin %100 tespiti konusunda açık veya zımni hiçbir garanti verilmemektedir.
3. **Sorumluluk Sınırı:** Geliştiriciler ve katkıda bulunanlar; afet anlarında yaşanabilecek iletişim aksamalarından, cihaz donanım yetersizliklerinden veya yazılımın kullanımından doğabilecek doğrudan veya dolaylı hiçbir zarar, kayıp veya yaralanmadan sorumlu tutulamaz. Hayati acil durumlarda öncelikle resmi afet yönetimi kurumlarının (**AFAD, AKUT, 112** vb.) talimatlarına uyulmalıdır.

### 🇬🇧 [EN] International Legal Disclaimer & Disclaimer of Liability
1. **Beta & Test Phase:** MeshengerTR is an open-source software currently under active testing and development (BETA). It is NOT a certified life-saving medical or primary search-and-rescue apparatus.
2. **No Warranty ("AS IS"):** This software is provided "AS IS", without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, network continuity, or acoustic detection accuracy.
3. **Limitation of Liability:** In no event shall the authors, core developers, or copyright holders be liable for any claim, damages, or injury arising from, out of, or in connection with the software or the use of emergency P2P signals during disasters. Users must always prioritize official emergency protocols and certified first responders.

---

## 📄 Lisans
Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.
