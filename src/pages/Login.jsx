import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Center,
  Stack,
  InputGroup,
  InputRightElement,
  Link,
  Button,
  Heading,
  Divider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate, Link as ReactLink } from 'react-router-dom';
import { googleLogin, login } from '../redux/AuthReducer/action';
import { LoginSocialGoogle } from 'reactjs-social-login';


export default function Login() {

  const {isAuth, isLoading, isError, response} = useSelector((store) => 
  ({
    isAuth : store.AuthReducer.isAuth ,
    isLoading : store.AuthReducer.isLoading , 
    isError : store.AuthReducer.isError ,
    response : store.AuthReducer.response
  }));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const nevigate = useNavigate();
console.log(isLoading);
  useEffect(() => {
    // if(response) {
      // alert(response);
      // response = "";
    // }
    if(isAuth && !isError) {
      nevigate('/', {replace : true}); 
    }
  }, [isAuth, isError])


  const loginUser = () => {
    dispatch(login({"email": username, password}))
    .then((res) => {
      if(res?.type == "LOGIN_FAILURE")
        alert(res?.payload);
    });
  }

  const googleLoginSuccess = ({ provider, data }) => {
    const { name, email } = data;
    dispatch(googleLogin({name, email}))
    .then((res) => {
      if(res?.type == "LOGIN_FAILURE") {
        if(res?.payload)
          alert(res?.payload);
        else 
          alert("Something went wrong!!");
      }
    });
  }

  const googleLoginFailure = (err) => {
    alert("Google access denied! Please try again");
    console.log(err);
  } 

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <LoginSocialGoogle
              client_id={
                '8760993662-8go1u9p44htv2o14iqpt3lt5c1tqj91i.apps.googleusercontent.com'
              }
              scope="openid profile email"
              discoveryDocs="claims support"
              access_type='offline'
              onResolve={googleLoginSuccess}
              onReject={googleLoginFailure}
            >
              <Button
                w={'full'}
                maxW={'md'}
                variant={'outline'}
                leftIcon={<FcGoogle />} >
                <Center>
                {/* <ReactLink to={'https://taskmanager-backend.onrender.com/auth/google/callback'}><Text>Sign in with Google</Text></ReactLink> */}
                <Text>Sign in with Google</Text>
                </Center>
              </Button>
            </LoginSocialGoogle>
            <Text>{isLoading && 'Logging In...'}</Text>
            <Divider marginTop="40" />
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'}  value={password} onChange={(e) => setPassword(e.target.value)} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
            </FormControl>
            <Stack>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={loginUser}
                >
                Login
              </Button>
              <Button colorScheme='teal' variant='outline'>
                <ReactLink to={'/signup'}>Sign up</ReactLink>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}