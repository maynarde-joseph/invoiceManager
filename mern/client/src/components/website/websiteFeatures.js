import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  SimpleGrid,
  Grid,
  Card,
  Container,
  Space
} from "@mantine/core";

import mockup from "./images/stationery-mockup.png";
import laptop from "./images/laptop.png";
import asset1 from "./images/Asset 1.png";
import asset2 from "./images/Asset 2.png";
import asset3 from "./images/Asset 3.png";
import { useTranslation } from 'react-i18next';


const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24
    }
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
}));


export function ProductFeatures() {
  const { classes, theme } = useStyles();
  const { t } = useTranslation();

  const features = [
    {
      title: t("feature1title"),
      description: t("feature1description"),
    },
    {
      title: t("feature2title"),
      description: t("feature2description"),
    },
    {
      title: t("feature3title"),
      description: t("feature3description"),
    },
  ].map((feature) => (
    <Container
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      p="xl"
    >
      <Title order={2} className={classes.title} mt="sm">
        {feature.title}
      </Title>
      <Text size="md" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Container>
  ));
  

  return (
    <Container size="2xl" py="xl">
      <Group position="center">
        <Badge variant="filled" size="lg">
          {t("Introducing Apple Pie")}
        </Badge>
      </Group>

      <Title order={2} className={classes.title} align="center" mt="sm">
        {t("Let's get you started.")}
      </Title>

      <Text
        color="dimmed"
        className={classes.description}
        align="center"
        mt="lg"
      >
        {t("Take a look into what Apple Pie can do for you.")}
      </Text>
      <Space h="xl" />
      
      {/* <SimpleGrid 
        cols={1}
        spacing="sm"
        verticalSpacing="lg"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
        justifyContent="left"
      >
        <div>{ features[0] }</div>
        <div align="right">{ features[1] }</div>
        <div>{ features[2] }</div>
      </SimpleGrid> */}

      <Grid>
        <Grid.Col span={6}> { features[0] } </Grid.Col>
        <Grid.Col span={6}>
          <img src={asset1} />
        </Grid.Col>
        {/* <Grid.Col span={12}> </Grid.Col> */}

        {/* <Grid.Col span={6}> <img src={mockup} style={{ width: 70, height: 70 }}/> </Grid.Col> */}
        <Grid.Col span={6}>
          <img src={asset2} />
        </Grid.Col>
        <Grid.Col span={6} align="right"> { features[1] } </Grid.Col>
        {/* <Grid.Col span={12}> </Grid.Col> */}

        <Grid.Col span={6}> { features[2] } </Grid.Col>
        {/* <Grid.Col span={6}> <img src={mockup} style={{ width: 70, height: 70 }}/> </Grid.Col> */}
        <Grid.Col span={6}>
          <img src={asset3} />
        </Grid.Col>
      </Grid>
      {/* <Grid.Col span={12}> </Grid.Col> */}

    </Container>
  );
}