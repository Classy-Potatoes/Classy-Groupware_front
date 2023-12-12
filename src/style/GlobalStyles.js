import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";


const GlobalStyles = createGlobalStyle`
    ${reset};
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500&family=Roboto:ital,wght@0,400;1,300&display=swap');

    *, *::before, *::after {
      box-sizing: border-box;
    };
    
    body * {
      font-family: 'Noto Sans KR','Roboto', sans-serif;
    };
    
    a {
      text-decoration: none; /* 링크의 밑줄 제거 */
      color: inherit; /* 링크의 기본 색상 사용 */
    };
    
    button {
      border: none;
      background-color: transparent;
      padding: 0;
      cursor: pointer;
    };
`;

export default GlobalStyles;