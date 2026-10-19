# 📡 MeshengerTR PWA - Progressive Web App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![ISO 22324](https://img.shields.io/badge/Emergency%20Standard-ISO%2022324-red.svg)](https://www.iso.org/standard/60079.html)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Ready-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Status](https://img.shields.io/badge/Status-Beta%20v1.2-orange.svg)]()

> [!CAUTION]
> **⚠️ BETA / TEST AŞAMASI UYARISI:**
> Bu uygulama henüz deneysel (Beta / Test) aşamasında açık kaynaklı bir web yazılımıdır. Arama-kurtarma ve acil durum senaryolarında yardımcı bir araç olarak tasarlanmış olup, resmî acil durum kanallarının (AFAD, AKUT, 112 Acil Çağrı vb.) veya profesyonel arama-kurtarma teçhizatlarının yerini asla alamaz.

> [!WARNING]
> **⚖️ YASAL SORUMLULUK REDDİ (DISCLAIMER OF LIABILITY):**
> Yazılım "olduğu gibi" (AS IS) ve "mevcut haliyle" herhangi bir açık veya zımni garanti verilmeksizin sunulmaktadır. Geliştiriciler ve katkıda bulunanlar; afet anlarında yaşanabilecek iletişim aksamalarından, donanım yetersizliklerinden veya yazılımın kullanımından doğabilecek doğrudan veya dolaylı hiçbir zarar, kayıp veya yaralanmadan yasal olarak sorumlu tutulamaz. Kullanıcı uygulamayı tüm riskleri kabul ederek kendi sorumluluğunda çalıştırır.

---

**MeshengerTR PWA**, afet ve acil durumlarda (deprem, sel, şebeke çökmesi vb.) internet veya GSM kapsama alanı olmasa dahi cihazlar arasında P2P (Peer-to-Peer) haberleşme sağlayan, **ISO 22324 Kamu Uyarı ve Renk Kodlama Standartlarına** uygun olarak geliştirilmiş responsive Progressive Web App (PWA) uygulamasıdır.

---

## 🌟 Temel Özellikler (Key Features)

### 🎧 1. Enkaz Ses Dinleyici ve Amplifikatör (Rubble Audio Listener)
* **300Hz Yüksek Geçiren Filtre (High-Pass Filter):** Ozan Sarıer'in açık kaynak [enkazdinlemeuygulamasi](https://github.com/ozansarier/enkazdinlemeuygulamasi) algoritmasından ilhamla; Web Audio API (`BiquadFilterNode`) kullanılarak 300Hz altı jeneratör, rüzgar ve enkaz uğultuları kesilir. İnsan sesi, vurma ve tıkırtı frekansları (300Hz - 3.4kHz) öne çıkarılır.
* **Dinamik Ses Kazancı (Gain Boost):** Zayıf enkaz seslerini kulaklığa/hoparlöre yüksek netlikle ileten **1x (Normal), 3x (Güçlü), 5x (Önerilen) ve 10x (Maksimum)** kazanç seviyeleri.
* **Canlı Spektrogram & Tıkırtı Tespiti:** Gerçek zamanlı HTML5 Canvas frekans spektrogramı ve RMS eşiği aşıldığında otomatik görsel uyarı (`🚨 PEAK DETECTED`).

### 📡 2. Afet Kipi Yayını (Disaster Beacon Network)
* Yerel ağdaki P2P düğümlerine periyodik acil durum sinyali yayını.
* **ISO 22324 Standart Renk Kodları:**
  - 🔴 `HELP / SOS / RED ALERT` (`#DC2626`)
  - 🔵 `MEDICAL ASSISTANCE` (`#2563EB`)
  - 🟢 `STATUS OK / SAFE` (`#16A34A`)
* **📍 GPS Enkaz Koordinatı Paylaşımı:** Tarayıcının `navigator.geolocation` API'si ile tek tıkla hassas koordinatları acil durum notuna ekleme.

