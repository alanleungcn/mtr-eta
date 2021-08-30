import React from 'react';
import i18next from 'i18next';
import { IconButton } from '@chakra-ui/react';
import { IoLanguage } from 'react-icons/all';

export const LangSwitcher = ({
  onLangChange,
}: {
  onLangChange: () => void;
}) => {
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
