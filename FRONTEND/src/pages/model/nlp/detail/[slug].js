import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Skeleton,
  Text,
  useBreakpointValue,
  useDisclosure,
  Select,
  useColorModeValue,
  Avatar,
  Badge
} from "@chakra-ui/react";
import AdminLayout from "layouts/admin";
import Card from "components/card/Card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import GeneralInformation from "views/admin/profile/components/General";
import GeneralInformationYoutube from "components/youtubecard/general";
import CommentGeneralInformationYoutube from "components/youtubecard/commentGeneral";
import DailyTraffic2 from "views/admin/default/components/Bar2";
import Pie2 from "views/admin/default/components/Pie2";

export default function Detail() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const divider = useBreakpointValue({ base: 3.1, md: 2 });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [model, setModel] = useState("speed");
  const [comments, setComments] = useState(null);
  const [positiveCount, setPositiveCount] = useState(0);
  const [negativeCount, setNegativeCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [sentimentProba, setSentimentProba] = useState(null);
  const brandColor = useColorModeValue("brand.500", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const estimatedTime = () => {
    if (model === "speed") {
      return convertSeconds((parseInt(data.commentCount) * 0.05).toFixed(0));
    } else {
      return convertSeconds((parseInt(data.commentCount) * 1.362).toFixed(0));
    }
  };
  const convertSeconds = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;
    let result = "";

    if (hours > 0) {
      result += hours + (hours === 1 ? " hour " : " hours ");
    }

    if (minutes > 0) {
      result += minutes + (minutes === 1 ? " minute " : " minutes ");
    }

    if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
      result +=
        remainingSeconds + (remainingSeconds === 1 ? " second" : " seconds");
    }

    return result;
  };
  const handleModel = (e) => {
    setModel(e.target.value);
  };

  const removeBr = (str) => {
    return str.replace(/<br\s*\/?>/gi, "<br/>");
  }

  const getData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/predict/nlp/`, {
        id: id
      });
      setData(response.data);
      if (response.data.comments) {
        setComments(response.data.comments);

        let positive = 0;
        let negative = 0;
        let neutral = 0;

        response.data.comments.map((item) => {
          if (item.sentiment.prediction === "positive") {
            positive++;
          } else {
            if (item.sentiment.prediction === "neutral") {
              neutral++;
            }else{
              negative++;
            }
          }
        }
        );
        setPositiveCount(positive);
        setNegativeCount(negative);
        setNeutralCount(neutral);
        setChartData([
          {
            "x": "Positive",
            "y": positive,
            "fillColor": "#4285F4"
          },
          {
            "x": "Neutral",
            "y": neutral,
            "fillColor": "#F4B400"
          },
          {
            "x": "Negative",
            "y": negative,
            "fillColor": "#DB4437"
          }
        ]);
      }
      setLoading(false);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handlePredict = async () => {
    onClose();
    try {
      setLoading(true);
      const response = await axios.post(`/api/predict/nlp/`, {
        id: slug,
        model: model
      });
      setComments(response.data.comments);
      let positive = 0;
      let negative = 0;
      let neutral = 0;

      response.data.comments.map((item) => {
        if (item.sentiment.prediction === "positive") {
          positive++;
        } else {
          if (item.sentiment.prediction === "neutral") {
            neutral++;
          }else{
            negative++;
          }
        }
      }
      );
      setPositiveCount(positive);
      setNegativeCount(negative);
      setNeutralCount(neutral);
      setChartData([
        {
          "x": "Positive",
          "y": positive,
          "fillColor": "#4285F4"
        },
        {
          "x": "Neutral",
          "y": neutral,
          "fillColor": "#F4B400"
        },
        {
          "x": "Negative",
          "y": negative,
          "fillColor": "#DB4437"
        }
      ]);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (slug) {
      getData(slug);
    }
  }, [slug]);

  let barChartDataDailyTraffic = [
    {
      name: "Data Count",
      data: chartData,
    }];
  
    const getProba = (data) => {
      if(data.sentiment.model == "speed"){ 
      if (data.sentiment.prediction == "negative") {
        return data.sentiment.score.negative
      } else if (data.sentiment.prediction == "neutral") {
        return data.sentiment.score.neutral
      } else {
        return data.sentiment.score.positive
      }
      } else{
        return data.sentiment.score
      }


    }

  return (
    <>
      <AdminLayout>
        <Box pt={{ base: "130px", md: "80px", xl: "90px" }}>
          <Card minH={"80vh"}>
            <Flex flexDirection={"column"}>
              <Flex justifyContent={"center"} alignContent={"center"}>
                <Skeleton
                  isLoaded={!loading}
                  borderRadius={"lg"}
                  marginBottom={"30px"}
                >
                  <Center>
                    <iframe
                      width={`${1013 / divider}`}
                      height={`${570 / divider}`}
                      style={{ borderRadius: "20px" }}
                      src={`https://www.youtube.com/embed/${slug}`}
                      title="Muncul Fenomena Ngeri Di Dunia, 19 Negara Setop Ekspor Pangan"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </Center>
                </Skeleton>
              </Flex>
              {data ? (
                <>
                  <Skeleton isLoaded={!loading} borderRadius={"lg"}>
                    <GeneralInformationYoutube
                      title={data.title}
                      description={data.description}
                      viewCount={data.viewCount}
                      commentCount={data.commentCount}
                      likeCount={data.likeCount}
                    />
                  </Skeleton>
                  <Modal
                    isCentered
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Select Model</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text>{`Estimated Time: ${estimatedTime()}`}</Text>
                        <Select
                          value={model}
                          onChange={handleModel}
                          borderRadius={"lg"}
                        >
                          <option value="speed">Speed (Recommended)</option>
                          <option value="accuracy">Accuracy</option>
                        </Select>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          colorScheme="blue"
                          mr={3}
                          onClick={handlePredict}
                        >
                          Predict
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              ) : (
                <>
                  <Skeleton isLoaded={false} borderRadius={"lg"}>
                    <GeneralInformationYoutube
                      title={"aaaa"}
                      description={"aaaa"}
                    />
                  </Skeleton>
                </>
              )}
              {comments ? (
                <>
                <CommentGeneralInformationYoutube
                      positiveCount={positiveCount}
                      neutralCount={neutralCount}
                      negativeCount={negativeCount}
                    />
                    <Flex flexDirection={{base: "column", md:"row"}}>
                    <DailyTraffic2 model={comments[0].sentiment.model} data={barChartDataDailyTraffic} positiveCount={positiveCount} neutralCount={neutralCount} negativeCount={negativeCount} />
                    <Pie2 model={comments[0].sentiment.model} positiveCount={positiveCount} neutralCount={neutralCount} negativeCount={negativeCount} />
                    </Flex>
                  <Flex gap={"5"} flexDirection={"column"}>
                    {comments.map((item, index) => (
                      <Box
                        borderRadius={"xl"}
                        key={index}
                        borderRight="2px"
                        borderColor={
                          item.sentiment.prediction == "negative"
                            ? "red"
                            : item.sentiment.prediction == "neutral"
                            ? "yellow"
                            : "blue"
                        }
                      >
                        <Card boxShadow={cardShadow} key={index}>
                          <Flex marginBottom={"10px"} flexDirection={"row"}  >
                          <Avatar marginRight={"5px"} size="xs" name={item.author} src={item.authorProfileImageUrl}  as="a" href={item.authorChannelUrl} target="_blank"/>
                          <Text fontWeight={"semibold"}  as="a" href={item.authorChannelUrl} target="_blank" >
                            {item.author}
                          </Text>
                          <Badge px="2px" marginStart={"10px"} colorScheme={"teal"} >
                            {(getProba(item)*100).toFixed(2)}%
                          </Badge>
                          </Flex>
                          <Text lineHeight={"4"} dangerouslySetInnerHTML={{ __html: removeBr(item.text) }} />
                        </Card>
                      </Box>
                    ))}
                  </Flex>
                </>
              ) : (
                <>
                  <Skeleton mt={"10px"} isLoaded={!loading} borderRadius={"lg"}>
                    <Center>
                      <Button variant="brand" onClick={onOpen} px={"50px"}>
                        Analyze Sentimen
                      </Button>
                    </Center>
                  </Skeleton>
                </>
              )}
            </Flex>
          </Card>
        </Box>
      </AdminLayout>
    </>
  );
}
