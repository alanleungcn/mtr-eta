import * as React from 'react';
import { HStack, Link } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const Footer = ({ code }: { code: string }) => {
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
