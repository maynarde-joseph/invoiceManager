import { createStyles, Title, Text, Button, Container } from "@mantine/core";
// import image from "./karla-spetic.jpeg";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 120,
    paddingBottom: 80,

//     "@media (max-width: 755px)": {
//       paddingTop: 80,
//       paddingBottom: 60
//     }
  },

  inner: {
    position: "relative",
    zIndex: 1
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    "@media (max-width: 755px)": {
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

export function FaqIntro() {
  const { classes } = useStyles();

  return (
    <Container >
      <div className={classes.inner}>
        <Title className={classes.title}>
          This is {" "}
          <Text component="span" className={classes.highlight} inherit>
            Karla Spetic
          </Text>
          , and this is a true story.
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
          In 1993, Karla Spetic and her mother fled the Croatian War and arrived
          in Gold Coast, Australia without knowing a word of English. Now, she is
          a successful business woman with a popular clothing line.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} size="lg">
            Learn how she did it.
          </Button>
        </div>
      </div>
    </Container>
  );
}
