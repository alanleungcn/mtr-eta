import React from 'react';
import i18next from 'i18next';
import { IoLanguage } from 'react-icons/io5';
import { IconButton } from '@chakra-ui/react';

interface Props {
  onLangChange: () => void;
}

export const LangSwitcher = ({ onLangChange }: Props) => {
  const toggleLang = () => {
    i18next
      .changeLanguage(i18next.language === 'en' ? 'zh' : 'en')
      .then(() => onLangChange());
  };
  return (
    <IconButton
      fontSize="20"
      variant="outline"
      onClick={toggleLang}
      icon={<IoLanguage />}
      aria-label="change language"
    />
  );
};
