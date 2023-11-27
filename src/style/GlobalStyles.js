import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    a {
      text-decoration: none; /* 링크의 밑줄 제거 */
      color: inherit; /* 링크의 기본 색상 사용 */
    }
`;

export default GlobalStyles;