import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/AuthReducer/action';

export default function Login() {

  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  useEffect(() => {
    if(isAuth) {
      nevigate('/', {replace : true}); 
    }
  })
  

  const loginUser = () => {
    dispatch(login({"email": username, password}))
    .then(() => {
      nevigate('/', {replace : true});  
    })
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
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Box fontWeight={'bold'}>Try login with these Details</Box>
              <Stack spacing={1}>
                <Text>Email : eve.holt@reqres.in</Text>
                <Text>Password : cityslicka</Text>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={loginUser}
                >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}