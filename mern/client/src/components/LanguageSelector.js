import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  selectorContainer: {
    position: 'fixed',
    bottom: 10,
    left: 50,
    transform: 'translateX(-50%)',
  },
  selector: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
    borderRadius: '15px',
    border: `1px solid ${theme.colors.gray[4]}`, // Add border to give the selector an outline
    padding: '5px 10px',
    color: theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fontFamily,
    appearance: 'none',
  },
}));

function LanguageSelector() {
  const { classes } = useStyles();
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || i18n.language);

  const changeLanguage = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    setSelectedLanguage(newLanguage); // update selectedLanguage state
    localStorage.setItem('language', newLanguage); // save selected language to localStorage
  };

return (
    <div className={classes.selectorContainer}>
      <select className={classes.selector} value={selectedLanguage} onChange={changeLanguage}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="zh">中文</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
      </select>
    </div>
  );
}

export default LanguageSelector;