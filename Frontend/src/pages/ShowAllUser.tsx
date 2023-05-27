import { Button, Divider, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { getAllUserProfile } from '../redux/AllUser/alluser.actions'
import { UserState, useAppDispatch, useAppSelector } from '../types/user'
import LoadingSpinner from '../components/LoadingSpinner'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { CSVLink } from 'react-csv';

const ShowAllUser: FC = () => {
    const { data, loading, totalPages } = useAppSelector((state) => state.allUser)
    const dispatch = useAppDispatch()
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        dispatch(getAllUserProfile(`https://travel-back-8w0c.onrender.com/user?page=${page}&limit=5`))
    }, [page, dispatch])

    useEffect(() => {
        AOS.init();
    }, [])

    if (loading) {
        return (
            <LoadingSpinner Sectionheight={"50px"} loaderWidth={"50px"} loaderHeight={"50px"} />
        )
    }
    return (
        <section>
            <Flex flexDirection="column" w="80%" m="auto" justifyContent={"right"} mt="80px" pb="70px">
                <Text data-aos="flip-right" textAlign={"center"} fontSize="25px" mt="5" fontWeight="600" color="#000" >Plan Your Dream Vacation</Text>
                <Text as='em' data-aos="flip-right" textAlign={"center"} fontSize="20px" fontWeight="500" mb="30px" color="#858482" >Tell us your travel preferences and let us create an unforgettable experience for you</Text>
                <Flex flexDirection="row" mt="20px" justifyContent={"space-between"} alignItems="center" >
                    <Text as='em' data-aos="flip-right" textAlign={"center"} fontSize="25" mt="5" mb="2" >Page {page} of {totalPages}</Text>
                    <Button bg="#ffe01b" color="#000" border="1px solid #000" borderRadius="99px" boxShadow={"transparent"} _hover={{ bg: "#e2e8f0", transform: "translateY(-10px)", boxShadow: "0px 8px 0px #000", }} w="15%"  >
                        <CSVLink data={data || []} filename="users.csv">
                            Download CSV
                        </CSVLink>
                    </Button>
                </Flex>
                <Divider orientation='horizontal' borderColor={'#000'} borderWidth="1px" w="95%" m="auto" mb="5" />
                <TableContainer data-aos="fade-zoom-in"
                    data-aos-delay="300"
                    data-aos-offset="100" background={"rgba(217, 216, 214, 0.05)"} borderRadius="5px" border="1px solid rgba(0, 0, 0, 0.25)">
                    <Table variant='simple'>
                        <Thead border={" 1px solid rgba(0, 0, 0, 0.25)"} bg="rgba(0, 0, 0, 0.1)">
                            <Tr border={" 1px solid rgba(0, 0, 0, 0.25)"}>
                                <Th borderBottom={" 1px solid rgba(0, 0, 0, 0.25)"}>Name</Th>
                                <Th borderBottom={" 1px solid rgba(0, 0, 0, 0.25)"}>Email</Th>
                                <Th borderBottom={" 1px solid rgba(0, 0, 0, 0.25)"}>Destination</Th>
                                <Th borderBottom={" 1px solid rgba(0, 0, 0, 0.25)"}>Number Of Travellers</Th>
                                <Th borderBottom={" 1px solid rgba(0, 0, 0, 0.25)"}>Budget (Per Person)</Th>
                                <Th borderBottom={" 1px solid rgba(0, 0, 0, 0.25)"}>Net Budget</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data && data.length > 0 && data.map((el: UserState) => {
                                return (<Tr key={el._id} bg="rgba(217, 216, 214, 0.05)" borderRadius={"5px"} _hover={{ bg: "#f2f0f0" }} >
                                    <Td color="#111822" borderBottom={" 1px solid rgba(0, 0, 0, 0.25)"} >{el.name}</Td>
                                    <Td color="#111822" borderBottom={" 1px solid rgba(0, 0, 0, 0.25)"} >{el.email}</Td>
                                    <Td color="#111822" borderBottom={" 1px solid rgba(0, 0, 0, 0.25)"}>{el.destination}</Td>
                                    <Td color="#111822" borderBottom={" 1px solid rgba(0, 0, 0, 0.25)"}>{el.travellers}</Td>
                                    <Td color="#111822" borderBottom={" 1px solid rgba(0, 0, 0, 0.25)"}>$ {el.budgetOfPerson}</Td>
                                    <Td color="#111822" borderBottom={" 1px solid rgba(0, 0, 0, 0.25)"}>$ {Number(el.budgetOfPerson) * Number(el.travellers)}</Td>
                                </Tr>)
                            })}

                        </Tbody>

                    </Table>
                </TableContainer>
                <Flex flexDir={"row"} m="auto" mt="20px" data-aos="flip-right" >
                    <Button bg="#e7d10c"  boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" onClick={() => setPage((prev) => prev - 1)} isDisabled={Boolean(page === 1)} >Prev</Button>
                    <Button bg="#e7d10c" ml="5px" boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" >{page}</Button>
                    <Button bg="#e7d10c" ml="5px" boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" onClick={() => setPage((prev) => prev + 1)} isDisabled={Boolean(page === totalPages)}  >Next</Button>
                </Flex>
            </Flex>
        </section >

    )
}

export default ShowAllUser