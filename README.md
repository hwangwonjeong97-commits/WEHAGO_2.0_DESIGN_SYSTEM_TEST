# WEHAGO 2.0 Design System — Docs Site

`token.json`(Tokens Studio export)을 **직접 읽어** alias(`{...}`)를 실제 값까지 해석해 렌더링하는 디자인 시스템 문서 사이트. token.json 하나만 갱신하면 사이트가 자동 반영됩니다.

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 미리보기
```

## 구조

- `token.json` — **단일 소스**. primitive/Value · semantic/Value · component/Light.
- `src/tokens.ts` — token.json 로더 + **alias 리졸버**(component→semantic→primitive→raw 값까지 재귀 해석, 깨진 참조 감지).
- `src/pages/Color.tsx` — Primitive / Semantic / Component 색상 (+ opacity, alpha). 깨진 참조는 ⚠로 표시.
- `src/pages/Scale.tsx` — radius / gap / padding / size (`{number.*}` → px).
- `src/pages/Typography.tsx` — font / font-weight / letter-spacing.

## 배포

정적 사이트라 Vercel·GitHub Pages 등 어디든 가능. `base: './'`로 상대경로 빌드됨.
