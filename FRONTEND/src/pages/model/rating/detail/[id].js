/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Flex,
  Icon,
  SimpleGrid,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import AdminLayout from "layouts/admin";
import Card from "components/card/Card";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { MdBarChart } from "react-icons/md";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import General from "views/admin/profile/components/General";
import Image from "next/image";
import anger from "img/avatars/4.png";
import fear from "img/avatars/5.png";
import happy from "img/avatars/2.png";
import love from "img/avatars/3.png";
import sadness from "img/avatars/6.png";
import {
  BiMessageRoundedDots,
  BiMessageSquareError,
  BiMessageSquareAdd,
  BiLoaderCircle,
} from "react-icons/bi";
import { RiQuestionFill } from "react-icons/ri";
import {
  FaRegFaceAngry,
  FaRegFaceGrimace,
  FaRegFaceLaughBeam,
  FaRegFaceGrinStars,
  FaRegFaceSadTear,
} from "react-icons/fa6";
import { TbMoodAngry } from "react-icons/tb";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PieChart from "components/charts/PieChart";
import PieCard from "views/admin/default/components/PieCard";

export default function Home({ data }) {
  const [emotion, setEmotion] = useState("loading...");
  const [sentiment, setSentiment] = useState("loading...");
  const [emoImage, setEmoImage] = useState(happy);
  const [emoScore, setEmoScore] = useState("loading...");
  const [emoProb, setEmoProb] = useState("loading...");
  const [sentScore, setSentScore] = useState("loading...");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [iconEmo, seticonEmo] = useState(() => BiLoaderCircle);
  const [iconSent, seticonSent] = useState(() => BiLoaderCircle);
  const [text, setText] = useState("loading...");
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColorBrand = useColorModeValue("brand.500", "white");


  useEffect(() => {
    setLoading(true);
    data = data[0];
    if (data) {
      if (data.emotion == "happy") {
        setEmotion("Happy");
        setEmoImage(happy);
        seticonEmo(() => FaRegFaceLaughBeam);
      } else if (data.emotion == "love") {
        setEmotion("Love");
        setEmoImage(love);
        seticonEmo(() => FaRegFaceGrinStars);
      } else if (data.emotion == "sadness") {
        setEmotion("Sadness");
        setEmoImage(sadness);
        seticonEmo(() => FaRegFaceSadTear);
      } else if (data.emotion == "anger") {
        setEmotion("Anger");
        setEmoImage(anger);
        seticonEmo(() => FaRegFaceAngry);
      } else if (data.emotion == "fear") {
        setEmotion("Fear");
        setEmoImage(fear);
        seticonEmo(() => FaRegFaceGrimace);
      }

      if (data.sentiment == "positive") {
        setSentiment("Positive");
        seticonSent(() => BiMessageSquareAdd);
        setSentScore(data.sentiment_score);
      } else {
        setSentiment("Negative");
        seticonSent(() => BiMessageSquareError);
        setSentScore(100 - data.sentiment_score);
      }
      setEmoScore(data.emotion_score);
      setEmoProb(data.emotion_probability);
      setSentiment(data.sentiment);
      setText(data.input);
      setChartData(
        Object.keys(data.emotion_probability).map((key) => ({
          x: key.charAt(0).toUpperCase() + key.slice(1),
          y: Math.round(data.emotion_probability[key] * 100),
          fillColor: getColorByKey(key),
        }))
      );
    }
  }, []);

  setInterval(() => {
    setLoading(false);
  }, 500);

  let barChartDataDailyTraffic = [
    {
      name: "Emotion probability (%) ",
      data: chartData,
    },
  ];
  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "90px" }}>
        {loading ? (
           <Flex
           align={"center"}
           justifyContent="center"
           height="75vh"
         >
           <Spinner
             color={textColorBrand}
             size="xl"
             emptyColor="gray.200"
             speed="1s"
           />
         </Flex>
        ) : (
          <>
            <SimpleGrid
              columns={{ base: 1, md: 3, xl: 3 }}
              gap="20px"
              mb="20px"
            >
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
                        as={BiMessageRoundedDots}
                        color={brandColor}
                        style={{ transform: "scaleX(-1)" }}
                      />
                    }
                  />
                }
                name="Text"
                value={text.charAt(0).toUpperCase() + text.slice(1)}
                fontSize={"md"}
              />
              <MiniStatistics
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={
                      <Icon w="32px" h="32px" as={iconEmo} color={brandColor} />
                    }
                  />
                }
                name="Emotion"
                value={emotion}
                fontSize={"lg"}
              />
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
                        as={iconSent}
                        color={brandColor}
                        style={{ transform: "scaleX(-1)" }}
                      />
                    }
                  />
                }
                name="Sentiment"
                value={sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                fontSize={"lg"}
              />
            </SimpleGrid>
            <SimpleGrid
              columns={{ base: 1, md: 2, xl: 2 }}
              gap="20px"
              mb="20px"
            >
              <DailyTraffic
                emotion={emotion}
                emotion_score={emoScore}
                options={barChartOptionsDailyTraffic}
                chart_data={barChartDataDailyTraffic}
              />
              <PieCard sentiment={sentiment} sentScore={sentScore} />
            </SimpleGrid>
          </>
        )}
      </Box>
    </AdminLayout>
  );
}

const barChartOptionsDailyTraffic = {
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
    categories: ["Anger", "Fear", "Happy", "Love", "Sadness"],
    show: true,
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
    show: true,
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

function getColorByKey(key) {
  // Definisikan warna berdasarkan kunci
  const colorMap = {
    anger: "#DB4437",
    fear: "#F4B400",
    happy: "#4285F4",
    love: "#EE79CF",
    sadness: "#0F9D58",
  };

  return colorMap[key] || "#000"; // Warna default jika tidak ada yang cocok
}

export async function getServerSideProps(context) {
  const currentPath = context.req.url;
  const response = await axios.get(
    `${process.env.SITE_URL}/api/predict/rating/?id=${currentPath}`, {
      headers: {
        "api-key": process.env.API_KEY,
      },
    }
  );
  const data = await response.data;
  return {
    props: {
      data,
    },
  };
}
