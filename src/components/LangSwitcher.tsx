import { IconButton } from '@chakra-ui/react';
import i18next from 'i18next';
import React from 'react';
import { FaLanguage } from 'react-icons/fa';

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
      variant="outline"
      onClick={toggleLang}
      icon={<FaLanguage />}
      aria-label="change language"
    />
  );
};
