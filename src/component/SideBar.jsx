import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Avatar, Badge, Box, Button, Flex, Text, useColorMode, useColorModeValue, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import CreateTaskModal from '../models/CreateTaskModal';
import { getProfile, getTags, getTasks } from '../redux/AppReducer/action';
import store from '../redux/store';
import * as actions from '../redux/AuthReducer/actionTypes'

const SideBar = () => {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const tags = useSelector((store) => store.AppReducer.tags);
  const allTasks = useSelector((store) => store.AppReducer.tasks); 
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState("");
  const [selectedTags, setSelectedTags] = useState(searchParams.getAll('tags') || []);
  const filterBGColor = useColorModeValue('cyan', 'darkslategrey');
  const filterActiveColor = useColorModeValue('black', 'white');

  useEffect(() => {
    if(tags.length == 0)
      dispatch(getTags());
  }, [tags.length])

  useState(() => {
    dispatch(getProfile())
    .then((res) => setUser(res?.name));
  })
  
  const filterTasksByTag = (tagValue) => {
    let newTags = [...selectedTags];

    if(newTags.includes(tagValue))
      newTags.splice(newTags.indexOf(tagValue), 1);
    else
      newTags.push(tagValue);

    if(tagValue === "All")
        newTags = [];

    setSearchParams({tags : newTags});
    setSelectedTags(newTags);
  }

  const logoutUser = () => {
    localStorage.removeItem('loginToken');
    dispatch({type: actions.LOGOUT_REQUEST});
    window.location.href = '/';
    // nevigate('/login', {replace : true});
  }


  return (
    <Box height="95vh" width="20%" padding="10px">
        <Flex height="inherit" direction="column">

          {/* Profile Section */}

            <Box height="20%" border="1px solid rgba(0,0,0,0.1)" padding="10px">
              <Wrap>
                <Flex>
                  <Avatar name={user}/>
                  <Box ml='3'>
                    <Link to={'/'}>
                      <Text fontWeight='bold'>
                        Task Manager
                      </Text>
                    </Link>
                    <Text fontSize='sm'>{user}</Text>
                  </Box>
                </Flex>
                <Flex direction={'row'} justifyContent={'space-between'}>
                  <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  </Button>
                  <Box>
                    <Link to={'/'}><Text margin="15px 0 0 20px" fontWeight={'bold'}>VIEW PROFILE</Text></Link>
                  </Box>
                </Flex>
              </Wrap>
            </Box>

          {/* Profile Section End */}

          {/* Filters */}

            <Box height="60%" border="1px solid rgba(0,0,0,0.1)" padding="10px">
              <Box padding="4px 10px" 
                bg={useColorModeValue('green.100', 'green.900')}
                margin="2px 2px 8px 2px" 
                cursor="pointer"
                borderRadius="4px"
                justifyContent="space-between"
                onClick={onOpen}>CREATE NEW TASK</Box>
              <Flex direction="column" textAlign="left">
                <Flex padding="4px 10px" margin="2px" 
                      cursor="pointer"
                      borderRadius="4px"
                      justifyContent="space-between"
                      boxShadow="rgb(99 99 99 / 15%) 0px 2px 3px 0px"
                      onClick={() => filterTasksByTag('All')}
                      bg={useColorModeValue('teal.100', 'teal.900')} >
                  <Text>All</Text>
                  <Text marginLeft={`5px`} fontWeight="bold">{allTasks.length}</Text> 
                  <CreateTaskModal isOpen={isOpen} onClose={onClose}/> 
                </Flex>
                {
                  tags.length > 0 &&
                  tags.map((tag, index) => {
                    return (
                      <Flex key={tag._id} padding="4px 10px" background="teal.100" margin="2px" 
                            cursor="pointer"
                            borderRadius="4px"
                            justifyContent="space-between"
                            boxShadow="rgb(99 99 99 / 15%) 0px 2px 3px 0px"
                            onClick={() => filterTasksByTag(tag.tag)}
                            bg={`${filterBGColor}`} >
                        <Text>{tag.tag} {(selectedTags.includes(tag.tag)) ? <span className='active-filter' style={{background : `${filterActiveColor}`}}></span> : ""}
                        </Text>
                        <Text marginLeft={`5px`} fontWeight="bold">
                          {
                            allTasks.length > 0 && 
                            allTasks.filter((task) => task.tags.includes(tag.tag)).length
                          }
                        </Text>
                      </Flex>
                    )
                  })
                }
              </Flex>
            </Box>

          {/* Filters End */}
          
          {/* Logout footer */}

            <Box height="20%" border="1px solid rgba(0,0,0,0.1)" padding="10px">
              <Box padding="5px 10px" 
                  bg={useColorModeValue('teal.100', 'teal.900')} 
                  margin="auto" 
                  cursor="pointer"
                  borderRadius="4px"
                  fontWeight="bold"
                  justifyContent="space-between"
                  onClick={logoutUser}  >LOG OUT
              </Box>
            </Box>

          {/* Logout Footer */}

        </Flex>
    </Box>
  )
}

export default SideBar