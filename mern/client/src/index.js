import React from "react";
import { BrowserRouter } from "react-router-dom";
// import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { createRoot } from "react-dom/client";
import App from "./App";
import './i18n';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
      // <MantineProvider theme={{ fontFamily: 'Open Sans', components: {
      //       Button: {
      //         defaultProps: {
      //           color: 'red.4',
      //         }}
      //     }}} withGlobalStyles withNormalizeCSS >

//       <ModalsProvider>
//         <GoogleOAuthProvider clientId="337373371445-0mkti73k7asc6ui3dhlpnb0a7m10k177.apps.googleusercontent.com">
//           <App />
//         </GoogleOAuthProvider>
//       </ModalsProvider>
//       </MantineProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ModalsProvider>
      <GoogleOAuthProvider clientId="337373371445-0mkti73k7asc6ui3dhlpnb0a7m10k177.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </ModalsProvider>
  </React.StrictMode>
);
