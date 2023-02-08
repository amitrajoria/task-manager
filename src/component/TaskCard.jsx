import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Badge, Box, Checkbox, CheckboxGroup, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteTask, updateSubTaskStatus } from '../redux/AppReducer/action';

const TaskCard = ({id, title, description, task_status, tags, subTasks}) => {

    const dispatch = useDispatch();

    const deleteCurrentTask = () => {
        dispatch(deleteTask(id));
    }

    const todoSubTaskList = () => {
        if(subTasks.length == 0)
            return "";
        let subTaskValue = [];
        subTasks.forEach((task) => {
            if(task.status) 
                subTaskValue.push(task.subTaskTitle);
        })
        
        return subTaskValue;
    }

    const updateTaskStatus = (e) => {
        let currValue = e.target.value;
        subTasks.map((subTask) => (subTask.subTaskTitle === currValue) ? subTask.status = !subTask.status : "");
        dispatch(updateSubTaskStatus(id, {"subTasks": subTasks}));
    }

  return (
    <Box margin="20px 0px 0" padding="10px" textAlign={'left'} boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px">
        <Flex justifyContent="space-between">
            <Text>{title}</Text>
            <Flex>
                <Link to={`edit/${id}`}>
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
            <CheckboxGroup colorScheme='blue' defaultValue={todoSubTaskList()}>
                <Stack spacing={[1, 2]} direction={['column']}>
                    {
                        subTasks.length > 0 && 
                        subTasks.map((subTask, index) => {
                            return <Checkbox key={index} value={`${subTask.subTaskTitle}`} onChange={updateTaskStatus}>{subTask.subTaskTitle}</Checkbox>
                        })
                    }
                    
                </Stack>
            </CheckboxGroup>
        </Box>
    </Box>
  )
}

export default TaskCard