### 📢 3. Akustik Düdük Siren (3.5 kHz Whistle)
* Arama-kurtarma ekiplerinin ve dedektör köpeklerin yön tayinini kolaylaştırmak için **3.5 kHz yüksek frekanslı sürekli akustik düdük** sinyali (Web Audio `OscillatorNode`).

### ⚡ 4. SOS Ekran Flaşörü (Strobe SOS Light)
* Ekranı yüksek frekanslı beyaz/kırmızı flaşör moduna alarak karanlık enkaz alanlarında görsel yer tespiti sağlar.

### 📱 5. %100 Çevrimdışı PWA Desteği (Offline Service Worker)
* Service Worker (`sw.js`) ve Web App Manifest (`manifest.json`) ile uygulama bir kez yüklendikten sonra **tamamen çevrimdışı** çalışır.

---

## 📲 Kurulum ve PWA Olarak Ekleme (Installation)

### 🤖 Android (Google Chrome / Brave / Edge)
1. Tarayıcınızda MeshengerTR PWA sayfasını açın.
2. Sağ üstte çıkan **"📲 Uygulamayı Yükle"** butonuna dokunun veya tarayıcı menüsünden **"Ana Ekrana Ekle"** seçeneğini seçin.

### 🍎 iOS (Safari - iPhone / iPad)
1. Safari tarayıcısında adresi açın.
2. Alt menüdeki **Paylaş (Share)** simgesine dokunun.
3. **"Ana Ekrana Ekle" (Add to Home Screen)** seçeneğini seçin.

### 💻 Masaüstü (Chrome / Edge)
1. Adres çubuğundaki **Yükle (Install)** simgesine tıklayarak bağımsız pencerede çalışan masaüstü uygulaması olarak kurabilirsiniz.

---

## 🚀 Yerel Olarak Çalıştırma (Local Development)

Projeyi yerel makinenizde test etmek veya kendi sunucunuzda barındırmak için herhangi bir statik HTTP sunucusu yeterlidir:

```bash
# Depoyu klonlayın
git clone https://github.com/mserman90/meshenger-pwa.git
cd meshenger-pwa

# Python ile yerel sunucu başlatın
python -m http.server 8080

# veya Node.js npx ile:
npx serve .
```

Tarayıcınızda `http://localhost:8080` adresini açarak uygulamayı test edebilirsiniz.

> [!NOTE]
> Mikrofon (Web Audio) ve GPS (Geolocation) API'lerinin tarayıcı güvenlik politikaları gereğince çalışabilmesi için uygulamanın `localhost` veya geçerli bir `HTTPS` bağlantısı üzerinden sunulması gerekmektedir.

---

## 🌐 MeshengerTR Ekosistemi (Ecosystem Repositories)

MeshengerTR projesi tüm platformlarda kesintisiz acil durum ağı oluşturmayı hedefler:

| Platform | Depo | Açıklama |
|---|---|---|
| 🤖 **Android** | [mserman90/meshenger-android](https://github.com/mserman90/meshenger-android) | Ana mobil uygulama (Kotlin, WebRTC, UDP Beacon, Enkaz Dinleme) |
| 🪟 **Windows** | [mserman90/meshenger-windows](https://github.com/mserman90/meshenger-windows) | Masaüstü istemcisi (Compose Multiplatform, Kotlin Desktop) |
| 🐧 **Linux** | [mserman90/meshenger-linux](https://github.com/mserman90/meshenger-linux) | Linux masaüstü istemcisi (Compose Multiplatform, ALSA/PipeWire) |
| 🌐 **Web (PWA)** | [mserman90/meshenger-pwa](https://github.com/mserman90/meshenger-pwa) | Kurulum gerektirmeyen, çevrimdışı çalışan Progressive Web App |

---

## 🔗 Orijinal Kaynak Projeler ve Referanslar (Upstream Repositories)

MeshengerTR projesi, aşağıdaki saygın açık kaynak projelerden ve topluluk çalışmalarından esinlenilerek ve kaynak gösterilerek geliştirilmiştir:

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

## 📄 Lisans (License)
Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.
