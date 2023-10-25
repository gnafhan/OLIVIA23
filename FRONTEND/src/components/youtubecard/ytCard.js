import { Badge, Box, Button, Flex, Text, Image } from "@chakra-ui/react";

export default function YtCard ({ title, channel, date, id, picture }) {
    return(
    <Box maxH={"md"} maxW="xs" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image height={"180px"} width="340px" objectFit="cover" src={picture} alt={picture} maxHeight={"xs"} />
  
        <Box p="4">
          <Text fontSize="lg" fontWeight="semibold" as={"a"} href={`/model/nlp/detail/${id}`} >
            {title}
          </Text>
            <Text fontSize="sm" fontWeight="normal" mb="2">
                {channel}
            </Text>
  
          <Box d="flex" alignItems="baseline" justifyContent="space-between" flexDirection={"column"}>
            <Badge borderRadius="full" px="2" colorScheme="teal">
            {new Date(date).toLocaleDateString()}
            </Badge>
          </Box>
          
        </Box>
      </Box>
    )
}