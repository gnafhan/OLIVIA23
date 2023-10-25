// Chakra imports
import { Box, Flex, Icon, Skeleton, Text, useColorModeValue } from '@chakra-ui/react';
import BarChart from 'components/charts/BarChart';

// Custom components
type ApexGeneric = ApexOptions & any;
import Card from 'components/card/Card';
import { barChartDataDailyTraffic } from 'variables/charts';

// Assets
import { RiArrowUpSFill } from 'react-icons/ri';

import { ApexOptions } from "apexcharts";
import { PiTargetDuotone } from 'react-icons/pi';
import { useState } from 'react';
import { useEffect } from 'react';


export default function DailyTraffic2(props: { [x: string]: any }) {
	const { ...rest } = props;
	const[loading, setLoading] = useState(true)
	const [sentiment, setSentiment] = useState("Positive")
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
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
		<Card alignItems='center' flexDirection='column' w='100%' >
			<Flex justify='space-between' align='start' px='10px' pt='5px' w='100%'>
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
						{sentiment || "Positive"}
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
			<Box h='240px' mt='auto'>
				{!loading?(<>
					<BarChart chartData={props.data} chartOptions={barChartOptionsDailyTraffic} />
				</>):(<>
				<Skeleton>
					<BarChart chartData={barChartDataDailyTraffic2} chartOptions={barChartOptionsDailyTraffic} />
				</Skeleton>
				</>)}
				
			</Box>
		</Card>
	);
}

const barChartOptionsDailyTraffic: ApexGeneric = {
	chart: {
	  toolbar: {
		show: false,
	  },
	},
	tooltip: {
	  style: {
		fontSize: "12px",
		fontFamily: undefined,
	  },
	  onDatasetHover: {
		style: {
		  fontSize: "12px",
		  fontFamily: undefined,
		},
	  },
	  theme: "dark",
	},
	xaxis: {
	  categories: ["Positive","Neutral","Negative"],
	  show: false,
	  labels: {
		show: true,
		style: {
		  colors: "#A3AED0",
		  fontSize: "14px",
		  fontWeight: "500",
		},
	  },
	  axisBorder: {
		show: false,
	  },
	  axisTicks: {
		show: false,
	  },
	},
	yaxis: {
	  show: false,
	  color: "black",
	  labels: {
		show: true,
		style: {
		  colors: "#CBD5E0",
		  fontSize: "14px",
		},
	  },
	},
	grid: {
	  show: false,
	  strokeDashArray: 5,
	  yaxis: {
		lines: {
		  show: true,
		},
	  },
	  xaxis: {
		lines: {
		  show: false,
		},
	  },
	},
	dataLabels: {
	  enabled: true,
	},
	plotOptions: {
	  bar: {
		borderRadius: 10,
		columnWidth: "40px",
	  },
	},
  };

const barChartDataDailyTraffic2 = [
	{
	  name: "Daily Traffic",
	  data: [
		{
			"x": "Positive",
			"y": 16,
			"fillColor": "#4285F4"
		},
		{
			"x": "Neutral",
			"y": 19,
			"fillColor": "#F4B400"
		},
		{
			"x": "Negative",
			"y": 28,
			"fillColor": "#DB4437"
		}
	]
	},
  ];
  
  