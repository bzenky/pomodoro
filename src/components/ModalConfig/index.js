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
  Switch,
  Text,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import { Duration } from 'luxon'

import { useAppContext } from '../../contexts/AppContext'
import { requestNotificationPermission } from '../../utils/push-notification'
import { ModalTimeInput } from './ModalTimeInput'
import { ModalSliderInput } from './ModalSliderInput'

export default function ModalConfig() {
  const { colorMode } = useColorMode()
  const context = useAppContext()

  const {
    applyButton,
    focusDurationLabel,
    longBreakLabel,
    modalConfigsTitle,
    notificationsLabel,
    shortBreakLabel,
    timeConfigLabel,
    volumeTitle
  } = context.state.texts

  const [focusConfig, setFocusConfig] = useState(context.focusDuration)
  const [shortBreakConfig, setShortBreakConfig] = useState(context.shortBreakDuration)
  const [longBreakConfig, setLongBreakConfig] = useState(context.longBreakDuration)
  const [volume, setVolume] = useState(context.volume)
  const { isOpen, onOpen, onClose } = useDisclosure()

  function toggleSwitch() {
    if (context.notifications) {
      context.setNotifications(false)
    } else {
      context.setNotifications(true)
      requestNotificationPermission()
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!context.pause) {
      context.setButtonDescription(true)
      context.setPause(true)
      context.workerRef.current.terminate()
    }

    clearInterval(context.intervalRef.current)
    context.setFocusDuration(focusConfig)
    context.setTimer(Duration.fromObject({ minutes: focusConfig }))
    context.setShortBreakDuration(shortBreakConfig)
    context.setLongBreakDuration(longBreakConfig)
    context.setVolume(volume)
    context.setCycle(1)
    context.setCycleState('focus')

    onClose()
  }

  return (
    <>
      <IconButton
        onClick={onOpen}
        bg='transparent'
        aria-label='Open Pomodoro configurations'
        icon={<SettingsIcon />}
        size='lg'
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter='blur(8px)' />
        <ModalContent >
          <ModalHeader textAlign='center'>{modalConfigsTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as="form" onSubmit={handleSubmit}>
              <Text mb="16px" color={colorMode === 'light' ? 'gray.600' : 'gray.200'} fontWeight='500' textAlign='center'>
                {timeConfigLabel}
              </Text>

              <Flex
                justifyContent='center'
                alignItems='center'
                padding='0 16px 16px'
                borderBottom={colorMode === 'light' ? '1px solid #00000027' : '1px solid #FFFFFF27'}
              >
                <ModalTimeInput
                  label={focusDurationLabel}
                  value={focusConfig}
                  setValue={setFocusConfig}
                  nameId='focusDuration'
                />

                <ModalTimeInput
                  label={shortBreakLabel}
                  value={shortBreakConfig}
                  setValue={setShortBreakConfig}
                  nameId='shortBreakDuration'
                />

                <ModalTimeInput
                  label={longBreakLabel}
                  value={longBreakConfig}
                  setValue={setLongBreakConfig}
                  nameId='longBreakDuration'
                />
              </Flex>

              <Flex mt="24px" pb="24px" align="center" borderBottom={colorMode === 'light' ? '1px solid #00000027' : '1px solid #FFFFFF27'}>
                <FormLabel htmlFor='volumeSounds' textAlign='center'>{volumeTitle}</FormLabel>

                <ModalSliderInput
                  value={volume}
                  setValue={setVolume}
                />
              </Flex>

              <Flex mt='32px' justifyContent='center' align='center'>
                <FormLabel htmlFor='longBreakDuration' textAlign='center'>{notificationsLabel}</FormLabel>
                <Switch
                  colorScheme={colorMode === 'light' ? 'red' : ''}
                  onChange={toggleSwitch}
                  isChecked={context.notifications}
                />
              </Flex>

              <Flex py='24px' justifyContent='center'>
                <Button
                  type='submit'
                  bg={colorMode === 'light' ? 'gray.500' : 'gray.500'}
                  color='white'
                  _hover={{ bg: colorMode === 'light' ? 'gray.600' : 'gray.600' }}
                  _active={{
                    bg: colorMode === 'light' ? 'gray.700' : 'gray.700',
                    transform: 'scale(0.98)',
                    borderColor: '#bec3c9',
                  }}
                  size='md'
                >
                  {applyButton}
                </Button>
              </Flex>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}