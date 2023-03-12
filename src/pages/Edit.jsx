import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Checkbox, CheckboxGroup, Flex, FormControl, Heading, Input, Radio, RadioGroup, Stack, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addTag, createSubTask, deleteSubTask, getSubTasks, getTags, getTasks, updateSubTaskStatus, updateTask } from '../redux/AppReducer/action';
import store from '../redux/store';

const Edit = () => {

  const {id} = useParams();
  const allTasks = useSelector((store) => store.AppReducer.tasks);
  const tags = useSelector((store) => store.AppReducer.tags);
  const {isSubTaskLoading, isSubTaskError, response} = useSelector((store) => (
    {
      isSubTaskLoading : store.subTaskReducer.isSubTaskLoading,
      isSubTaskError : store.subTaskReducer.isSubTaskError,
      response : store.subTaskReducer.response
    }
  ));
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskTags, setTaskTags] = useState([]);
  // const [subTasks, setSubTasks] = useState([]);
  const [selectedSubTasks, setSelectedSubTasks] = useState([]);
  const [newSubTask, setNewSubTask] = useState("");
  const [newTag, setNewTag] = useState("");
  const [subTasks, setSubTasks] = useState([]);

  async function fetchData() {
    setSubTasks(await dispatch(getSubTasks(id)));
  }

  useEffect(() => {
     fetchData();
   }, [])

  useEffect(() => {
    if(subTasks.length == 0)
        dispatch(getSubTasks(id));    
  }, [subTasks.length])

  useEffect(() => {
    if(subTasks) {
      const temp = subTasks
                  .filter((subTask) => subTask.status && subTask.title)
                   .map((item) => item.title);
      setSelectedSubTasks(temp);
    } 
  }, [subTasks])


  useEffect(() => {
    if(response && isSubTaskError) 
      alert(response);
  }, [response, isSubTaskError])

  const addNewTag = (e) => {
    e.preventDefault();
    const payload = {
      tag : newTag
    };
    dispatch(addTag(payload))
    .then(setNewTag(""));
  }

  const deleteCurSubTask = (subTaskId) => {
    dispatch(deleteSubTask(id, subTaskId))
    .then((res) => setSubTasks(res))
  }

  const addSubTask = (e) => {
    e.preventDefault();
    const payload = {
      title : newSubTask, 
      status : false
    };
    
    dispatch(createSubTask(id, payload))
    .then(setNewSubTask(""))
    .then((res) => setSubTasks(res))
  }

  const updateCurrentTask = (type, value) => {
    if(type == "titleAndDescription") {
      if(taskTitle && taskDescription) {
        const payload = {
          title : taskTitle,
          description : taskDescription
        };
        dispatch(updateTask(id, payload))
      }
    }
    else if(type == "status") {
      const payload = {
        taskStatus : value
      };
      dispatch(updateTask(id, payload))
    }
    else if(type == "tags") {
      const payload = {
        tags : value
      };
      dispatch(updateTask(id, payload))
    }
  }

  const updateTaskStatus = (e, subTaskId) => {
    let currValue = e.target.checked; 
    const payload = {
      status : currValue
    }
    dispatch(updateSubTaskStatus(id, subTaskId, payload))
    .then((res) => setSubTasks(res));
  }

  useEffect(() => {
    if(allTasks.length == 0) 
      dispatch(getTasks())
      
    if(allTasks) {
      const currentTask = allTasks.find((task) => task._id == id);
      if(currentTask) {
        setTaskTitle(currentTask.title);
        setTaskDescription(currentTask.description);
        setTaskStatus(currentTask.taskStatus);
        setTaskTags(currentTask.tags);
        if(subTasks) {
          const temp = subTasks
                      .filter((subTask) => subTask.status && subTask.title)
                      .map((item) => item.title);
          setSelectedSubTasks(temp);
        }
      }
    }
  }, [id, allTasks])

  

  return (
    <Box width="100%" padding="10px" justifyContent="space-between">
      <Flex direction={'row'}>
        <Box border="1px solid rgba(0,0,0,0.1)" width="30%" margin="auto" height="95vh" justifyContent="space-between" padding="20px">
          <Flex justifyContent="space-between" direction="column">
            <Input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}></Input>
            <Textarea margin="10px 0" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}></Textarea>
            <Button onClick={() => updateCurrentTask("titleAndDescription")}>UPDATE</Button>
          </Flex>
          <Flex justifyContent="space-between" marginTop="4rem" direction={'column'}>
            
            <form onSubmit={addSubTask}>
              <Flex direction={'row'}>
                <Input placeholder={'Add New SubTask'} value={newSubTask} onChange={(e) => setNewSubTask(e.target.value)}></Input>
                <Button onClick={addSubTask}>ADD</Button>
              </Flex>
            </form>
            
            <Box marginTop="20px">
            <CheckboxGroup colorScheme='blue' value={selectedSubTasks} 
              onChange={(value) => {
                }
              }>
                <Stack spacing={[1, 2]} direction={['column']}>
                    {
                        subTasks.length > 0 && 
                        subTasks.map((subTask) => {
                            return <Flex key={subTask._id} justifyContent={'space-between'}>
                            <Checkbox value={subTask.title} onChange={(e) => updateTaskStatus(e, subTask._id)}>{subTask.title}</Checkbox>
                            <DeleteIcon cursor={'pointer'} marginTop={'4px'} onClick={() => deleteCurSubTask(subTask._id)}/>
                          </Flex>
                        })
                    }
                    
                </Stack>
            </CheckboxGroup>
            </Box>
          </Flex>
        </Box>
        <Box border="1px solid rgba(0,0,0,0.1)" width="30%" margin="auto" height="95vh" justifyContent="space-between" padding="20px" textAlign='left'>
          <Heading as='h5' size='md'>
            Status
          </Heading>
          <RadioGroup margin="20px 0" value={taskStatus} onChange={(val) => {
            setTaskStatus(val);
            updateCurrentTask("status", val);
          }}>
            <Stack direction='column'>
              <Radio value='todo'>Todo</Radio>
              <Radio value='in-progres'>In-Progress</Radio>
              <Radio value='done'>Done</Radio>
            </Stack>
          </RadioGroup>
          <Heading as='h5' size='md'>
            Tags
          </Heading>
          <form onSubmit={addNewTag}>
            <Flex justifyContent="space-between" margin="20px 0">
              <Input placeholder={'Add New Tag'} value={newTag} onChange={(e) => setNewTag(e.target.value)}></Input>
              <Button onClick={addNewTag}>ADD</Button>
            </Flex>
            </form>
          <CheckboxGroup value={taskTags} onChange={(value) => {
            setTaskTags(value);
            updateCurrentTask("tags", value);
          }}>
            <Stack spacing={[1, 2]} direction={['column']}>
              {
                tags.length > 0 && 
                tags.map((tag, index) => {
                  return <Checkbox key={index} value={tag.tag}>{tag.tag}</Checkbox>
                })
              }
            </Stack>
          </CheckboxGroup>
        </Box>
      </Flex>
    </Box>
  )
}

export default Edit