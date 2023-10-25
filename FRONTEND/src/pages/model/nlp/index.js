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
  SimpleGrid,
  Badge,
  Image
} from '@chakra-ui/react'
// Assets
// Custom components
import AdminLayout from 'layouts/admin'
import Card from 'components/card/Card'
import { useEffect, useState } from 'react'
import think from 'img/avatars/1.png'
import happy from 'img/avatars/2.png'
import love from 'img/avatars/3.png'
import angry from 'img/avatars/4.png'
import fear from 'img/avatars/5.png'
import sad from 'img/avatars/6.png'
// import Image from 'next/image'
import { Modal } from 'react-bootstrap'
import NFT from 'components/card/NFT'
import  Comment  from 'img/model/rating/comment.png';
import YtCard from 'components/youtubecard/ytCard'
import { dummy } from 'pages/api/predict/nlp/default'

export default function UserReports () {
  // Chakra Color Mode
  const [data, setData] = useState(null)
  const [keyword, setKeyword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [emotion, setEmotion] = useState(think)
  const [id, setId] = useState(null)
  const brandColor = useColorModeValue('brand.500', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')

  const handleInput = e => {
    setKeyword(e.target.value)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/predict/nlp/', {
        method: 'POST',
        body: JSON.stringify({ keyword: keyword }),
        headers: {
          'Content-Type': 'application/json',
          'api-key': '89!Vqi%kS=F!gu~/|,[E.hR7da4[k'
        }
      })
      const data = await response.json()
      setData(data)
      setShow(true)
      setId(data._id)
      console.log(data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
  const handleShpw = () => {
    setShow(!show)
  }
  return (
    <>
      <AdminLayout>
        <Box pt={{ base: '130px', md: '80px', xl: '90px' }}>
          <Card minH={'80vh'}>
            <Flex justifyContent='center' mb='8'>
              <Center>
                <Input
                  width={{ base: '', md: 'md' }}
                  placeholder='Enter keyword here'
                  borderRadius={'full'}
                  onChange={handleInput}
                ></Input>
                <Button
                  variant={'brand'}
                  ml={{ base: '5px', md: '10px' }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Center>
            </Flex>
            <Flex
              flexWrap='wrap'
              justifyContent='space-evenly'
              alignContent={'space-evenly'}
              gap="4"
            >
              {loading ? (<>
                <Flex
                  justifyContent='center'
                  alignContent={'center'}
                  >
                  <Flex
                    align={'center'}
                    justifyContent='center'
                    width={'50vh'}
                    height='50vh'
                  >
                    <Spinner
                      color={useColorModeValue('#422AFB', '#B9A2FF')}
                      size='xl'
                      emptyColor='gray.200'
                      speed='1s'
                    />
                  </Flex>
                  </Flex>
              </>):(<>
              {data? (<>
              {data.map((item, index) => (
                <YtCard picture={item.hdThumbnail} key={index} title={item.title} channel={item.channelTitle} date={item.publishedAt} id={item.id}/>
              ))}
              </>):(<>
              {dummy.map((item, index) => (
                <YtCard picture={item.hdThumbnail} key={index} title={item.title} channel={item.channelTitle} date={item.publishedAt} id={item.id}/>
              ))}
              </>)}
              </>)}
              
            </Flex>
          </Card>
        </Box>
      </AdminLayout>
    </>
  )
}
