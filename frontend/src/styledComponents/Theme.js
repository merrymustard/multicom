import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  width: 100vw;
  height: 100vh;
  padding: 200px 8%;
  box-sizing: border-box;
	}
	body{
		padding-top: 100px;
		background-color: #EAEBEF;
		@media (max-width: 768px) {
			margin-top: 410px;
      }
	}
`;

export default GlobalStyles;
