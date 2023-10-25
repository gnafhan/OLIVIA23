// Chakra imports
import { Text, useColorModeValue } from "@chakra-ui/react";
// Assets
import Project1 from "img/profile/Project1.png";
import Project2 from "img/profile/Project2.png";
import Project3 from "img/profile/Project3.png";
import rating from "img/model/rating/rating.png";
// Custom components
import Card from "components/card/Card";
import Project from "views/admin/profile/components/Project";
import Comment  from 'img/model/rating/comment.png';

export default function Projects(props: { [x: string]: any }) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} minH="75vh" {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        All Model
      </Text>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        Here you can find more details about models. Keep you user
        engaged by providing meaningful information.
      </Text>
      <Project
        boxShadow={cardShadow}
        mb="20px"
        image={Comment}
        ranking="1"
        link="/model/nlp"
        title="NLP Youtube Public Sentiment"
      />
    </Card>
  );
}
