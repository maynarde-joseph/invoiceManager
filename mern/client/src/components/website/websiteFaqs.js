import {
  Container,
  Title,
  Accordion,
  createStyles,
  Space,
} from "@mantine/core";
import { useTranslation } from "react-i18next";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    minHeight: 650,
  },

  title: {
    marginBottom: theme.spacing.xl * 1.5,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,

    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function FaqSimple() {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <Container size="sm" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        {t("Frequently Asked Questions")}
      </Title>
      <Space h="xl" />

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="applepie-description">
          <Accordion.Control>{t("What is APPLEPIE?")}</Accordion.Control>
          <Accordion.Panel>
            {t(`APPLEPIE Description`)}
            <br />
            <br />
            {t(`APPLEPIE Description2`)}
            <br></br>
            {t(`APPLEPIE Description3`)}
            <ul>
              <li>{t(`Objective 1`)}</li>
              <li>{t(`Objective 2`)}</li>
              <li>{t(`Objective 3`)}</li>
            </ul>
            {t(`APPLEPIE Description4`)}
            <ul>
              <li>{t(`Initiative 1`)}</li>
              <li>{t(`Initiative 2`)}</li>
              <li>{t(`Initiative 3`)}</li>
              <li>{t(`Initiative 4`)}</li>
              <li>{t(`Initiative 5`)}</li>
            </ul>
            {t(`Conclusion`)}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="google-auth">
          <Accordion.Control>{t("GOOGLE Description")}</Accordion.Control>
          <Accordion.Panel>
            {t("GOOGLE Description1")}
            <ul>
              <li>{t("GOOGLE Description2")}</li>
              <li>{t("GOOGLE Description3")}</li>
              <li>{t("GOOGLE Description4")}</li>
            </ul>
            {t("GOOGLE Description5")}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="e-invoicing">
          <Accordion.Control>
            {t("How can I learn more about e-invoicing?")}
          </Accordion.Control>
          <Accordion.Panel>
            {t("LEARN1")}
            <br />
            <br />
            {t("LEARN2")}
            <br />
            <br />
            {t("LEARN3")}
            <br />
            <br />
            {t("LEARN4")}
            <ul>
              <li>
                {t("LEARN5")}
                <a
                  href="https://www.ato.gov.au/Business/Business-activity-statements-(BAS)/In-detail/E-invoicing/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(
                    "https://www.ato.gov.au/Business/Business-activity-statements-(BAS)/In-detail/E-invoicing/"
                  )}
                </a>
              </li>
              <li>
                {t("LEARN6")}
                <a
                  href="https://peppol.einvoicingaustralia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("https://peppol.einvoicingaustralia.com/")}
                </a>
              </li>
              <li>
                {t("LEARN7")}
                <a
                  href="https://www.digitalbusinesscouncil.com.au/einvoicing-australia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(
                    "https://www.digitalbusinesscouncil.com.au/einvoicing-australia"
                  )}
                </a>
              </li>
            </ul>
            {t("LEARN8")}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="freemium">
          <Accordion.Control>
            {t("Do I have to pay for this service?")}
          </Accordion.Control>
          <Accordion.Panel>
            {t("PAY")}
            <br />
            <br />
            {t("PAY2")}
            <ul>
              <li>{t("PAY3")}</li>
              <li>{t("PAY4")}</li>
              <li>{t("PAY5")}</li>
              <li>{t("PAY6")}</li>
              <li>{t("PAY7")}</li>
              <li>{t("PAY8")}</li>
            </ul>
            {t("PAY9")}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="learn-more">
          <Accordion.Control>
            {t("How can I learn how to navigate Apple Pie?")}
          </Accordion.Control>
          <Accordion.Panel>
            {t("NAV")}
            <br />
            <br />
            <strong>{t("NAV2")}</strong>
            <ol>
              <li>{t("NAV3")}</li>
              <li>{t("NAV4")}</li>
              <li>{t("NAV5")}</li>
              <li>{t("NAV6")}</li>
              <li>{t("NAV7")}</li>
              <li>{t("NAV8")}</li>
            </ol>
            <strong>{t("NAV9")}</strong>
            <ol>
              <li>{t("NAV10")}</li>
              <li>{t("NAV11")}</li>
              <li>{t("NAV12")}</li>
              <li>{t("NAV13")}</li>
            </ol>
            <strong>{t("NAV14")}</strong>
            <ol>
              <li>{t("NAV15")}</li>
              <li>{t("NAV16")}</li>
              <li>{t("NAV17")}</li>
            </ol>
            <strong>{t("NAV18")}</strong>
            <ol>
              <li>{t("NAV19")}</li>
              <li>{t("NAV20")}</li>
            </ol>
            <strong>{t("NAV21")}</strong>
            <ol>
              <li>{t("NAV22")}</li>
              <li>{t("NAV23")}</li>
              <li>{t("NAV24")}</li>
              <li>{t("NAV25")}</li>
            </ol>
            <strong>{t("NAV26")}</strong>
            <ol>
              <li>{t("NAV27")}</li>
              <li>{t("NAV28")}</li>
              <li>{t("NAV29")}</li>
              <li>{t("NAV30")}</li>
              <li>{t("NAV31")}</li>
            </ol>
            {t("NAV32")}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
