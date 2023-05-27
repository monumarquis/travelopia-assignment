import { Button, Flex, Input, FormControl, FormLabel, Container, Text, useToast, Divider, Select, InputGroup, InputLeftElement } from '@chakra-ui/react'
import axios from 'axios';
import { useFormik } from 'formik';
import { FormikHelpers, FormikProps } from 'formik/dist/types';
import { FC, useState, FormEvent, useEffect } from 'react'
import { UserTravelInitState } from '../types/user';
import { uservalidationSchema } from '../controller/FormValdation';
import { AiFillExclamationCircle } from "react-icons/ai"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CgDollar } from "react-icons/cg"
const initState: UserTravelInitState = {
    name: "",
    email: "",
    destination: "",
    budgetOfPerson: "",
};

const Form: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [Travellertouch, setTravellertouch] = useState<boolean>(false);
    const [travellers, setTravellers] = useState<string | number>(1);
    const toast = useToast()

    useEffect(() => {
        AOS.init();
    }, [])

    const handlePostTravellers = async (values: UserTravelInitState, { resetForm }: FormikHelpers<UserTravelInitState>): Promise<any> => {
        console.log(formik.values);
        setLoading(true)
        try {
            console.log({ ...values, travellers })
            let { data } = await axios.post("https://travel-back-8w0c.onrender.com/user", { ...values, travellers })
            toast({
                title: data.message,
                description: "We've Added your Details for you.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            setLoading(false)
            formik.setValues(initState);
            resetForm();
        } catch {
            toast({
                title: 'Something went wrong',
                description: "Something went wrong",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            setLoading(false);
        }
    }

    const formik: FormikProps<UserTravelInitState> = useFormik<UserTravelInitState>({
        initialValues: initState,
        validationSchema: uservalidationSchema,
        onSubmit: handlePostTravellers
    });

    const handletravellers = (e: FormEvent<HTMLInputElement>) => {
        setTravellers(Number((e.target as HTMLInputElement).value))
    }



    return (
        <section>
            <Flex flexDirection="column" w="80%" m="auto" justifyContent={"right"} mt="80px"  >
                <Text data-aos="flip-right" textAlign={"center"} fontSize="25px" mt="5" fontWeight="600" color="#000" >Plan Your Dream Vacation</Text>
                <Text as='em' data-aos="flip-right" textAlign={"center"} fontSize="20px" fontWeight="500" mb="30px" color="#858482" >Tell us your travel preferences and let us create an unforgettable experience for you</Text>
                {/* <Divider orientation='horizontal' borderColor={'#000'} borderWidth="1px" w="95%" m="auto" mb="5" /> */}
                {/* <Flex flexDirection="row" alignItems={"center"} p="2" bg="#f4f5d7" border="1px solid #ecf229 " w="90%" m="auto" mb="30px"  >
                    <AiFillExclamationCircle color='#b1b52d' fontSize={"25"} />
                    <Text fontSize="18" ml="5" >All Input Feilds are Mandotary</Text>
                </Flex> */}
                <form onSubmit={formik.handleSubmit} style={{ width: "100%", margin: "auto", boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset", marginBottom: "50px", borderRadius: "10px" }} >
                    <Container
                        maxW="90%"
                        centerContent
                    >
                        <FormControl py="10" >
                            <Flex flexDirection={["column","column","column","row","row"]} justifyContent={"space-between"} w="100%"  >
                                <Flex flexDirection="column" w={["100%","100%","100%","48%","48%"]} >
                                    <FormLabel fontWeight="700" mb="1" mt="5" data-aos="flip-right" data-aos-delay="300" >
                                        Name
                                    </FormLabel>
                                    <Input
                                        name='name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values?.name.toString()}
                                        placeholder="Enter Your Name"
                                        variant="outline"
                                        isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                                        onBlur={formik.handleBlur}
                                        pl="3"
                                        bg="#f0eedd"
                                    />
                                    {formik.touched.name && formik.errors.name && <Text color="red.400" fontSize={"15px"} >{formik.errors.name}</Text>}
                                </Flex>
                                <Flex flexDirection="column"  w={["100%","100%","100%","48%","48%"]} >
                                    <FormLabel fontWeight="700" mb="1" mt="5" data-aos="flip-right" data-aos-delay="300">
                                        Email Address
                                    </FormLabel>
                                    <Input
                                        name='email'
                                        type='email'
                                        onChange={formik.handleChange}
                                        value={formik.values?.email.toString()}
                                        placeholder="Enter Your Email address"
                                        variant="outline"
                                        isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                                        onBlur={formik.handleBlur}
                                        pl="3"
                                        bg="#f0eedd"
                                    />
                                    {formik.touched.email && formik.errors.email && <Text color="red.400" fontSize={"15px"} >{formik.errors.email}.</Text>}
                                </Flex>
                            </Flex>
                            <Flex flexDirection={["column","column","column","row","row"]} mt="5px" w="100%" justifyContent={"space-between"}>
                                <Flex flexDirection="column"w={["100%","100%","100%","48%","48%"]}>
                                    <FormLabel fontWeight="700" mb="1" mt="5" data-aos="flip-right" data-aos-delay="300">
                                        Where do you want to go?
                                    </FormLabel>
                                    <Select bg="#f0eedd" name="destination" variant="outline" placeholder='Select Destination' value={formik.values?.destination.toString()} onBlur={formik.handleBlur} onChange={formik.handleChange} >
                                        <option value="India" >India</option>
                                        <option value="Africa" >Africa</option>
                                        <option value="Europe" >Europe</option>
                                    </Select>
                                    {formik.touched.destination && formik.errors.destination && <Text color="red.400" fontSize={"15px"} >{formik.errors.destination}.</Text>}
                                </Flex>
                                <Flex flexDirection="column"w={["100%","100%","100%","48%","48%"]}>
                                    <FormLabel fontWeight="700" mb="1" mt="5" data-aos="flip-right" data-aos-delay="300">
                                        Budget per Person
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <CgDollar color='gray.300' />
                                        </InputLeftElement>
                                        <Input
                                            name='budgetOfPerson'
                                            type='number'
                                            onChange={formik.handleChange}
                                            value={formik.values?.budgetOfPerson.toString()}
                                            placeholder="Enter Your budget per Person "
                                            variant="outline"
                                            isInvalid={formik.touched.budgetOfPerson && Boolean(formik.errors.budgetOfPerson)}
                                            onBlur={formik.handleBlur}
                                            pl="30px"
                                            bg="#f0eedd"
                                        />
                                    </InputGroup>
                                    {formik.touched.budgetOfPerson && formik.errors.budgetOfPerson && <Text color="red.400" fontSize={"15px"} >{formik.errors.budgetOfPerson}.</Text>}
                                </Flex>
                            </Flex>
                            <Flex flexDirection="column" mt="5px" w="100%">
                                <FormLabel fontWeight="700" mb="1" mt="5" data-aos="flip-right" data-aos-delay="300">
                                    Number of Travellers  <span>: {travellers}</span>
                                </FormLabel>
                                <input
                                    type='range'

                                    onChange={handletravellers}
                                    onMouseEnter={() => setTravellertouch(true)}
                                    value={travellers.toString()} />
                                {Travellertouch && travellers === 0 && <Text color="red.400" fontSize={"15px"} >Atleast One Travellers is required.</Text>}
                            </Flex>
                            <Flex flexDir="row" justifyContent="space-between" mt="40px" mb="2" >
                                <Flex bg="#a6a6a6" color="#000" border="1px solid #000" boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px' borderRadius="10px" minW="25%" alignItems="center" justifyContent="center" >
                                    <Text fontSize="20px" fontWeight="500" color="#000" >Net Budget : ${formik.values.budgetOfPerson !== "" ? Number(formik.values?.budgetOfPerson) * Number(travellers) : 0}</Text>
                                </Flex>
                                <Button bg="#ffe01b" color="#000" border="1px solid #000" borderRadius="99px" boxShadow={"transparent"} _hover={{ bg: "#e2e8f0", transform: "translateY(-10px)", boxShadow: "0px 8px 0px #000", }} w="25%" type="submit" isLoading={loading} loadingText="Submitting details" >
                                    Submit
                                </Button>
                            </Flex>

                        </FormControl>
                    </Container>
                </form>
            </Flex>
        </section>

    )
}

export default Form