import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Badge, Box, Checkbox, CheckboxGroup, Flex, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteTask, getSubTasks, updateSubTaskStatus } from '../redux/AppReducer/action';


const TaskCard = ({_id, title, description, taskStatus, tags}) => {

    const dispatch = useDispatch();
    const [subTasks, setSubTasks] = useState([]);
    const [selectedSubTasks, setSelectedSubTasks] = useState([]);


    async function fetchData() {
      setSubTasks(await dispatch(getSubTasks(_id)));
    }
  
    useEffect(() => {
       fetchData();
     }, [])
    
    
    useEffect(() => {
        let subTaskStatus = [];
        subTasks && subTasks.forEach((task) => {
            if(task.status) 
                subTaskStatus.push(task.title);
        })
        setSelectedSubTasks(subTaskStatus);

    }, [subTasks])

    const deleteCurrentTask = () => {
        dispatch(deleteTask(_id));
    }

    const updateTaskStatus = (e, subTaskId) => {
        let currValue = e.target.checked; 
        const payload = {
          status : currValue
        }
        dispatch(updateSubTaskStatus(_id, subTaskId, payload))
        .then((res) => setSubTasks(res))
    }

  return (
    <Box margin="20px 0px 0" padding="10px" textAlign={'left'} boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px">
        <Flex justifyContent="space-between">
            <Text>{title}</Text>
            <Flex>
                <Link to={`edit/${_id}`}>
                    <EditIcon margin="-12px 8px 0 0"/>
                </Link>
                <DeleteIcon cursor={'pointer'} onClick={deleteCurrentTask}/>
            </Flex>
        </Flex>
        <Box>
            <Stack direction='row'>
                {
                    tags.map((tag, index) => {
                        return <Badge key={index} colorScheme='green'>{tag}</Badge>
                    })
                }
            </Stack>
        </Box>
        <Text margin="5px 0">{description}</Text>
        <Box>
            <CheckboxGroup colorScheme='blue' value={selectedSubTasks}>
                <Stack spacing={[1, 2]} direction={['column']}>
                    {
                        subTasks.length > 0 && 
                        subTasks.map((subTask) => {
                            return <Checkbox key={subTask._id} value={`${subTask.title}`} onChange={(e) => updateTaskStatus(e, subTask._id)}>{subTask.title}</Checkbox>
                        })
                    }
                    
                </Stack>
            </CheckboxGroup>
        </Box>
    </Box>
  )
}

export default TaskCard