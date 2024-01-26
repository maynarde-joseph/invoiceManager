import { Container, Space, BackgroundImage } from "@mantine/core";
import { HeroText } from "../components/website/websiteHero";
import { HeaderMegaMenu } from "../components/website/websiteHeader";
// import { FaqSimple } from "../components/website/websiteFaqs";
import { FooterCentered } from "../components/website/websiteFooter";
import { ProductFeatures } from "../components/website/websiteFeatures";
import { TestimonialCarousel } from "../components/website/websiteCarousel";
// import image from "../components/website/karla-spetic.jpeg";

const links = require("../components/website/links.json")["links"];

export default function Website() {
  return (
    <Container py="md">
      <HeaderMegaMenu />
      <div style={{ display: "flex" }}>
        <HeroText />
      </div>
      <ProductFeatures />
      <Space />
      <div style={{ marginBottom: "60px" }}> {/* Adjust the value as needed */}
        <TestimonialCarousel />
      </div>
      <FooterCentered links={links} />
    </Container>
  );
}
