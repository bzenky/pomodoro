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
  useDisclosure
} from '@chakra-ui/react'

import { SettingsIcon } from '@chakra-ui/icons'

import { Duration } from 'luxon'

import { useAppContext } from '../../contexts/AppContext'

export default function ModalConfig() {
  const context = useAppContext()

  const [focusConfig, setFocusConfig] = useState(context.focusDuration)
  const [shortBreakConfig, setShortBreakConfig] = useState(context.shortBreakDuration)
  const [longBreakConfig, setLongBreakConfig] = useState(context.longBreakDuration)
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      <Flex justifyContent='end'>
        <IconButton
          onClick={openConfig}
          bg='transparent'
          aria-label='Open Pomodoro configurations'
          icon={<SettingsIcon />}
          size='lg'
        />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader textAlign='center'>Configs</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as="form" onSubmit={handleSubmit}>
              <Flex
                flexDirection='column'
                justifyContent='center'
                borderRadius='5px'
              >
                <FormLabel textAlign='center'>Focus Duration</FormLabel>
                <Flex>
                  <NumberInput
                    w='80px'
                    margin='10px'
                    min={1}
                    value={focusConfig}
                    onChange={val => setFocusConfig(val)}
                    type='number'
                    name='focusDuration'
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
                    colorScheme='blue'
                    size='sm'
                  >
                    25
                  </Button>
                  <Button
                    onClick={() => setFocusConfig(45)}
                    colorScheme='blue'
                    size='sm'
                    ml='4'
                  >
                    45
                  </Button>
                  <Button
                    onClick={() => setFocusConfig(60)}
                    colorScheme='blue'
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
                <FormLabel textAlign='center'>Short Break Duration</FormLabel>
                <Flex>
                  <NumberInput
                    w='80px'
                    margin='10px'
                    min={1}
                    value={shortBreakConfig}
                    onChange={val => setShortBreakConfig(val)}
                    type='number'
                    name='shortBreakDuration'
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
                    colorScheme='blue'
                    size='sm'
                  >
                    05
                  </Button>
                  <Button
                    onClick={() => setShortBreakConfig(10)}
                    colorScheme='blue'
                    size='sm'
                    ml='4'
                  >
                    10
                  </Button>
                  <Button
                    onClick={() => setShortBreakConfig(15)}
                    colorScheme='blue'
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
                <FormLabel textAlign='center'>Long Break Duration</FormLabel>
                <Flex>
                  <NumberInput
                    w='80px'
                    margin='10px'
                    min={1}
                    value={longBreakConfig}
                    onChange={val => setLongBreakConfig(val)}
                    type='number'
                    name='shortBreakDuration'
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
                    colorScheme='blue'
                    size='sm'
                  >
                    15
                  </Button>
                  <Button
                    onClick={() => setLongBreakConfig(20)}
                    colorScheme='blue'
                    size='sm'
                    ml='4'
                  >
                    20
                  </Button>
                  <Button
                    onClick={() => setLongBreakConfig(25)}
                    colorScheme='blue'
                    size='sm'
                    ml='4'
                  >
                    25
                  </Button>
                </Flex>
              </Flex>

              <Flex py='4' justifyContent='center'>
                <Button type='submit' colorScheme='blue' size='md'>
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