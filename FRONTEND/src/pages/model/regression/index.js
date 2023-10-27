import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  Text,
  Flex,
  Skeleton,
  Container
} from "@chakra-ui/react";
import AdminLayout from "layouts/admin";
import Card from "components/card/Card";
import { useState } from "react";

export default function Regression() {
    const color = useColorModeValue("black", "white");
    const [predict, setPredict] = useState("0 Ton");
    const [luasPanen, setLuasPanen] = useState(0);
    const [luasSawah, setLuasSawah] = useState(0);
    const [suhu, setSuhu] = useState(0);
    const [curahHujan, setCurahHujan] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/predict/regression/", {
                method: "POST",
                body: JSON.stringify({
                    "luas_panen": luasPanen,
                    "luas_sawah": luasSawah,
                    "suhu": suhu,
                    "curah_hujan": curahHujan
                }),
                headers: {
                    "Content-Type": "application/json",
                    "api-key": "89!Vqi%kS=F!gu~/|,[E.hR7da4[k",
                },
            });
            const data = await response.json();
            setPredict(`${data.prediction.toLocaleString('id-ID')} Ton`);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "90px" }}>
        <Card minH={"75vh"}>
          <Flex justifyContent={"center"} alignItems="center" marginBottom={"30px"}>
            <Text fontWeight={"bold"} >Prediksi hasil Produksi Panen (Ton)</Text>
          </Flex>
          <Skeleton  marginBottom={"10px"} width="30vh" mx={{base: "0px", md:"100px"}} isLoaded={!loading}>
            <Text fontWeight="semibold" >
              Hasil Prediksi : {predict}</Text>
          </Skeleton>
          <FormControl id="first-name" isRequired px={{base: "0px", md:"100px"}} >
            <FormLabel>Luas Panen (Hektar)</FormLabel>
            <NumberInput onChange={(e)=> setLuasPanen(e) } max={1000000000} min={0}>
              <NumberInputField placeholder="Luas Panen (Hektar)" color={color} borderRadius="16px" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormLabel>Luas Sawah (Hektar)</FormLabel>
            <NumberInput onChange={(e)=> setLuasSawah(e) } max={1000000000} min={0}>
              <NumberInputField placeholder="Luas Sawah (Hektar)" color={color} borderRadius="16px" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormLabel>Suhu (C)</FormLabel>
            <NumberInput onChange={(e)=> setSuhu(e) } max={40} min={20}>
              <NumberInputField placeholder="Suhu (C)" color={color} borderRadius="16px" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormLabel>Curah Hujan (mm)</FormLabel>
            <NumberInput onChange={(e)=> setCurahHujan(e) } max={5000} min={500} >
              <NumberInputField placeholder="Curah Hujan (mm)" color={color} borderRadius="16px" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Flex flexDirection={"row"} justifyContent="center" alignContent={"center"}>
            <Button px="50px" display="flex" onClick={handleSubmit} mt={4} type="submit" color="white" colorScheme={"brand"}>
              Submit
            </Button>
            </Flex>
          </FormControl>
        </Card>
      </Box>
    </AdminLayout>
  );
}
