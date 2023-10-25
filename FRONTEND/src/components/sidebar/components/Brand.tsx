// Chakra imports
import { Flex, Heading, useColorModeValue, Text } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Text fontWeight="bold" fontSize="30px" my='32px'>NAFHAN <span style={{ fontWeight: "normal" }}>AI</span></Text>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
