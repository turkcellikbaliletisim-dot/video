# BayiGo Animasyon Tanıtım Filmi

Bu depo, **gerçek çekim veya stok insan videosu kullanmadan**, tamamen 2D motion graphics, karakter animasyonu ve arayüz animasyonlarıyla üretilen BayiGo Market + BayiGo Medya tanıtım filmini içerir.

## Teknoloji

- Remotion 4 + React + TypeScript
- SVG tabanlı vektör varlıklar (karakterler, ikonlar, dashboard, telefon mockup)
- FFmpeg uyumlu H.264 MP4 çıktı
- 1920x1080, 30 FPS, 96 saniye (2880 kare)
- 4K render komutu hazır

## Kurulum

```bash
npm install
npm run start   # Remotion Studio (önizleme)
```

## Render

```bash
npm run render       # 1080p -> export/bayigo-tanitim-filmi.mp4
npm run render:4k    # 4K     -> export/bayigo-tanitim-filmi-4k.mp4
```

## Sahneler (docs/SENARYO.md ve docs/SAHNE_PLANI.md ile birebir)

| No | Süre | Sahne | İçerik |
|---:|---|---|---|
| 1 | 0-9 sn | Eski düzen | Çalan telefon, biriken kâğıtlar, üst üste gelen mesajlar, yorgun bayi karakteri |
| 2 | 9-18 sn | Kayıplar | Uyarı kartları (yanlış sipariş, geciken ürün, kayıp görsel) + düşen gelir grafiği |
| 3 | 18-26 sn | BayiGo giriş | Enerji çizgileriyle logo reveal + MARKET/MEDYA modül rozetleri |
| 4 | 26-39 sn | Market | Telefon mockup'ta ürün kataloğu, sepete ekleme, cari hesap paneli |
| 5 | 39-49 sn | Lojistik hız | TDM → Depo → Kurye → Bayi akışı, süre sayacı, satış artışı |
| 6 | 49-63 sn | Medya | Şablon seçimi, bayi bilgilerinin story görseline otomatik işlenmesi |
| 7 | 63-72 sn | Maliyet | Ajans/tasarımcı/video maliyet barları vs BayiGo tek sabit paket |
| 8 | 72-82 sn | TDM paneli | KPI kartları, canlı satış grafiği, bayi durum listesi, yönetici karakteri |
| 9 | 82-90 sn | Dijital ağ | BayiGo merkezli, bayilerin sırayla aydınlandığı bağlantı haritası |
| 10 | 90-96 sn | Final CTA | Logo, slogan, bayigo.net çağrısı |

Her sahnenin altyazısı `subtitles/bayigo-tr.srt` zamanlamasıyla senkron şekilde video içine işlenmiştir.

## Ses ve müzik

Depoda telifli ses dosyası bulunmaz; video sessiz + altyazılı olarak render alır.
Dosyalar eklendiğinde otomatik kullanılacak yollar:

- `assets/voice/narrator-tr.wav` — Türkçe seslendirme (`docs/SES_KAYIT_METNI.md` metni)
- `assets/music/main-theme.mp3` — fon müziği (anlatımın altında tutulmalı)

## Önemli

- Gerçek insan, stok video veya live-action kullanılmamıştır; tüm sahneler vektör tabanlı animasyondur.
- Tescilli marka varlıkları kopyalanmamıştır; genel bir telekom bayisi dili kullanılmıştır.
