import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
    return (
        <Flex alignItems={"center"} justifyContent="center" h="100px" w="100%" borderTop="3px solid #f2e141" bg="#f2f0da" >
            <Text as='em' textAlign={"center"} fontSize="25px" mt="5" fontWeight="600" color="#d4c861" >Made By @Monu Yadav 2023</Text>
        </Flex>
    )
}

export default Footer