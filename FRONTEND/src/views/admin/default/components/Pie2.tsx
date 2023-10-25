// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue, Icon } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import PieChart from 'components/charts/PieChart';
import { pieChartData, pieChartOptions } from 'variables/charts';
import { VSeparator } from 'components/separator/Separator';
import { RiArrowUpSFill } from 'react-icons/ri';
import { useState } from 'react';
import { useEffect } from 'react';
export default function Conversion(props: { [x: string]: any }) {
	const { ...rest } = props;
    const [loading, setLoading] = useState(true)
    const [sentiment, setSentiment] = useState("Positive")
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const cardColor = useColorModeValue('white', 'navy.700');
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
    const total = props.positiveCount + props.neutralCount + props.negativeCount

    useEffect(() => {
        if(props.negativeCount >= props.positiveCount && props.negativeCount >= props.neutralCount){
            if (props.negativeCount == props.positiveCount || (props.negativeCount == props.neutralCount && props.negativeCount == props.positiveCount)){
                setSentiment("Neutral")
            } else {
                setSentiment("Negative")   
            }
        } else if (props.neutralCount>= props.positiveCount && props.neutralCount >= props.negativeCount){
            if (props.neutralCount == props.positiveCount){
                setSentiment("Positive")
            } else if (props.neutralCount == props.negativeCount){
                setSentiment("Negative")
            } else{
                setSentiment("Neutral") 
            }
        } else if (props.positiveCount >= props.negativeCount && props.positiveCount >= props.neutralCount){
            if (props.positiveCount == props.negativeCount){
                setSentiment("Neutral")
            } else if (props.positiveCount == props.neutralCount){
                setSentiment("Positive")  
            }
        } else{
            setSentiment("Error")
        }
    },[props.positiveCount, props.neutralCount, props.negativeCount])

    setInterval(() => {
        setLoading(false);
        
      }, 500);
	return (
		<Card p='20px' alignItems='center' flexDirection='column' w='100%' {...rest}>
			<Flex
				px={{ base: '0px', '2xl': '10px' }}
				justifyContent='space-between'
				alignItems='center'
				w='100%'
				mb='8px'>
				<Flex flexDirection="column" align="start" me="20px">
					<Text color="secondaryGray.600" fontSize="sm" fontWeight="500">
						Sentiment Detection
					</Text>
					<Flex align="end">
						<Text
						color={textColor}
						fontSize="34px"
						fontWeight="700"
						lineHeight="100%"
						>
						{sentiment|| "Positive"}
						</Text>
					</Flex>
				</Flex>
                    <Flex align='center' mt='4px'>
					<Icon as={RiArrowUpSFill} color='green.500' />
					<Text color='green.500' fontSize='sm' fontWeight='700'>
                    {props.model.charAt(0).toUpperCase() + props.model.slice(1)}
					</Text>
				</Flex>
			</Flex>
            {!loading?(<>
			    <PieChart h='80%' w='80%' chartData={[props.positiveCount, props.neutralCount, props.negativeCount]} chartOptions={pieChartOptions2} />
				</>):(<>
				</>)}
			<Card
				bg={cardColor}
				flexDirection='row'
				w='100%'
				p='15px'
				px='20px'
				mx='auto'
                flexWrap={"wrap"}
                >
				<Flex direction='column' py='5px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='#4285F4' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							Positive
						</Text>
					</Flex>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						{((props.positiveCount/total)*100).toFixed(0)}%
					</Text>
				</Flex>
				<VSeparator mx={{ base: "10px", xl: "30px", "2xl": "45px" }} />
				<Flex direction='column' py='5px' me='10px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='#F4B400' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							Neutral
						</Text>
					</Flex>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
                    {((props.neutralCount/total)*100).toFixed(0)}%
					</Text>
				</Flex>
				<VSeparator mx={{ base: "10px", xl: "30px", "2xl": "45px" }} />
				<Flex direction='column' py='5px' me='10px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='#DB4437' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							Negative
						</Text>
					</Flex>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
                    {((props.negativeCount/total)*100).toFixed(0)}%
					</Text>
				</Flex>
			</Card>
		</Card>
	);
}

export const pieChartOptions2: any= {
    labels: ["Positive", "Neutral", "Negative"],
    colors: ["#4285F4", "#F4B400","#DB4437"],
    chart: {
      width: "100px",
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: true,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    
    fill: {
      colors: ["#4285F4", "#F4B400","#DB4437"],
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
  };


  const PieChart2: any = [10,20,30]
