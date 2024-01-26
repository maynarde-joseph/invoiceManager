import {
  Card,
  Button,
  LoadingOverlay,
  Box,
  Select,
  Group,
  Container,
  Modal,
  TextInput,
} from "@mantine/core";
import { HeaderResponsive } from "./header";
import React, { useEffect, useState } from "react";
import { renderMatches, useSearchParams, useNavigate } from "react-router-dom"; // Add useNavigate import here
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { HeaderMegaMenu } from "../components/website/databaseHeader";
import { FooterCentered } from "../components/website/websiteFooter";
const links = require("../components/website/links.json")["links"];

export default function View() {
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [accessKey, setkey] = useState("");
  const [searchparams] = useSearchParams();
  const [content, setContent] = useState(null);
  const url = "https://macroservices.masterofcubesau.com/api/v2";
  console.log(searchparams.get("invoiceId"));
  const [urla, setUrl] = useState("");
  const [chosenLanguage, setLanguage] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = () => {
    setEmailModalVisible(false);
    send(emailAddress);
  };

  const form = useForm({
    initialValues: {
      language: "en",
    },
  });

  const changeLanguage = (value) => {
    console.log(value);
    setLanguage(value.language);
    getxmlfile();
  };

  function handleBackButtonClick() {
    // Add this function to handle back button click
    navigate(-1);
  }

  // This method will delete a invoice
  async function getxmlfile() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    console.log("getting");
    fetch(
      `http://localhost:8080/get?id=${searchparams.get("invoiceId")}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setContent(result);
        fetch(
          "https://macroservices.masterofcubesau.com/api/v2/generatekey",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            setkey(JSON.parse(result).key);
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  }

  async function render() {
    setVisible(true);
    const style = 0;
    const language = chosenLanguage;
    const invoicename = "fileone";
    const filename =
      "AU_" + invoicename + "_style" + style + "_" + language + ".pdf";
    var myHeaders = new Headers();
    myHeaders.append("api-key", accessKey);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ubl: content,
      style: style,
      language: chosenLanguage,
      optional: {
        icon: "data:image/png;base64,<base64string>",
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      responseType: "stream",
    };

    fetch(
      "https://macroservices.masterofcubesau.com/api/v2/invoice/render/pdf",
      requestOptions
    )
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((uril) => {
        setVisible(false);
        setUrl(uril);
        var link = document.createElement("a");
        link.href = uril;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  async function send(sendTo) {
    setVisible(true);
    const style = 0;
    const language = chosenLanguage;
    const invoicename = "fileone";
    const filename =
      "AU_" + invoicename + "_style" + style + "_" + language + ".pdf";
    var myHeaders = new Headers();
    myHeaders.append("api-key", accessKey);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ubl: content,
      style: style,
      language: chosenLanguage,
      optional: {
        icon: "data:image/png;base64,<base64string>",
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      responseType: "stream",
    };

    fetch(
      "https://macroservices.masterofcubesau.com/api/v2/invoice/render/pdf",
      requestOptions
    )
      .then((response) => response.blob())
      .then((blob) => blobToBase64(blob))
      .then((base64) => {
        const data = { pdfFileData: base64, sendTo }; // Add sendTo to the data object
        return fetch("http://localhost:8080/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setVisible(false); // Set the visible state to false after the email is sent
      })
      .catch((error) => {
        console.error(error);
        setVisible(false); // Set the visible state to false in case of an error
      });
  }

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  }

  return (
    <Container py="md">
      <div>
        <HeaderMegaMenu />
        <Box pos="relative">
          <LoadingOverlay
            transitionDuration={500}
            visible={visible}
            overlayBlur={2}
          />
          <div
            style={{
              margin: "100px",
              alignItems: "center",
              color: "white",
              width: "800px",
              heigth: "100vh",
            }}
          >
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <form
                onSubmit={form.onSubmit((values) => {
                  changeLanguage(values);
                })}
              >
                <Select
                  placeholder={t("Pick one")}
                  data={["en", "zh", "ko", "es", "ja"]}
                  label="Language:"
                  value={chosenLanguage}
                  {...form.getInputProps("language", { type: "Select" })}
                />
                <Group position="right" mt="md">
                  <Button type="submit" fullWidth mt="md" width="40px">
                    {t("Apply")}
                  </Button>
                </Group>
              </form>
              <br></br>
              <div>
                {t("Chosenlang")} {chosenLanguage}
              </div>{" "}
              {/* Add the chosen language message here */}
              <br></br>
              <Button onClick={handleBackButtonClick} mr="md">
                {t("Back")}
              </Button>
              <Button onClick={() => render()} mr="md">
                {t("Download")}
              </Button>
              <Button onClick={() => setEmailModalVisible(true)}>
                {t("Send")}
              </Button>
            </Card>
          </div>
        </Box>
        <FooterCentered links={links} />
      </div>
  
      <Modal
        opened={emailModalVisible}
        onClose={() => setEmailModalVisible(false)}
        title={t("Enter email address")}
        size="xs"
      >
        <TextInput
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.currentTarget.value)}
          placeholder={t("Enter email address")}
          type="email"
        />
        <Group position="right" mt="md">
          <Button onClick={handleEmailSubmit}>{t("Send Email")}</Button>
        </Group>
      </Modal>
    </Container>
  );
  
}


