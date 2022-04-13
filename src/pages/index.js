import { useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  useColorMode,
  useToast,
  Text,
} from '@chakra-ui/react'

import ModalConfig from '../components/ModalConfig'
import { useAppContext } from '../contexts/AppContext'
import { ColorConfig } from '../components/ColorConfig'
import { LanguageConfig } from '../components/LanguageConfig'
import { Video } from '../components/Video'
import { VideoPlayer } from '../components/VideoPlayer'
import { HeadConfig } from '../components/HeadConfig'

export default function Home() {
  const context = useAppContext()

  const { colorMode } = useColorMode()

  const { title, startButton, pauseButton, resetButton } = context.state.texts

  const toast = useToast({
    title: 'Atenção!',
    description: "Seu ciclo terminou.",
    status: 'info',
    duration: 5000,
    isClosable: true,
    variant: 'solid',
    position: 'bottom'
  })

  useEffect(() => {
    if (context.timer == 0) {
      context.alarm()
    }

    if (context.timer == 0 && context.cycle % 2 === 0) {
      context.cycles(context.focusDuration, context.cycle += 1)
      context.setCycleState('focus')
      context.pushNotification()
      toast()
    } else if (context.timer == 0 && context.cycle < 7) {
      context.cycles(context.shortBreakDuration, context.cycle += 1)
      context.setCycleState('shortBreak')
      context.pushNotification()
      toast()
    } else if (context.timer == 0 && context.cycle === 7) {
      context.cycles(context.longBreakDuration, 0)
      context.setCycleState('longBreak')
      context.pushNotification()
      toast()
    }

  }, [context.timer])

  return (
    <>
      <HeadConfig />

      <Container
        position="relative"
        overflow="hidden"
        align="center"
        maxW='100vw'
        width='100%'
        height='100vh'
        bg=
        {context.videoPlaying
          ? 'transparent'
          : colorMode === 'light' ? (
            context.cycleState == 'focus'
              ? 'red.100'
              : context.cycleState == 'shortBreak'
                ? 'blue.100'
                : 'blue.200')
            : ('gray.800')
        }
        transition="all 400ms linear"
      >
        <Video />
        <Box pt="10" maxWidth="xl" >
          <Flex justify="end" align='center'>
            <ColorConfig />
            <LanguageConfig />
            <ModalConfig />
          </Flex>

          <Heading as='h1' py='8' fontSize={['5xl', '6xl']} color='red.500'>Pomo-Pomodoro</Heading>
          <Text fontSize={['xl', '2xl']} >{title}</Text>
        </Box>

        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          maxW='sm'
        >
          <Text fontSize={['7xl', '8xl']} my="8" color={colorMode === 'light' ? 'gray.600' : 'gray.200'} fontWeight='500'>
            {context.timer.toFormat('mm:ss')}
          </Text>

          <HStack spacing='83' >
            <Button
              size="lg"
              width='115px'
              color='white'
              boxShadow='0 0 5px #e7e7e7'
              bg='red.500'
              _hover={{ bg: 'red.600' }}
              onClick={context.handleClick}
            >
              {context.buttonDescription ? startButton : pauseButton}
            </Button>

            <Button
              size="lg"
              width='115px'
              color='black'
              boxShadow='0 0 5px #e7e7e7'
              bg='yellow.400'
              _hover={{ bg: 'yellow.500' }}
              onClick={context.resetTimer}
            >
              {resetButton}
            </Button>
          </HStack>
        </Box>
        <VideoPlayer />
      </Container>
    </>
  )
}