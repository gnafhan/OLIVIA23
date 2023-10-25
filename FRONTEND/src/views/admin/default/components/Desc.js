import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { VSeparator } from "components/separator/Separator";



export default function Desc (props){
    const [anger, fear, happy, love, sadness] = props.data.map((item)=>item.y)
    const textColor = useColorModeValue("secondaryGray.900", "white");
    console.log([anger, fear, happy, love, sadness])
    return(
        <Flex flexDirection={"row"}>
              <Flex direction="column" py="5px">
      <Flex align="center">
        <Box h="8px" w="8px" bg="#DB4437" borderRadius="50%" me="4px" />
        <Text
          fontSize="xs"
          color="secondaryGray.600"
          fontWeight="700"
          mb=""
        >
          Anger
        </Text>
      </Flex>
      <Text fontSize="lg" color={textColor} fontWeight="700">
        {anger}%
      </Text>
    </Flex>
    <VSeparator mx={{ base: "15px", xl: "15px", "2xl": "15px" }} />
    <Flex direction="column" py="5px" me="10px">
      <Flex align="center">
        <Box h="8px" w="8px" bg="#F4B400" borderRadius="50%" me="4px" />
        <Text
          fontSize="xs"
          color="secondaryGray.600"
          fontWeight="700"
          mb=""
        >
          Fear
        </Text>
      </Flex>
      <Text fontSize="lg" color={textColor} fontWeight="700">
        {fear}%
      </Text>
    </Flex>
    <VSeparator mx={{ base: "15px", xl: "15px", "2xl": "15px" }} />
    <Flex direction="column" py="5px" me="10px">
      <Flex align="center">
        <Box h="8px" w="8px" bg="#4285F4" borderRadius="50%" me="4px" />
        <Text
          fontSize="xs"
          color="secondaryGray.600"
          fontWeight="700"
          mb=""
        >
          Happy
        </Text>
      </Flex>
      <Text fontSize="lg" color={textColor} fontWeight="700">
        {happy}%
      </Text>
    </Flex>
    <VSeparator mx={{ base: "15px", xl: "15px", "2xl": "15px" }} />
    <Flex direction="column" py="5px" me="10px">
      <Flex align="center">
        <Box h="8px" w="8px" bg="#EE79CF" borderRadius="50%" me="4px" />
        <Text
          fontSize="xs"
          color="secondaryGray.600"
          fontWeight="700"
          mb=""
        >
          Love
        </Text>
      </Flex>
      <Text fontSize="lg" color={textColor} fontWeight="700">
        {love}%
      </Text>
    </Flex>
    <VSeparator mx={{ base: "15px", xl: "15px", "2xl": "15px" }} />
    <Flex direction="column" py="5px" me="10px">
      <Flex align="center">
        <Box h="8px" w="8px" bg="#0F9D58" borderRadius="50%" me="4px" />
        <Text
          fontSize="xs"
          color="secondaryGray.600"
          fontWeight="700"
          mb=""
        >
          Sadness
        </Text>
      </Flex>
      <Text fontSize="lg" color={textColor} fontWeight="700">
        {sadness}%
      </Text>
    </Flex>
  </Flex>
    )
}