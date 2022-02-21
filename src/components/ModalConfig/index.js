import { useState } from 'react'

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
  Switch,
  useDisclosure
} from '@chakra-ui/react'

import { SettingsIcon } from '@chakra-ui/icons'

import { Duration } from 'luxon'

import { useAppContext } from '../../contexts/AppContext'

import { requestNotificationPermission } from '../../utils/push-notification'

export default function ModalConfig() {
  const context = useAppContext()

  const [focusConfig, setFocusConfig] = useState(context.focusDuration)
  const [shortBreakConfig, setShortBreakConfig] = useState(context.shortBreakDuration)
  const [longBreakConfig, setLongBreakConfig] = useState(context.longBreakDuration)
  const { isOpen, onOpen, onClose } = useDisclosure()

  function toggleSwitch() {
    if (context.notifications){
      context.setNotifications(false)
    } else {
      requestNotificationPermission()
      context.setNotifications(true)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    context.setFocusDuration(focusConfig)
    context.setTimer(Duration.fromObject({ minutes: focusConfig }))
    context.setShortBreakDuration(shortBreakConfig)
    context.setLongBreakDuration(longBreakConfig)
    context.setCycle(1)

    onClose()
  }

  function openConfig() {
    if (!context.pause) {
      context.setButtonDescription(true)
      clearInterval(context.intervalRef.current)
      context.setPause(true)
    }

    onOpen()
  }

  return (
    <>
      <IconButton
        onClick={openConfig}
        bg='transparent'
        aria-label='Open Pomodoro configurations'
        icon={<SettingsIcon />}
        size='lg'
      />


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader textAlign='center'>Configs</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as="form" onSubmit={handleSubmit}>
              <Flex
                flexDirection='column'
                padding='0 10px 10px'
                margin='0 10px 10px'
              >
                <FormLabel htmlFor='focusDuration' textAlign='center'>Focus Duration</FormLabel>
                <Flex>
                  <NumberInput
                    w='80px'
                    margin='10px'
                    min={1}
                    value={focusConfig}
                    onChange={val => setFocusConfig(val)}
                    type='number'
                    name='focusDuration'
                    id='focusDuration'
                    variant='filled'
                  >
                    <NumberInputField />
                  </NumberInput>
                  <Slider
                    w='80%'
                    margin='10px'
                    flex='1'
                    min={1}
                    focusThumbOnChange={false}
                    value={focusConfig}
                    onChange={val => setFocusConfig(val)}
                  >
                    <SliderTrack h='5px'>
                      <SliderFilledTrack bg={'red.300'} />
                    </SliderTrack>
                    <SliderThumb bg='gray.500' />
                  </Slider>
                </Flex>
                <Flex justifyContent='center' mt='2'>
                  <Button
                    onClick={() => setFocusConfig(25)}
                    bg='red.300'
                    color='white'
                    _hover={{ bg: 'red.400' }}
                    _active={{
                      bg: 'red.400',
                      transform: 'scale(0.98)',
                      borderColor: '#bec3c9',
                    }}
                    size='sm'
                  >
                    25
                  </Button>
                  <Button
                    onClick={() => setFocusConfig(45)}
                    bg='red.300'
                    color='white'
                    _hover={{ bg: 'red.400' }}
                    _active={{
                      bg: 'red.400',
                      transform: 'scale(0.98)',
                      borderColor: '#bec3c9',
                    }}
                    size='sm'
                    ml='4'
                  >
                    45
                  </Button>
                  <Button
                    onClick={() => setFocusConfig(60)}
                    bg='red.300'
                    color='white'
                    _hover={{ bg: 'red.400' }}
                    _active={{
                      bg: 'red.400',
                      transform: 'scale(0.98)',
                      borderColor: '#bec3c9',
                    }}
                    ml='4'
                    size='sm'
                  >
                    60
                  </Button>
                </Flex>
              </Flex>

              <Flex
                flexDirection='column'
                borderTop='1px solid rgba(0 0 0 / .08)'
                p='10px'
                margin='10px'
              >
                <FormLabel htmlFor='shortBreakDuration' textAlign='center'>Short Break Duration</FormLabel>
                <Flex>
                  <NumberInput
                    w='80px'
                    margin='10px'
                    min={1}
                    value={shortBreakConfig}
                    onChange={val => setShortBreakConfig(val)}
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
                    min={1}
                    focusThumbOnChange={false}
                    value={shortBreakConfig}
                    onChange={val => setShortBreakConfig(val)}
                  >
                    <SliderTrack h='5px'>
                      <SliderFilledTrack bg={'red.300'} />
                    </SliderTrack>
                    <SliderThumb bg='gray.500' />
                  </Slider>
                </Flex>
                <Flex justifyContent='center' mt='2'>
                  <Button
                    onClick={() => setShortBreakConfig(5)}
                    bg='red.300'
                    color='white'
                    _hover={{ bg: 'red.400' }}
                    _active={{
                      bg: 'red.400',
                      transform: 'scale(0.98)',
                      borderColor: '#bec3c9',
                    }}
                    size='sm'
                  >
                    05
                  </Button>
                  <Button
                    onClick={() => setShortBreakConfig(10)}
                    bg='red.300'
                    color='white'
                    _hover={{ bg: 'red.400' }}
                    _active={{
                      bg: 'red.400',
                      transform: 'scale(0.98)',
                      borderColor: '#bec3c9',
                    }}
                    size='sm'
                    ml='4'
                  >
                    10
                  </Button>
                  <Button
                    onClick={() => setShortBreakConfig(15)}
                    bg='red.300'
                    color='white'
                    _hover={{ bg: 'red.400' }}
                    _active={{
                      bg: 'red.400',
                      transform: 'scale(0.98)',
                      borderColor: '#bec3c9',
                    }}
                    size='sm'
                    ml='4'
                  >
                    15
                  </Button>
                </Flex>
              </Flex>

              <Flex
                flexDirection='column'
                borderTop='1px solid rgba(0 0 0 / .08)'
                p='10px'
                margin='10px'
              >
                <FormLabel htmlFor='longBreakDuration' textAlign='center'>Long Break Duration</FormLabel>
                <Flex>
                  <NumberInput
                    w='80px'
                    margin='10px'
                    min={1}
                    value={longBreakConfig}
                    onChange={val => setLongBreakConfig(val)}
                    type='number'
                    name='longBreakDuration'
                    id='longBreakBreakDuration'
                    variant='filled'
                  >
                    <NumberInputField />
                  </NumberInput>
                  <Slider
                    w='80%'
                    margin='10px'
                    flex='1'
                    min={1}
                    focusThumbOnChange={false}
                    value={longBreakConfig}
                    onChange={val => setLongBreakConfig(val)}
                  >
                    <SliderTrack h='5px'>
                      <SliderFilledTrack bg={'red.300'} />
                    </SliderTrack>
                    <SliderThumb bg='gray.500' />
                  </Slider>
                </Flex>
                <Flex justifyContent='center' mt='2'>
                  <Button
                    onClick={() => setLongBreakConfig(15)}
                    bg='red.300'
                    color='white'
                    _hover={{ bg: 'red.400' }}
                    _active={{
                      bg: 'red.400',
                      transform: 'scale(0.98)',
                      borderColor: '#bec3c9',
                    }}
                    size='sm'
                  >
                    15
                  </Button>
                  <Button
                    onClick={() => setLongBreakConfig(20)}
                    bg='red.300'
                    color='white'
                    _hover={{ bg: 'red.400' }}
                    _active={{
                      bg: 'red.400',
                      transform: 'scale(0.98)',
                      borderColor: '#bec3c9',
                    }}
                    size='sm'
                    ml='4'
                  >
                    20
                  </Button>
                  <Button
                    onClick={() => setLongBreakConfig(25)}
                    bg='red.300'
                    color='white'
                    _hover={{ bg: 'red.400' }}
                    _active={{
                      bg: 'red.400',
                      transform: 'scale(0.98)',
                      borderColor: '#bec3c9',
                    }}
                    size='sm'
                    ml='4'
                  >
                    25
                  </Button>
                </Flex>
              </Flex>

              <Flex py='4' justifyContent='center'>
                <FormLabel htmlFor='longBreakDuration' textAlign='center'>Show notifications</FormLabel>
                <Switch 
                  colorScheme='red'
                  onChange={toggleSwitch}
                  isChecked={context.notifications}
                />
              </Flex>

              <Flex py='4' justifyContent='center'>
                <Button
                  type='submit'
                  bg='gray.600'
                  color='white'
                  _hover={{ bg: 'gray.700' }}
                  _active={{
                    bg: 'gray.700',
                    transform: 'scale(0.98)',
                    borderColor: '#bec3c9',
                  }}
                  size='md'
                >
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