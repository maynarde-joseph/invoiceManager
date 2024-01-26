import { createStyles, Anchor, Group, ActionIcon } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram
} from "@tabler/icons-react";
import { useTranslation } from 'react-i18next';

const useStyles = createStyles((theme) => ({
  footer: {
    position: "fixed",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
    bottom: 0,
    left: "25%",
    width: "50%",
    left: "25%",
    borderRadius: '15px 15px 0 0',
    border: `1px solid ${theme.colors.gray[4]}`,
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    padding: '15px 0', // Add padding to make the background bigger
  },
}));

export function FooterCentered() {
  const { classes } = useStyles();
  const { t } = useTranslation();

  const hardCodedLinks = [
    {
      "link": "#",
      "label": t("LABEL1")
    },
    {
      "link": "#",
      "label": t("LABEL2")
    },
    {
      "link": "#",
      "label": t("LABEL3")
    },
    {
      "link": "#",
      "label": t("LABEL4")
    },
    {
      "link": "#",
      "label": t("LABEL5")
    }
  ];

  const items = hardCodedLinks.map((link) => (
    <Anchor
      color="dimmed"
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links}>{items}</Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
