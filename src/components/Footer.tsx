import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, Link } from '@chakra-ui/react';

interface Props {
  code: string;
}

export const Footer = ({ code }: Props) => {
  const { t } = useTranslation();
  return (
    <HStack spacing="25px">
      <Link
        href={`https://www.mtr.com.hk/archive/ch/services/layouts/${code}.pdf`}
      >
        {t('Station map')}
      </Link>
      <Link
        href={`https://www.mtr.com.hk/archive/ch/services/maps/${code}.pdf`}
      >
        {t('Location map')}
      </Link>
    </HStack>
  );
};
