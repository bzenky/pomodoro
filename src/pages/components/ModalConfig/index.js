import { useContext } from 'react'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useDisclosure
} from '@chakra-ui/react'

import { SettingsIcon } from '@chakra-ui/icons'

import { Duration } from 'luxon'

import { AppContext } from '../../../contexts/AppContext'

export default function ModalConfig(props) {
  const context = useContext(AppContext)

  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleSubmit(e) {
    e.preventDefault()
    
    context.setTimer(Duration.fromObject({ minutes: context.focusDuration }))

    onClose()
  }

  return (
    <>
      <Flex>
        <IconButton
          onClick={onOpen}
          bg='transparent'
          aria-label='Open Pomodoro configurations'
          icon={<SettingsIcon />}
          marginLeft='90%'
        />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w='400px' maxW='90%'>
          <ModalHeader textAlign='center'>Configs</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as="form" onSubmit={handleSubmit}>
              <Flex 
                flexDirection='column'
                boxShadow='0 0 5px gray'
                borderRadius='5px'
                p='10px'
                margin='10px'
              >
                <FormLabel textAlign='center' htmlFor='focusDuration'>Focus Duration</FormLabel>
                <Flex>
                  <NumberInput
                    w='80px'
                    margin='10px'
                    min={0}
                    value={context.focusDuration}
                    onChange={val => context.setFocusDuration(val)}
                    type='number'
                    name='focusDuration'
                    id='focusDuration'
                    variant='filled'
                    required
                  >
                    <NumberInputField />
                  </NumberInput>
                  <Slider
                    w='80%'
                    margin='10px'
                    flex='1'
                    focusThumbOnChange={false}
                    value={context.focusDuration}
                    onChange={val => context.setFocusDuration(val)}
                  >
                    <SliderTrack h='5px'>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb bg='gray.500' />
                  </Slider>
                </Flex>
                <Flex justifyContent='center'>
                  <Button
                    onClick={() => context.setFocusDuration(25)}
                    colorScheme='blue'
                    m='5px'
                    w='25px'
                    h='25px'
                  >
                    25
                  </Button>
                  <Button
                    onClick={() => context.setFocusDuration(45)}
                    colorScheme='blue'
                    m='5px'
                    w='25px'
                    h='25px'
                  >
                    45
                  </Button>
                  <Button
                    onClick={() => context.setFocusDuration(60)}
                    colorScheme='blue'
                    m='5px'
                    w='25px'
                    h='25px'
                  >
                    60
                  </Button>
                </Flex>
              </Flex>

              <Flex 
                flexDirection='column'
                boxShadow='0 0 5px gray'
                borderRadius='5px'
                p='10px'
                margin='10px'
              >
                <FormLabel htmlFor='shortBreakDuration' textAlign='center' mt='4'>Short Break Duration</FormLabel>
                <Flex>
                  <NumberInput
                    w='80px'
                    margin='10px'
                    min={0}
                    value={context.shortBreakDuration}
                    onChange={val => context.setShortBreakDuration(val)}
                    type='number'
                    name='shortBreakDuration'
                    id='shortBreakDuration'
                    variant='filled'
                  >
                    <NumberInputField />
                  </NumberInput>
                  <Slider
                    w='80%'
                    margin='10px'
                    flex='1'
                    focusThumbOnChange={false}
                    value={context.shortBreakDuration}
                    onChange={val => context.setShortBreakDuration(val)}
                  >
                    <SliderTrack h='5px'>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb bg='gray.500' />
                  </Slider>
                </Flex>
                <Flex justifyContent='center'>
                  <Button
                    onClick={() => context.setShortBreakDuration(5)}
                    colorScheme='blue'
                    m='5px'
                    w='25px'
                    h='25px'
                  >
                    5
                  </Button>
                  <Button
                    onClick={() => context.setShortBreakDuration(10)}
                    colorScheme='blue'
                    m='5px'
                    w='25px'
                    h='25px'
                  >
                    10
                  </Button>
                  <Button
                    onClick={() => context.setShortBreakDuration(15)}
                    colorScheme='blue'
                    m='5px'
                    w='25px'
                    h='25px'
                  >
                    15
                  </Button>
                </Flex>
              </Flex>

              <Flex 
                flexDirection='column'
                boxShadow='0 0 5px gray'
                borderRadius='5px'
                p='10px'
                margin='10px'
              >
                <FormLabel htmlFor='longBreakDuration' textAlign='center' mt='4'>Long Break Duration</FormLabel>
                <Flex>
                  <NumberInput
                    w='80px'
                    margin='10px'
                    min={0}
                    value={context.longBreakDuration}
                    onChange={val => context.setLongBreakDuration(val)}
                    type='number'
                    name='shortBreakDuration'
                    id='shortBreakDuration'
                    variant='filled'
                  >
                    <NumberInputField />
                  </NumberInput>
                  <Slider
                    w='80%'
                    margin='10px'
                    flex='1'
                    focusThumbOnChange={false}
                    value={context.longBreakDuration}
                    onChange={val => context.setLongBreakDuration(val)}
                  >
                    <SliderTrack h='5px'>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb bg='gray.500' />
                  </Slider>
                </Flex>
                <Flex justifyContent='center'>
                  <Button
                    onClick={() => context.setLongBreakDuration(15)}
                    colorScheme='blue'
                    m='5px'
                    w='25px'
                    h='25px'
                  >
                    15
                  </Button>
                  <Button
                    onClick={() => context.setLongBreakDuration(20)}
                    colorScheme='blue'
                    m='5px'
                    w='25px'
                    h='25px'
                  >
                    20
                  </Button>
                  <Button
                    onClick={() => context.setLongBreakDuration(25)}
                    colorScheme='blue'
                    m='5px'
                    w='25px'
                    h='25px'
                  >
                    25
                  </Button>
                </Flex>
              </Flex>

              <Flex py='6'>
                <Button type='submit' colorScheme='blue' margin='0 auto'>
                  Apply
                </Button>
              </Flex>

            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}