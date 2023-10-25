/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Flex,
  Input,
  useColorModeValue,
  Center,
  Text,
  Textarea,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Fade,
} from "@chakra-ui/react";
// Assets
// Custom components
import AdminLayout from "layouts/admin";
import Card from "components/card/Card";
import { useEffect, useState } from "react";
import think from "img/avatars/1.png";
import happy from "img/avatars/2.png";
import love from "img/avatars/3.png";
import angry from "img/avatars/4.png";
import fear from "img/avatars/5.png";
import sad from "img/avatars/6.png";
import Image from "next/image";
import { Modal } from "react-bootstrap";

export default function UserReports() {
  // Chakra Color Mode
  const [data, setData] = useState(null);
  const [sentiment, setSentiment] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emotion, setEmotion] = useState(think);
  const [id, setId] = useState(null);
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const handleInput = (e) => {
    setSentiment(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/predict/rating/", {
        method: "POST",
        body: JSON.stringify({ "text": sentiment }),
        headers: {
          "Content-Type": "application/json",
          "api-key": "89!Vqi%kS=F!gu~/|,[E.hR7da4[k",
        },
      });
      const data = await response.json();
      setData(data);
      setShow(true);
      setId(data._id);
      console.log(data)
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleShpw = () => {
    setShow(!show)
  }

  useEffect(() => {
    if (data) {
      if (data.emotion == "happy") {
        setEmotion(happy);
      } else if (data.emotion == "love") {
        setEmotion(love);
      } else if (data.emotion == "anger") {
        setEmotion(angry);
      } else if (data.emotion == "fear") {
        setEmotion(fear);
      } else if (data.emotion == "sadness") {
        setEmotion(sad);
      }
    }
  }, [data]);
  return (
    <>
      <AdminLayout>
        <Box  pt={{ base: "130px", md: "80px", xl: "90px" }}>
          <Card  minH={"80vh"}>
            {/* <Container maxW="container.md"> */}
            <Flex justifyContent="center" mb="8">
              <Center>
                <Textarea
                  placeholder="Harganya memang murah tapi ternyata kipasnya bisa dibilang sangat lambat dan lebih cepet kipas kecil portable yg kalo buat kepanasan. Saya gabisa ngukur sih apakah rpm nya memang sesuai yaitu 1000rpm seperti di deskripsi tapi perputaran masih nampak terlihat sedikit."
                  borderRadius="16px"
                  width={{ base: "", md: "md" }}
                  onChange={handleInput}
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: useColorModeValue("#422AFB", "white"),
                      borderRadius: '24px',
                    },
                    }}
                  // mb={{ base: "10px", md: "0" }}
                />
                <Button variant={"brand"} ml={{ base: "5px", md: "10px" }} onClick={handleSubmit} >
                  Submit
                </Button>
              </Center>
            </Flex>
            <Flex
              flexWrap="wrap"
              flexDirection={"column"}
              justifyContent="center"
              alignContent={"center"}
            >
              {loading ? (  
                <Fade in={loading} unmountOnExit>
                  <Flex align={"center"} justifyContent="center" width={"50vh"} height="50vh">
                      <Spinner color={useColorModeValue('#422AFB', '#B9A2FF')} size="xl" emptyColor="gray.200" speed="1s" />          
                  </Flex>
                </Fade>
              ):(
              <Box align={"center"} width={"49vh"} height="50vh">
                <Fade in={!loading} unmountOnExit >
                  <Image alt="emoticon" src={emotion} />
                </Fade>
              </Box>
              )}
              
              <Flex justifyContent={"center"}>
                {data ? (
                  <Button variant={"brand"} as="a" href={`/model/rating/detail/${id}`} >
                    More Info
                  </Button>
                ) : (
                  <Text>Lets Predict E-Commerce Sentiment</Text>
                )}
              </Flex>
            </Flex>
          </Card>
        </Box>
      </AdminLayout>
    </>
  );
}
