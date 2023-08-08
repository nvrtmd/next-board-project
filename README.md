# 🌞 Next.js Board Web Service

## ⛈ Preview

![preview](https://github.com/nvrtmd/weather-app/assets/67324487/181a35a3-aed9-4c9b-988b-c8f50271854e)

<br/>

## 🌧 구현 사항

1. 게시글 목록 페이지
   - 서버의 db에서 불러온 게시글 리스트를 화면에 출력합니다.
   - 게시글을 10개 단위로 분리하여 표시합니다.
   - 페이지의 하단까지 스크롤 하면 이후 10개의 게시글 목록이 추가로 표시됩니다 (무한 스크롤).
   - 게시글 컴포넌트 클릭 시 게시글 상세 페이지로 이동합니다.
2. 게시글 상세 페이지
   - 해당 게시글의 내용과 댓글 목록을 표시합니다.
   - 게시글의 작성자일 경우, 게시글을 수정하거나 삭제할 수 있습니다.
   - 댓글을 작성할 수 있습니다.
   - 댓글의 작성자일 경우, 댓글을 수정하거나 삭제할 수 있습니다.
   - 댓글을 5개 단위로 분리하여 표시합니다.
   - 페이지의 하단까지 스크롤 하면 이후 5개의 댓글 목록이 추가로 표시됩니다 (무한 스크롤).
3. API 통신
   - API 오류 발생 시 alert를 통해 안내합니다.

<br>

## 🌈 폴더 구조

```markdown
📦src
📂api  // api 통신 로직 폴더
📂components
┣ 📂common  // 공통 컴포넌트 폴더
┣ 📂layouts  // 레이아웃 관련 컴포넌트 폴더
┣ 📂posts  // 게시판 관련 컴포넌트 폴더
┣ 📂constants  // 상수 관련 폴더
┣ 📂global  // 전역 타입 관련 폴더
┃ ┣ 📜type.ts
📂hooks
📂pages
┣ 📂posts
📂styles
┣ 📜GlobalStyle.ts
┣ 📜theme.ts
```
<br>

## ⛅ 실행 방법

```bash
# install dependencies
$ yarn 
# serve with hot reload at http://localhost:3000/
$ yarn run dev
```
<br/>

## 🌤 환경 변수
- 최상단에 위치한 .env file에 환경 변수 선언
```bash
NEXT_PUBLIC_API_URL=https://port-0-node-membership-board-luj2cldvrt49y.sel3.cloudtype.app
```

<br/>

## ☀ 과제 진행 세부 사항

### 컴포넌트 분리 기준

- 재사용성: 프로덕트의 규모가 더 커질 경우 다시 사용할 가능성이 높은 컴포넌트를 분리하였습니다.
  - components/common 폴더 내에 위치한 컴포넌트들은 추후 프로덕트의 다른 부분에서도 사용될 것을 염두에 두고 구현하였습니다.
- 가독성(+ 유지보수성): 하나의 페이지 컴포넌트에 모든 세부 컴포넌트의 로직을 구현하면 코드의 길이가 길어지며 컴포넌트별로 사용되는 함수들이 한 곳에 모여있어 빠르게 확인하고 수정하기 어렵습니다. 이를 보완하기 위해 컴포넌트를 분리하여 파일 내 코드의 길이를 줄이고 컴포넌트에서 사용되는 함수들은 해당 컴포넌트 파일 내에 위치시켜 간편하게 확인하고 수정할 수 있도록 하였습니다.
- 수행하는 역할: 해당 컴포넌트가 서비스 내에서 수행하는 역할에 따라 파일로 분리하여 사용하였습니다

### 상태 관리

- 컴포넌트에서 사용되는 상태는 최대한 해당 컴포넌트 내부에 위치시켰습니다.
  
### API 통신

- react-query를 사용하여 데이터를 fetch하였습니다.

### type 정의

- 프로덕트에서 전역적으로 사용되는 인터페이스를 global/type 파일 내에 정의하였습니다.
- 지엽적으로 사용되는 타입들은 사용되는 파일 내부에 정의하여 사용하였습니다.
