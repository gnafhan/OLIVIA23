// Chakra imports
import { Flex, Icon, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import Information from "views/admin/profile/components/Information";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { BiChat, BiData } from "react-icons/bi";
import { FaEye, FaRegThumbsUp } from "react-icons/fa";

// Assets
export default function GeneralInformationYoutube(props) {
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
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        {props.title}
      </Text>
      <Text textAlign={"justify"} color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        {props.description}
      </Text>
      <SimpleGrid columns={{base:1, md:3}} gap="20px">
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
                    as={FaEye}
                    color={brandColor}
                    style={{ transform: "scaleX(-1)" }}
                  />
                }
              />
            }
            name="Views"
            value={props.viewCount}
            fontSize={"md"}
          />
		</Flex>

        </Card>
        <Card boxShadow={cardShadow}>
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
                    as={FaRegThumbsUp}
                    color={brandColor}
                    style={{ transform: "scaleX(1)" }}
                  />
                }
              />
            }
            name="Likes"
            value={props.likeCount}
            fontSize={"md"}
          />
        </Card>
        <Card boxShadow={cardShadow}>
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
                    as={BiChat}
                    color={brandColor}
                    style={{ transform: "scaleX(1)" }}
                  />
                }
              />
            }
            name="Comments"
            value={props.commentCount}
            fontSize={"md"}
          />
        </Card>
      </SimpleGrid>
    </Card>
  );
}
