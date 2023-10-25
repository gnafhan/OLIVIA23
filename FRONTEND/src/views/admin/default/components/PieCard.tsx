// Chakra imports
import {
  Box,
  Flex,
  Text,
  Select,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import PieChart from "components/charts/PieChart";
import { barChartOptionsDailyTraffic, pieChartData, pieChartOptions } from "variables/charts";
import { VSeparator } from "components/separator/Separator";
import { PiTargetDuotone } from "react-icons/pi";
import { useState } from 'react';
import BarChart from "components/charts/BarChart";

export default function Conversion(props: { [x: string]: any }) {
  const { ...rest } = props;
  const [chart, setChart] = useState("pie");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	setChart(event.target.value);
  };
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card
      p="20px"
      alignItems="center"
      flexDirection="column"
      w="100%"
      {...rest}
    >
      <Flex justify="space-between" align="start" px="10px" pt="5px" w="100%">
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
              {props.sentiment.charAt(0).toUpperCase() + props.sentiment.slice(1) || ""}
            </Text>
            <Flex display={{ base: "none", md: "flex" }}>
              <Text
                ms="6px"
                color="secondaryGray.600"
                fontSize="sm"
                fontWeight="500"
              >
                Predicted
              </Text>
              <Flex align="center">
                <Text
                  color="green.500"
                  fontSize="sm"
                  fontWeight="700"
                  ml={"5px"}
                >
					{props.sentiment == "negative"?`${100-props.sentScore|| 50}%`: `${props.sentScore|| 50}%`}	
                  <Icon as={PiTargetDuotone} color="green.500" />
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Select
            onChange={handleChange}
          fontSize="sm"
          variant="subtle"
          defaultValue="pie"
          width="unset"
          fontWeight="700"
        >
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Chart</option>
        </Select>
      </Flex>
	  { chart == "pie"? (      <PieChart
        h="100%"
        w="100%"
        chartData={[props.sentScore, 100 - props.sentScore]}
        chartOptions={pieChartOptions}
      />):(<>
	  <BarChart chartData={[
		{
		  name: "Sentiment score (%) ",
		  data: [props.sentScore, 100 - props.sentScore]
		}
		]} chartOptions={barChartOptionsDailyTraffic} />												
	  </>)}

      <Card
        bg={cardColor}
        flexDirection="row"
        
        w="100%"
        p="15px"
        px="20px"
        mt="15px"
        mx="auto"
      >
		{ chart == "bar"? null: (<>
			<Flex direction="column" py="5px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="brand.500" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb=""
            >
              Positive
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {props.sentScore}%
          </Text>
        </Flex>
        <VSeparator mx={{ base: "60px", xl: "60px", "2xl": "60px" }} />
        <Flex direction="column" py="5px" me="10px">
          <Flex align="center">
            <Box h="8px" w="8px" bg="#6AD2FF" borderRadius="50%" me="4px" />
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb=""
            >
              Negative
            </Text>
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            {100 - props.sentScore}%
          </Text>
        </Flex>
		</>)}

      </Card>
    </Card>
  );
}
