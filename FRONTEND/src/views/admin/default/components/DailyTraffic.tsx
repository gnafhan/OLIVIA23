// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";
import { ApexOptions } from "apexcharts";

// Custom components
import Card from "components/card/Card";
import { barChartDataDailyTraffic } from "variables/charts";
import { PiTargetDuotone } from "react-icons/pi";
// Assets

import { RiArrowUpSFill } from "react-icons/ri";
import { useState } from "react";
import PieChart from "components/charts/PieChart";
import { VSeparator } from "components/separator/Separator";
import Desc from "./Desc";

type ApexGeneric = ApexOptions & any;
export default function DailyTraffic(props: { [x: string]: any }) {
  const { ...rest } = props;
  const [chart, setChart] = useState("bar");

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  console.log(props.chart_data)
  console.log(props.options)
  const handleChange = (e: any) => {
    setChart(e.target.value);
  };
  return (
    <Card alignItems="center" flexDirection="column" w="100%" {...rest}>
      <Flex justify="space-between" align="start" px="10px" pt="5px" w="100%">
        <Flex flexDirection="column" align="start" me="20px">
          <Text color="secondaryGray.600" fontSize="sm" fontWeight="500">
            Emotion Detection
          </Text>
          <Flex align="end">
            <Text
              color={textColor}
              fontSize="34px"
              fontWeight="700"
              lineHeight="100%"
            >
              {props.emotion || "Angry"}
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
                  {`${props.emotion_score || 50}%`}
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
          defaultValue="bar"
          width="unset"
          fontWeight="700"
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </Select>
      </Flex>
      <Box h="300px" mt="auto">
        {chart == "bar" ? (
          <BarChart
            chartData={props.chart_data}
            chartOptions={props.options}
          />
        ) : (
          <PieChart
            h='200%' w='200%'
            chartData={props.chart_data[0].data.map((item: any) => item.y)}
            chartOptions={pieChartOptionss}
          />
        )}
      </Box>
      {chart =="bar"? null: (
              <Desc data={props.chart_data[0].data} />
      )}


    </Card>
  );
}

export const pieChartOptionss: ApexGeneric = {
  labels: ["Anger", "Fear", "Happy", "Love", "Sadness"],
  colors: ["#DB4437", "#F4B400", "#4285F4", "#EE79CF", "#0F9D58"],
  chart: {
    width: "150px",
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
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  pie: {
    startAngle: 0,
    endAngle: 360,
    expandOnClick: true,
    offsetX: 0,
    offsetY: 0,
    customScale: 1,
    dataLabels: {
        offset: 0,
        minAngleToShowLabel: 10
    },
  },

  fill: {
    colors: ["#DB4437", "#F4B400", "#4285F4", "#EE79CF", "#0F9D58"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};
