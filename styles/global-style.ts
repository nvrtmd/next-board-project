import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  html {
    font-size: 87.5%; // 1rem === 14px
    @media screen and ${theme.devices.laptop} { // 1080
      font-size: 75%; // 1rem === 12px
    }
    @media screen and ${theme.devices.tablet} { // 820
      font-size: 62.5%; // 1rem === 10px
    }
  }

  *:not(input) {
    -webkit-touch-callout: none; // 링크, 이미지 길게 눌렀을 때 나타나는 메뉴 비활성화
    -webkit-user-select: none; /
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none; 
    user-select: none; // 텍스트 드래그 방지
    outline-style:none; // 요소에 포커스 됐을 때 생기는 기본 아웃라인 제거
  }

  * {
    box-sizing: border-box; // 요소 전체 너비 고정, 패딩과 보더가 요소 크기에 포함되어 콘텐츠 영역이 축소되지 않음 (크기 그대로 유지)
    padding: 0;
    margin: 0;     
    -webkit-user-drag:none; 
    -moz-user-drag:none; 
    -ms-user-drag:none; 
    -khtml-user-drag: none;
    -webkit-touch-callout: none; // 요소 드래그 기능 비활성화, 이미지나 텍스트 등을 드래그하여 이동시키는 것 방지
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); // 모바일에서 터치 요소에 하이라이트 색상 제거
  }

  body {
    font-family:'SpoqaHanSansNeo-Regular',sans-serif;
  }

  a, a:hover, a:focus {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  input, button {
    background-color: transparent;
    outline: none;
  }

  ol, ul, li {
    list-style: none;
  }

  img {
    width: 100%;
  }
`;
