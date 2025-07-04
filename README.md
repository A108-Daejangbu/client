# 📒 대장부 – 투명한 공금 관리 서비스

> 회비 관리, 이제는 자동으로, 모두가 실시간으로 확인할 수 있게.

---

## 🗂️ 프로젝트 개요

- **프로젝트명**: 대장부 (Daezangboo)
- **목적**: 공금(회비)의 투명한 집행과 구성원의 실시간 열람을 위한 자동화 시스템 개발
- **개발 기간**: 2025.03.11 ~ 2025.04.18
- **기획 배경**: 분기별 보고서가 나오기 전까지는 지출 내역을 확인할 수 없는 기존의 불편함을 개선하고, 수기로 작성되던 회계보고를 자동화함으로써 **시간 절약**과 **신뢰도 향상**을 동시에 달성하고자 함

---

## 👥 팀 소개

| 이름 | 역할 |
|------|------|
| 김영진 | 백엔드 개발, 인프라, 테스트 및 배포 |
| 나혜원 | 프론트엔드 개발, UX/UI 기획, 서기 |
| 박다희 | 백엔드 개발, UX/UI 기획, 테스트 및 배포 |
| 박태현 | 프론트엔드 개발, UX/UI 기획 |
| 이가희 | 프론트엔드 개발, UX/UI 기획 |
| 이주은 | OCR 서버 개발, 백엔드 개발 |

---

## 📌 프로젝트 소개

> 대장부는 회비 집행의 투명성과 실용성을 동시에 확보하기 위한 서비스입니법
### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
