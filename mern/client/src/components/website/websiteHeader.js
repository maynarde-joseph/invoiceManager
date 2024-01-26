import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
} from "@mantine/core";
import mainLogo from "./images/ApplePieLogo.png";
import { useDisclosure } from "@mantine/hooks";
import { useGoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';

// Create a consistent theme across the website header.
const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%"
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    })
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0]
    }),

    "&:active": theme.activeStyles
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none"
    }
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none"
    }
  }
}));

export function HeaderMegaMenu() {
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
      sessionStorage.setItem('token', JSON.stringify(response.access_token));
      window.location.href = "/home";
    },
  });

  const { t } = useTranslation();
  return (
    <Box pb={120}>
      <Header height={60} px="md" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>
        <Group position="apart" sx={{ height: "100%" }}>
          <img src={mainLogo} style={{ width: 35, height: 35 }}/>

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <UnstyledButton className={classes.link}>
              <Text component="a" href="/" className={classes.link}>
                {t("Home")}
              </Text>
            </UnstyledButton>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <Center
                  component="a"
                  href="/features"
                  className={classes.link}
                  inline
                >
                  <Box component="span" mr={5}>
                    {t('Features')}
                  </Box>
                  {/* <IconChevronDown size={16} color={theme.fn.primaryColor()} /> */}
                </Center>
              </HoverCard.Target>
            </HoverCard>
            <UnstyledButton className={classes.link}>
            <Text component="a" href="/explained" className={classes.link}>
                {t('e-Invoicing Explained')}
              </Text>
            </UnstyledButton>
            <UnstyledButton className={classes.link}>
              <Text component="a" href="/faqs" className={classes.link}>
                {t('FAQs')}
              </Text>
            </UnstyledButton>
          </Group>

          <Group className={classes.hiddenMobile}>
            <Button onClick={() => login()}>{t('Log in')}</Button>
            <Button onClick={() => login()}>{t('Sign up')}</Button>
          </Group>
        </Group>
      </Header>
    </Box>
  );
}