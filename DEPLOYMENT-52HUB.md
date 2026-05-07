# 52HUB User Frontend Deployment Notes

## Project

- Project: 52HUB user frontend
- Upstream baseline: dujiao-next/user v1.0.2
- Local branch: 52hub/v1.0.2-user-hardening
- Build command: `npm run build`
- Production deploy directory: `/opt/dujiao-next/web/user`
- Production container mount: `./web/user:/usr/share/nginx/html:ro`

## Source-Hardened Content

1. 52Hub branding.
2. favicon / logo / icon public assets.
3. `52hub-hotfixes.css`.
4. Home page `home-hero-banner`.
5. Banner 24:9 layout.
6. ProductCard 1:1 image area.
7. ProductImageGallery 1:1 image area.
8. `image.ts` path normalization fix.
9. Main frontend i18n narrowed to `zh-CN` / `en-US`, while `zh-TW` fallback strings may still exist.

## Known Residuals

1. Built assets or source may still contain `zh-TW` fallback strings.
2. `Dujiao-Next` / `Open Source` residual text may still exist and should be checked against public pages later.

## Operational Notes

- Do not push directly to upstream `origin`.
- Rollback: restore the `/opt/dujiao-next/web` backup or redeploy the previous `dist` version.
