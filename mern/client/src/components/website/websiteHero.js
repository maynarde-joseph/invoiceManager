import { createStyles, Title, Text, Button, Container, } from "@mantine/core";
import backgroundImage from "./images/backgroundImage.png";
// import image from "./karla-spetic.jpeg";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from 'react-i18next';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 120,
    paddingBottom: 120,
    paddingLeft: 0, // Set left padding to 0
    paddingRight: 0, // Set right padding to 0
    // margin: 0, // Set margin to 0
  
    "@media (max-width: 1024px)": {
      paddingTop: 80,
      paddingBottom: 60
    }
  },

  inner: {
    position: "relative",
    // height:600,
    // width:1024,
    zIndex: 1
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    "@media (max-width: 1024px)": {
      display: "none"
    }
  },

  dotsLeft: {
    left: 0,
    top: 0
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left"
    }
  },

  highlight: {
    color:
    theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
        // theme.colors.red[6]
},

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "left",
      fontSize: theme.fontSizes.md
    }
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column"
    }
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0
      }
    }
  }
}));

export function HeroText() {
  const { classes } = useStyles();
  const { t } = useTranslation();
  return (
    // <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: '100%' }}>
    <Container className={classes.wrapper}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          {t('heroTitle')}
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            {t('heroDescription')}
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} size="lg">
            {t('heroButton')}
          </Button>
        </div>
      </div>
    </Container>
    // </div>
  );
}