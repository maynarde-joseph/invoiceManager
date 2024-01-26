import { Container } from "@mantine/core";
import { HeaderMegaMenu } from "../components/website/websiteHeader";
import { FaqSimple } from "../components/website/websiteFaqs";
import { FooterCentered } from "../components/website/websiteFooter";

const links = require("../components/website/links.json")["links"];

export default function FAQs() {
  return (
    <Container py="md">
      <HeaderMegaMenu />
      <FaqSimple />
      <FooterCentered links={links} />
    </Container>
  );
}