# BayiGo Animasyon Tanitim Filmi

Bu depo, **gercek cekim veya stok insan videosu kullanmadan**, tamamen 2D motion graphics, karakter animasyonu ve arayuz animasyonlariyla BayiGo Market + BayiGo Media tanitim filmi uretmek icin hazirlanmistir.

## Teknoloji

- Remotion + React + TypeScript
- SVG tabanli vektor varliklar
- FFmpeg uyumlu MP4 cikti
- 1920x1080, 30 FPS, yaklasik 95 saniye
- 4K render komutu hazir

## Kurulum

```bash
npm install
npm run start
```

## Render

```bash
npm run render
npm run render:4k
```

Cikti `export/` klasorune yazilir.

## Codex'e verilecek ana gorev

`CODEX_GOREVI.md` dosyasini Codex'e ac ve oradaki talimatlari uygulat. Codex once depoyu calistirmali, sonra sahneleri tek tek tamamlamali, seslendirme ve muzik dosyalari eklendiginde zamanlamayi guncellemelidir.

## Onemli

Bu depoda telifli font, muzik veya ses dosyasi bulunmaz. `assets/music`, `assets/sfx`, `assets/voice` klasorlerine lisansli dosyalar sonradan eklenir. Kod, bu dosyalar olmadan da sessiz animasyon olarak render alir.
