import { Button, FormControl, FormLabel, Input, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useDisclosure } from '@chakra-ui/react'
import React, { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { createTask, getTasks } from '../redux/AppReducer/action'

const initState = {
    title : "",
    description : "Default description",
    task_status : "todo",
    tags : ["Others"],
    subTasks : [],
}

const reducer = (state, action) => {
    switch(action.type) {
        case "title" :
            return {
                ...state,
                title : action.payload
            }
        case "description" :
            return {
                ...state,
                description : action.payload,
            }
        case "task_status" : 
            return {
                ...state,
                status : action.payload
            }
        case "tags" : 
            return {
                ...state,
                tags : action.payload
            }
        default :
            return state;
    }
} 

function CreateTaskModal({isOpen, onClose}) {

    const [formState, setFormState] = useReducer(reducer, initState);
    const allTags = useSelector((store) => store.AppReducer.tags);
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const location = useLocation();
    const { onOpen } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)


    const createNewTask = () => {
      if(formState.title) {
        dispatch(createTask(formState))
        .then(() => {
          onClose();
          if(location.pathname !== '/')
            nevigate('/');
        })
      }
    }
  
    return (
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input ref={initialRef} placeholder='Title' value={formState.title} onChange={(e) => setFormState({type: "title", payload: e.target.value})} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder='Description' value={formState.description} onChange={(e) => setFormState({type: "description", payload: e.target.value})} />
              </FormControl> 

              <FormControl mt={4}>
                <FormLabel>Task Status</FormLabel>  
                <Select placeholder='Task Status'  value={formState.task_status} onChange={(value) => setFormState({type: "task_status", payload: value})} >
                    <option value='todo'>Todo</option>
                    <option value='in-progres'>In-Progess</option>
                    <option value='done'>Done</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Task Tags</FormLabel>
                <Menu closeOnSelect={false}>
                    <MenuButton as={Button}>
                        Select Tags
                    </MenuButton>
                    <MenuList>
                        <MenuOptionGroup title='Tags' type='checkbox'  value={formState.tags} onChange={(value) => setFormState({type: "tags", payload: value})} >
                            {
                                allTags.length > 0 && 
                                allTags.map((item) => {
                                    return <MenuItemOption key={item.id} value={item.tag}>{item.tag}</MenuItemOption>
                                })
                            }
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>
              </FormControl>


            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={createNewTask}>
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default CreateTaskModal