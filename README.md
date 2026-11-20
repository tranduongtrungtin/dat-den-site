# Dat Den — iOS app (Capacitor)

Build .ipa KHONG KY (unsigned) cho app Dat Den (appId vn.datden.app).

## Build
- Chay workflow `.github/workflows/build-ios.yml` tren GitHub Actions (macOS runner).
- Ket qua: artifact `dat-den-app-1.1.ipa` (unsigned).

## LUU Y QUAN TRONG
- .ipa unsigned KHONG cai duoc tren iPhone that.
- De co ban cai duoc tren iPhone that can:
  - Apple Developer 99 USD/nam -> ky + phan phoi qua App Store / TestFlight, HOAC
  - Apple ID mien phi -> ky dev (chi cai duoc tren may da dang ky UDID, het han 7 ngay).
- Khong co 2 cach tren thi khong co cach nao de khach tai .ipa tu web va cai duoc.

## Cap nhat web assets
- Thu muc `ios/App/App/public/` la ban web da build san (tu `dist/`).
- Khi web doi: chay `npx cap sync ios` o may local roi copy lai thu muc `ios/` vao day.
