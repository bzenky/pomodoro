import { useEffect } from 'react'

import Head from 'next/head'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react'

import ModalConfig from '../components/ModalConfig'
import { useAppContext } from '../contexts/AppContext'
import { MuteConfig } from '../components/MuteConfig'
import { ColorConfig } from '../components/ColorConfig'
import { LanguageConfig } from '../components/LanguageConfig'

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
      <Head>
        <title>{context.pause ? `Pomo-Pomodoro` : `${context.timer.toFormat('mm:ss')} - Pomo-Pomodoro`}</title>
      </Head>

      <Container
        align="center"
        maxW='100vw'
        width='100%'
        height='100vh'
        bg=
        {colorMode === 'light' ? (
          context.cycleState == 'focus'
            ? 'red.100'
            : context.cycleState == 'shortBreak'
              ? 'blue.100'
              : 'blue.200')
          : ('gray.800')
        }
        transition="background-color 300ms linear"
      >
        <Box pt="70" maxWidth="xl" >
          <Flex justify="end" align='center'>
            <ColorConfig />
            <LanguageConfig />
            <ModalConfig />
          </Flex>

          <Heading as='h1' py='2' fontSize={['5xl', '6xl']} color='red.500'>Pomodoro</Heading>
          <Text mt='4' fontSize={['xl', '2xl']} >{title}</Text>
        </Box>

        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          maxW='sm'
        >
          <Text fontSize={['7xl', '8xl']} my="3" color={colorMode === 'light' ? 'gray.600' : 'gray.200'} fontWeight='500'>
            {context.timer.toFormat('mm:ss')}
          </Text>

          <HStack spacing='83' >
            <Button
              size="lg"
              width='115px'
              color='white'
              bg={colorMode === 'light' ? 'red.500' : 'red.800'}
              _hover={{ bg: colorMode === 'light' ? 'red.600' : 'red.900' }}
              onClick={context.handleClick}
            >
              {context.buttonDescription ? startButton : pauseButton}
            </Button>

            <Button
              size="lg"
              width='115px'
              color='black'
              bg={colorMode === 'light' ? 'yellow.400' : 'yellow.500'}
              _hover={{ bg: colorMode === 'light' ? 'yellow.500' : 'yellow.600' }}
              onClick={context.resetTimer}
            >
              {resetButton}
            </Button>
          </HStack>
        </Box>
      </Container>
    </>
  )
}