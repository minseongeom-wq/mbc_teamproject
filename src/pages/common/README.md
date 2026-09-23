# 공통 페이지 폴더

`pages`와 `components`의 상대 폴더 경로를 동일하게 유지합니다.

- `NotFoundPage.jsx`: 공통 오류 화면을 라우트에 연결합니다.
- `basic-page/`, `navigation/`: 폴더 구조를 맞추기 위한 예약 폴더입니다. 현재 페이지나 URL은 없으며 `.gitkeep`으로 Git에 보존합니다.
- 기본 화면 및 Navigation UI는 `components/common`에서 관리합니다. 이곳에 복사하지 않습니다.

기능 폴더를 추가하거나 이동할 때는 양쪽에 같은 상대 경로를 반영합니다. Page는 화면을 조합하고 Content는 UI를 구현하므로 파일명과 파일 수는 서로 다를 수 있습니다.
