import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  InputGroup,
  InputRightElement,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as ReactLink } from 'react-router-dom';
import { login } from '../redux/AuthReducer/action';

export default function Login() {

  const {isAuth, isError, response} = useSelector((store) => 
  ({
    isAuth : store.AuthReducer.isAuth , 
    isError : store.AuthReducer.isError ,
    response : store.AuthReducer.response
  }));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const nevigate = useNavigate();

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
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              {/* <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
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