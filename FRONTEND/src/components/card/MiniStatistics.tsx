// Chakra imports
import { Flex, Stat, StatLabel, StatNumber, useColorModeValue, Text } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';

export default function Default(props: {
	startContent?: JSX.Element;
	endContent?: JSX.Element;
	name: string;
	growth?: string | number;
	value: string | number;
	fontSize?: string | number;
}) {
	const { startContent, endContent, name, growth, value, fontSize } = props;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.600';
    const brandColor = useColorModeValue('#4318FF', 'white')

	return (
		<Card py='15px' overflow={"auto"} maxH="80px" css={{
			'&::-webkit-scrollbar': {
			  width: '4px',
			},
			'&::-webkit-scrollbar-track': {
			  width: '6px',
			},
			'&::-webkit-scrollbar-thumb': {
			  background: brandColor,
			  borderRadius: '24px',
			},
		  }}>
			<Flex
				my='auto'
				h='100%'
				align={{ base: 'center', xl: 'center' }}
				justify={{ base: 'center', xl: 'center' }}>
				{startContent}

				<Stat my='auto' ms={startContent ? '18px' : '0px'}>
					<StatLabel
						lineHeight='100%'
						color={textColorSecondary}
						fontSize={{
							base: 'sm'
						}}>
						{name}
					</StatLabel>
					<StatNumber
						color={textColor}
						fontSize={{
							base: fontSize
						}}
						>
						{value}
					</StatNumber>
					{growth ? (
						<Flex align='center'>
							<Text color='green.500' fontSize='xs' fontWeight='700' me='5px'>
								{growth}
							</Text>
							<Text color='secondaryGray.600' fontSize='xs' fontWeight='400'>
								since last month
							</Text>
						</Flex>
					) : null}
				</Stat>
				<Flex ms='auto' w='max-content'>
					{endContent}
				</Flex>
			</Flex>
		</Card>
	);
}
