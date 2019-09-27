import { createGlobalStyle } from 'styled-components';

import 'font-awesome/css/font-awesome.css';

const GlobalStyle = createGlobalStyle`
  * {
    margin:0;
    padding: 0;
    box-sizing:border-box;
    outline:0;
  }

  body {
    background-color: #ffffff;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    height:100vh
  }
`;

export default GlobalStyle;
