
import { FileButton, Button, Group, Text, Card, Container, } from '@mantine/core';
import React, { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom"; // Add useNavigate import here

import { HeaderResponsive } from "./header";
import request from 'sync-request';
import { useForm } from "react-hook-form";
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeaderMegaMenu } from "../components/website/databaseHeader";
import { FooterCentered } from "../components/website/websiteFooter";
const links = require("../components/website/links.json")["links"];

export default function Edit() {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(true);
  const [searchparams] = useSearchParams();
  const { register, handleSubmit } = useForm();
  const [obj, setobj] = useState({});
  const testUser = "testig123";
  console.log(searchparams.get("invoiceId"))

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(testUser);
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
        console.log(obj);
        setobj(obj);
        setDisabled(false);
      })
      .catch((err) => window.alert(err));

  };

  async function editInvoice() {
    console.log("CREATING")
    const res = new request(
      'PUT',
      `http://localhost:8080/invoices/update/${searchparams.get("invoiceId")}`,
      {
        body: JSON.stringify(obj),
        headers: {
          'Content-type': 'application/json'
        }
      }
    );
    console.log(res.body);
    window.alert(res.body);
  }

  function handleBackButtonClick() { // Add this function to handle back button click
    navigate(-1);
  }

  return (
    <Container py="md">
    <div>
      <HeaderMegaMenu />
      <div style={{ margin: "100px", alignItems: "center", color: "white" }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("file")} type="file" label="choose new file"/>
          <Button type="submit">{t("upload")}</Button><br></br>
          <Group position="right" mt="md">
            <Button onClick={handleBackButtonClick}>{t("Back")}</Button> {/* Add the back button here */}
            <Button disabled={disabled} onClick={()=>editInvoice()}>{t("update invoice")}</Button>
          </Group>
          
        </form>
      </Card>
      </div>
      <FooterCentered links={links} />
      </div>
      </Container>
  );
}