import { useState, React, useEffect } from "react";
// import { Route, Routes } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
// import { Card, Image, Badge, Button, Group, Center } from '@mantine/core';
// import { Title } from '@mantine/core';
import LanguageSelector from './components/LanguageSelector';
import i18n from './i18n';

// // We import all the components we need in our app
// import Home from "./components/home";
// import Query from './components/query'
// import Create from "./components/create";
// import Edit from "./components/edit";
// import View from "./components/view";
// import HomePage from "./components/homePage";

// import React from 'react';
import { MantineProvider } from "@mantine/core";
import AllRoutes from "./routes";

export default function App() {

  const [accessToken, setAccessToken] = useState();

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setAccessToken(response.access_token);
    },
  });
  
  useEffect(() => {
    const language = localStorage.getItem('language');
    if (language) {
      i18n.changeLanguage(language);
    }
  }, []);

  return (
    <MantineProvider theme={{
      colors: {
          brand: ['#DD5573', '#DD5573', '#DD5573', '#DD5573', '#DD5573', '#DD5573', '#DD5573', '#DD5573', '#DD5573', '#DD5573'],
        },
      primaryColor: 'brand', 
      components: {
          Button: {
            defaultProps: {
              color: 'brand',
            }}
        }
    }} withGlobalStyles withNormalizeCSS >
      {/* <NotificationsProvider> */}
        <AllRoutes />
        <LanguageSelector selectedLanguage={localStorage.getItem('language') || i18n.language} />
      {/* </NotificationsProvider> */}
    </MantineProvider>
  );
}

/*
const App = () => {
  const [accessToken, setAccessToken] = useState();

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setAccessToken(response.access_token);
    },
  });



  return (
    <div className="page-content" style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "20px"
    }}>

      {accessToken == null ?
        <div style={{
          width: "500px", display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>

          <Card shadow="sm" padding="xl" radius="lg" withBorder >
          <Title align="center" order={3} size="h1">ApplePie</Title>
            <Image
              src="https://i.pinimg.com/564x/e1/f1/a5/e1f1a537f5775f040cf740b76f1f58fe.jpg"
              height={200}
              width={200}
              radius={200}
              align="center"
            />
            <Button onClick={() => login()} fullWidth>Login with Google</Button>
          </Card>


        </div>

        :

        <div>
          <Routes>
            <Route exact path='/' element={< Home access_token={accessToken} />}></Route>
            <Route path='/create' element={< Create />}></Route>
            <Route path='/edit' element={< Edit />}></Route>
            <Route path='/view' element={< View />}></Route>
            <Route path='/query' element={< Query />}></Route>
          </Routes>
        </div>
      }
    </div>

  );
};
*/