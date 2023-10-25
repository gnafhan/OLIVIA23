/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Center, Flex, Spinner, Text, useColorModeValue} from "@chakra-ui/react";
import AdminLayout from "layouts/admin";
import  Card  from 'components/card/Card';
import HistoryItem  from 'views/admin/marketplace/components/HistoryItem';
import  Nft5  from 'img/nfts/Nft5.png';
import anger from "img/avatars/4.png";
import fear from "img/avatars/5.png";
import happy from "img/avatars/2.png";
import love from "img/avatars/3.png";
import sadness from "img/avatars/6.png";
import axios from "axios";
import { useEffect, useState } from 'react';

export default function Home ({data}){
  const [data_, setData_] = useState(data);
  const [loading, setLoading] = useState(true);
  const textColorBrand = useColorModeValue('brand.500', 'white')
  useEffect(() => {
    setData_(data.reverse());
  }, []);

  setTimeout(() => {
    setLoading(false)
  }, 300);
    return (
        <>
        <AdminLayout>
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Box>
            <Card p='0px'>
              <Flex
                align={{ sm: 'flex-start', lg: 'center' }}
                justify='space-between'
                w='100%'
                px='22px'
                py='18px'
              >
                <Text color={"blue"} fontSize='xl' fontWeight='600'>
                  History
                </Text>
              </Flex>
              {loading ? (<>
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
              </>
              ): (<>
                            {data_.map((item, index) => {
                return (
                <HistoryItem
                  key={index}
                  id={`/model/nlp/detail/${item.id}`}
                  name={`${item.title}`.charAt(0).toUpperCase() +`${item.title}`.slice(1)}
                  author={item.completedAt}
                  date={`${item.status}`.charAt(0).toUpperCase() +`${item.status}`.slice(1)}
                  image={item.thumbnail}
                  // price={`${item.emotion_score}%`}
                />
              )})}
              </>)}

              
            </Card>
            </Box>
        </Box>
        </AdminLayout>
        </>
    )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const response = await axios.post(`${process.env.SITE_URL}/api/predict/nlp/`,{
    "history": true
  });
  const data = await response.data;
  return {
  props: {
      data,
  },
  };
}