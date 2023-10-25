/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  Icon,
  Link,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
  TableData,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { isWindowAvailable } from "utils/navigation";
import AdminLayout from "layouts/admin";
import { Image } from "components/image/Image";
import Usa from "img/dashboards/usa.png";
import Banner from "views/admin/marketplace/components/Banner";
import NextLink from "next/link";
import NFT from "components/card/NFT";
import { Nft1 } from "img/nfts/Nft1.png";
import Comment from "img/model/rating/comment.png";
import Card from "components/card/Card";
import { TableTopCreators } from "views/admin/marketplace/components/TableTopCreators";
import {
  BiColumns,
  BiComment,
  BiCrosshair,
  BiData,
  BiMessageRoundedDots,
} from "react-icons/bi";
import { HSeparator } from "components/separator/Separator";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import { useEffect, useState } from "react";
import axios from "axios";
import Nft3 from "img/nfts/Nft3.png";
import Nft2 from "img/nfts/Nft2.png";
import anger from "img/avatars/4.png";
import fear from "img/avatars/5.png";
import happy from "img/avatars/2.png";
import love from "img/avatars/3.png";
import sadness from "img/avatars/6.png";

export default function UserReports() {
  // Chakra Color Mode
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  useEffect(() => {
    axios.post("/api/predict/nlp/", {
      history: true,
    }).then((res) => {
      setData(res.data.reverse());
      setLoading(false);
    });
  }, []);
  console.log(data);
  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Grid
          mb="20px"
          gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
          gap={{ base: "20px", xl: "20px" }}
          display={{ base: "block", xl: "grid" }}
        >
          <Flex
            flexDirection="column"
            gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
          >
            <Banner />
            <Flex direction="column">
              <Flex
                mt="45px"
                mb="20px"
                justifyContent="space-between"
                direction={{ base: "column", md: "row" }}
                align={{ base: "start", md: "center" }}
              >
                <Text
                  color={textColor}
                  fontSize="2xl"
                  ms="24px"
                  fontWeight="700"
                >
                  Models
                </Text>
                <Flex
                  align="center"
                  me="20px"
                  ms={{ base: "24px", md: "0px" }}
                  mt={{ base: "20px", md: "0px" }}
                >
                  <NextLink href="/model" passHref>
                    <Link color={textColorBrand} fontWeight="500">
                      See all
                    </Link>
                  </NextLink>
                </Flex>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                <NFT
                  name="NLP Youtube Public Sentiment"
                  author="Predicting public sentiment on Youtube comments"
                  bidders={[]}
                  image={Comment}
                  currentbid="Up to 85% Accuracy"
                  download="/model/nlp/"
                />
                <NFT
                  name="Model 2"
                  author="Coming soon"
                  bidders={[]}
                  image={Nft3}
                  currentbid="Coming soon"
                  download="#"
                />
                <NFT
                  name="Model 3"
                  author="Coming soon"
                  bidders={[]}
                  image={Nft2}
                  currentbid="Coming soon"
                  download="#"
                />
              </SimpleGrid>
            </Flex>
          </Flex>
          <Flex
            flexDirection="column"
            gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
          >
            <Card px="0px" mb="20px" gap={"3"}>
              <Flex
                align={{ sm: "flex-start", lg: "center" }}
                justify="space-between"
                w="100%"
                px="22px"
                pb="20px"
                mb="10px"
              >
                <Text color={textColor} fontSize="xl" fontWeight="600">
                  Statistics
                </Text>
              </Flex>
              {loading ? (<>
                <Flex
                    align={"center"}
                    justifyContent="center"
                    width={"50vh"}
                    height="50vh"
                  >
                    <Spinner
                      color={textColorBrand}
                      size="xl"
                      emptyColor="gray.200"
                      speed="1s"
                    />
                  </Flex>
              </>): (<>
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
                        as={BiData}
                        color={brandColor}
                        style={{ transform: "scaleX(-1)" }}
                      />
                    }
                  />
                }
                name="Models"
                value="1"
                fontSize={"md"}
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
                        as={BiComment}
                        color={brandColor}
                        style={{ transform: "scaleX(-1)" }}
                      />
                    }
                  />
                }
                name="Predictions"
                value={data ? data.length : "~"}
                fontSize={"md"}
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
                        as={BiCrosshair}
                        color={brandColor}
                        style={{ transform: "scaleX(-1)" }}
                      />
                    }
                  />
                }
                name="Accuracy"
                value="85%"
                fontSize={"md"}
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
                        as={BiColumns}
                        color={brandColor}
                        style={{ transform: "scaleX(-1)" }}
                      />
                    }
                  />
                }
                name="Data Training"
                value="5000+"
                fontSize={"md"}
              />
              </>)}

            </Card>
            <Card p="0px">
              <Flex
                align={{ sm: "flex-start", lg: "center" }}
                justify="space-between"
                w="100%"
                px="22px"
                py="18px"
              >
                <Text color={textColor} fontSize="xl" fontWeight="600">
                  History
                </Text>
                <Button as={'a'} href="/history" variant="action">See all</Button>
              </Flex>
              {loading ? (
                <>
                  <Flex
                    align={"center"}
                    justifyContent="center"
                    width={"50vh"}
                    height="50vh"
                  >
                    <Spinner
                      color={textColorBrand}
                      size="xl"
                      emptyColor="gray.200"
                      speed="1s"
                    />
                  </Flex>
                </>
              ) : (
                <>
                  {data.slice(0, 3).map((item, index) => {
                    return (
                      <HistoryItem
                      key={index}
                      id={`/model/nlp/detail/${item.id}`}
                      name={`${item.title}`.charAt(0).toUpperCase() +`${item.title}`.slice(1)}
                      author={item.completedAt}
                      date={`${item.status}`.charAt(0).toUpperCase() +`${item.status}`.slice(1)}
                      image={item.thumbnail}
                      home={true}
                      />
                    );
                  })}
                </>
              )}
            </Card>
          </Flex>
        </Grid>
      </Box>
    </AdminLayout>
  );
}
