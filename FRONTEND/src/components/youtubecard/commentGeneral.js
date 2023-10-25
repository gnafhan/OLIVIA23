// Chakra imports
import { Box, Flex, Icon, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import Information from "views/admin/profile/components/Information";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { BiChat, BiData } from "react-icons/bi";
import { FaEye, FaRegThumbsUp } from "react-icons/fa";
import { RiUser3Line, RiUserHeartLine, RiUserUnfollowLine } from "react-icons/ri";

// Assets
export default function CommentGeneralInformationYoutube(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <SimpleGrid columns={{base:1, md:3}} gap="20px">
        <Box borderRight={"2px"} borderColor={"blue"} borderRadius={"lg"} >
            <Card boxShadow={cardShadow}>
            <Flex justifyContent={"center"} alignContent={"center"}>
            <MiniStatistics
                startContent={
                <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={
                    <Icon
                        w="32px"
                        h="32px"
                        as={RiUserHeartLine}
                        color={brandColor}
                        style={{ transform: "scaleX(1)" }}
                    />
                    }
                />
                }
                name="Postive"
                value={props.positiveCount}
                fontSize={"md"}
            />
            </Flex>

            </Card>
        </Box>
        <Box borderRight={"2px"} borderColor={"yellow"} borderRadius={"lg"} >
            <Card boxShadow={cardShadow}>
            <Flex justifyContent={"center"} alignContent={"center"}>
            <MiniStatistics
                startContent={
                <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={
                    <Icon
                        w="32px"
                        h="32px"
                        as={RiUser3Line}
                        color={brandColor}
                        style={{ transform: "scaleX(1)" }}
                    />
                    }
                />
                }
                name="Neutral"
                value={props.neutralCount}
                fontSize={"md"}
            />
            </Flex>

            </Card>
        </Box>
        <Box borderRight={"2px"} borderColor={"red"} borderRadius={"lg"} >
            <Card boxShadow={cardShadow}>
            <Flex justifyContent={"center"} alignContent={"center"}>
            <MiniStatistics
                startContent={
                <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={
                    <Icon
                        w="32px"
                        h="32px"
                        as={RiUserUnfollowLine}
                        color={brandColor}
                        style={{ transform: "scaleX(1)" }}
                    />
                    }
                />
                }
                name="Negative"
                value={props.negativeCount}
                fontSize={"md"}
            />
            </Flex>

            </Card>
        </Box>
      </SimpleGrid>
    </Card>
  );
}
