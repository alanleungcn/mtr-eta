import * as React from 'react';
import { HStack, Link } from '@chakra-ui/react';

export const Footer = ({ code }: { code: string }) => {
	return (
		<HStack spacing="25px">
			<Link
				href={`https://www.mtr.com.hk/archive/ch/services/layouts/${code}.pdf`}
			>
				Station map
			</Link>
			<Link
				href={`https://www.mtr.com.hk/archive/ch/services/maps/${code}.pdf`}
			>
				Location map
			</Link>
		</HStack>
	);
};
