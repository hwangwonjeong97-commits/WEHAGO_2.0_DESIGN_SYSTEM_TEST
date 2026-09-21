# 백업 — Overview / 인트로 페이지 (2026-09-21)

썸네일 이미지 작업이 끝나지 않아 아래 페이지를 사이트에서 일시 제거했습니다.
나중에 썸네일이 준비되면 이 폴더의 파일을 `src/`로 되돌리고 App.tsx의 라우팅을 복구하면 됩니다.

## 백업 파일

| 파일 | 원래 위치 | 내용 |
|---|---|---|
| `pages/Overview.tsx` | `src/pages/Overview.tsx` | 진입 시 뜨던 "Design System" 인트로 페이지(소개·디자인 원칙·시작하기·접근성) |
| `pages/ComponentGallery.tsx` | `src/pages/ComponentGallery.tsx` | Foundation Overview + Components Overview 썸네일 갤러리 |
| `App.tsx` | `src/App.tsx` | 제거 전 라우팅/네비게이션 원본 |

## 필요한 썸네일 이미지

- `public/foundation/` — color.png, scale.png, typography.png, iconography.png
- `public/components/` — button.png, input.png, textarea.png, searchbar.png, dropdown.png,
  selectcontrol.png, datetimeinput.png, actionbar.png, fileupload.png, tab.png, header.png,
  lnb.png, snb.png, tag.png, badge.png, avatar.png, filethumbnail.png, profilecard.png,
  tooltip.png, overflowmenu.png, list.png, card.png, datalisttable.png, formtable.png,
  infobox.png, emptyset.png, dialog.png, snackbar.png, loading.png

## 복구 방법

1. `_backup/pages/*.tsx` → `src/pages/` 로 복사
2. `_backup/App.tsx` → `src/App.tsx` 로 복사 (그 사이 App.tsx에 다른 수정이 있었다면 diff로 병합)
