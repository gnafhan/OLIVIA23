import React, { useEffect, useState } from 'react';
// Chakra imports
import { Badge, Box, Flex, Icon, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import { FaEthereum } from 'react-icons/fa';
import { TfiTarget } from 'react-icons/tfi';
import { Image } from 'components/image/Image';

export default function NFT(props: {
	image: string;
	name: string;
	author: number;
	date: string;
	price: string | number;
	id: string;
	home?: boolean;
}) {
	const { image, name, author, date, price, id, home } = props;
	// Chakra Color Mode
	const textColor = useColorModeValue('brands.900', 'white');
	const [display, setDisplay] = useState('none');
	const bgItem = useColorModeValue(
		{ bg: 'white', boxShadow: '0px 40px 58px -20px rgba(112, 144, 176, 0.12)' },
		{ bg: 'navy.700', boxShadow: 'unset' }
	);
	const truncatedText = useBreakpointValue({ 
		base: `${author}`.slice(0, 20) + '...',
		 md: author
		 });
	const divider = useBreakpointValue({ 
			base: 3,
			 md: 2.5
			 });

	useEffect(() => {
		if (home) {
			setDisplay("none");
		} else {
			setDisplay({base:"none", md:"flex"});
		}
	}, [home]);

	const textColorDate = useColorModeValue('secondaryGray.600', 'white');
	return (
		<Card _hover={bgItem} bg='transparent' boxShadow='unset' px='24px' py='21px' transition='0.2s linear' as={"a"} href={id}>
			<Flex direction={{ base: 'column' }} justify='center'>
				<Flex position='relative' align='center'>
					<Box>
						<Image display={display} src={image} w={`${340/divider}px`} h={`${180/divider}px`} me='16px' alt="emotion" />
					</Box>
					<Flex
						direction='column'
						w={{ base: '70%', md: '100%' }}
						me={{ base: '4px', md: '32px', xl: '10px', '3xl': '32px' }}>
						<Text
							color={textColor}
							fontSize={{
								base: 'md'
							}}
							mb='5px'
							fontWeight='bold'
							me='14px'>
							{name}
						</Text>
						<Text
							color='secondaryGray.600'
							fontSize={{
								base: 'sm'
							}}
							fontWeight='400'
							me='14px'>
							{new Date(author*1000).toLocaleDateString()}
						</Text>
					</Flex>
					<Flex w='max-content' me={{ base: '4px', md: '32px', xl: '10px', '3xl': '32px' }} align='center'  display={{base: "none", md:"flex"}}>
						{/* <Icon as={TfiTarget} color={textColor} width='27px' me='2px' /> */}
						<Text w='max-content' fontWeight='700' fontSize='md' color={textColor}>
							{price}
						</Text>
					</Flex>
					{date =="Completed" ?(<>
						<Badge colorScheme={"green"} >{date}</Badge>
					</>):(<><Badge colorScheme={"red"}>{date}</Badge></>)}
					{/* <Text ms='auto' fontWeight='700' fontSize='sm' color={textColorDate} bgColor="red" borderRadius="10px" padding="2px" >
						{date}
					</Text> */}
				</Flex>
			</Flex>
		</Card>
	);
}
