import { LoadingOverlay, Button, Group, Box, Card, Container,} from '@mantine/core';
import React, { useState } from "react";

import { Form, Link, useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
import { HeaderResponsive } from "./header";
import { useForm } from "react-hook-form";
import { useSearchParams } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { HeaderMegaMenu } from "../components/website/databaseHeader";
import { FooterCentered } from "../components/website/websiteFooter";
const links = require("../components/website/links.json")["links"];



export default function Create() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [searchparams] = useSearchParams();
  const { register, handleSubmit } = useForm();
  const [obj, setobj] = useState({});

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("myfile", data.file[0]);
    fetch(`http://localhost:8080/upload`, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        let obj = JSON.parse(data.xml);
        obj.Username = searchparams.get("id");
        console.log(obj.Username)
        console.log(obj);
        setobj(obj);
        setDisabled(false);
      })
      .catch((err) => window.alert(err));

  };

  async function createInvoice() {
    setVisible(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(obj);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8080/invoices/create", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        setVisible(false);
        window.alert(result);
      }
      )
      .catch(error => console.log('error', error));
  }

  function handleBackButtonClick() { // Add this function to handle back button click
    navigate(-1); // Use navigate(-1) to go back
  }

  return (
    <Container py="md">
    <div>
    <HeaderMegaMenu />
      <Box pos="relative">
        <LoadingOverlay transitionDuration={500} visible={visible} overlayBlur={2} />
        <div style={{ margin: "100px", alignItems: "center", color: "white" }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("file")} type="file" />
              <Button type="submit">{t("upload")}</Button><br></br>
   
              <Group position="right" mt="md">
                <Button onClick={handleBackButtonClick}>{t("Back")}</Button> {/* Add the back button here */}
                <Button disabled={disabled} onClick={() => createInvoice()}>{t("create new invoice")}</Button>
              </Group>

            </form>
          </Card>
        </div>
        </Box>
    <FooterCentered links={links} />
  </div>
  </Container>
);
}