import { Carousel } from '@mantine/carousel';
import { Text, Container, Title, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles((theme) => ({
        title: {
          fontSize: 34,
          fontWeight: 900,
          [theme.fn.smallerThan("sm")]: {
            fontSize: 24
          }
        }
}));

export function TestimonialCarousel () {
    const { classes, theme } = useStyles();
    const { t } = useTranslation();
    const carouselContent = {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'column' as 'column',
        backgroundColor: theme.fn.primaryColor(),
        borderRadius: 15,
        gap: 15
    };

    return (
            <Container>
                <Text color="black" align="center" mb="15px">
                    <Title order={1}>{t("C1")}</Title>
                </Text>

                <Text color="dimmed" align="center" mb="25px">
                    {t("C2")}
                </Text>

                <Carousel
                    withIndicators
                    height={300}
                    slideSize="33.333333%"
                    slideGap="md"
                    breakpoints={[
                        { maxWidth: 'md', slideSize: '50%' },
                        { maxWidth: 'sm', slideSize: '100%', slideGap: 15 },
                    ]}
                    loop
                    align="start"
                    pr="10px"
                    pl="10px"
                >
                    <Carousel.Slide>
                        <div style={carouselContent}>
                            <Title order={2}>{t("Send")}</Title>
                            <Text>{t("C3")}</Text>
                        </div>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <div style={carouselContent}>
                            <Title order={2}>{t("Send")}</Title>
                            <Text>{t("C4")}</Text>
                        </div>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <div style={carouselContent}>
                            <Title order={2}>{t("Send")}</Title>
                            <Text>{t("C5")}</Text>
                        </div>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <div style={carouselContent}>
                            <Title order={2}>{t("Send")}</Title>
                            <Text>{t("C6")}</Text>
                        </div>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <div style={carouselContent}>
                            <Title order={2}>{t("Send")}</Title>
                            <Text>{t("C7")}</Text>
                        </div>
                    </Carousel.Slide>
                </Carousel>
            </Container>
    );
};
