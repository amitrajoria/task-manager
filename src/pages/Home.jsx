import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import TaskCard from '../component/TaskCard'
import { getSubTasks, getTasks } from '../redux/AppReducer/action'
import store from '../redux/store'

const Home = () => {

  const allTasks = useSelector((store) => store.AppReducer.tasks);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    if(allTasks.length == 0) 
      dispatch(getTasks());
  }, [allTasks.length])


  const filterByTags = (task) => {
    const tagsInParams = searchParams.getAll('tags');
    if(tagsInParams.includes('All') || tagsInParams.length == 0)
      return task;
    else {
      const data = task.tags.filter((tag) => {
        if(tagsInParams.includes(tag))
          return true;
        return false;
      })

      if(data.length)
        return task;
      
        return false;
    }
  }

  return (
    <Box width="100%" padding="10px">
      <Flex gap="4">
        <Flex height="95vh" width="33%" padding="20px" border="1px solid rgba(0,0,0,0.1)" direction="column">
          <Box padding="10px" width="100%" bg={useColorModeValue('yellow.100', 'yellow.900')} alignItems="center" margin="0 auto" fontWeight="bold">
            <Text>Todo</Text>
          </Box>
          {
            allTasks.length > 0 &&
            allTasks
            .filter((task) => task.taskStatus==="todo")
            .filter(filterByTags)
            .map((task, index) => {
              return <TaskCard key={task._id} {...task} />
            })
          }
        </Flex>
        <Flex height="95vh" width="33%" padding="20px" border="1px solid rgba(0,0,0,0.1)" direction="column">
          <Box padding="10px" width="100%" bg={useColorModeValue('green.100', 'green.900')} alignItems="center" margin="0 auto" fontWeight="bold">
            <Text>In Progres</Text>
          </Box>
          {
            allTasks.length > 0 &&
            allTasks
            .filter((task) => task.taskStatus==="in-progres")
            .filter(filterByTags)
            .map((task, index) => {
              return <TaskCard key={task._id} {...task} />
            })
          }
        </Flex>
        <Flex height="95vh" width="33%" padding="20px" border="1px solid rgba(0,0,0,0.1)" direction="column">
          <Box padding="10px" width="100%" bg={useColorModeValue('blue.100', 'blue.900')} alignItems="center" margin="0 auto" fontWeight="bold">
            <Text>Done</Text>
          </Box>
          {
            allTasks.length > 0 &&
            allTasks
            .filter((task) => task.taskStatus==="done")
            .filter(filterByTags)
            .map((task, index) => {
              return <TaskCard key={task._id} {...task} />
            })
          }
        </Flex>
      </Flex>
    </Box>
  )
}

export default Home