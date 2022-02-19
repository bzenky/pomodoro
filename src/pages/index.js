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
} from '@chakra-ui/react'

import ModalConfig from '../components/ModalConfig'
import { useAppContext } from '../contexts/AppContext'
import { MuteConfig } from '../components/MuteConfig'

export default function Home() {
  const context = useAppContext()

  useEffect(() => {
    if (context.timer == 0) {
      context.alarm()
    }

    if (context.timer == 0 && context.cycle % 2 === 0) {
      context.cycles(context.focusDuration, context.cycle += 1)
      context.setCycleState('focus')
    } else if (context.timer == 0 && context.cycle < 7) {
      context.cycles(context.shortBreakDuration, context.cycle += 1)
      context.setCycleState('shortBreak')
    } else if (context.timer == 0 && context.cycle === 7) {
      context.cycles(context.longBreakDuration, 0)
      context.setCycleState('longBreak')
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
        {
          context.cycleState == 'focus'
            ? 'red.100'
            : context.cycleState == 'shortBreak'
              ? 'blue.100'
              : 'blue.200'
        }
        transition="background-color 300ms linear"
      >
        <Box pt="70" maxWidth="xl" >
          <Flex justify="end">
            <MuteConfig />
            <ModalConfig />
          </Flex>

          <Heading as='h1' py='2' fontSize={['5xl', '6xl']} color='red.500'>Pomodoro</Heading>
          <Text mt='4' fontSize={['xl', '2xl']} >Helping you achieve the most of yourself!</Text>
        </Box>

        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          maxW='sm'
        >
          <Text fontSize={['7xl', '8xl']} my="3" color='gray.600' fontWeight='500'>
            {context.timer.toFormat('mm:ss')}
          </Text>

          <HStack spacing='83' >
            <Button size="lg" width='115px' colorScheme="red" onClick={context.handleClick}>
              {context.buttonDescription ? 'Start' : 'Pause'}
            </Button>

            <Button size="lg" width='115px' colorScheme="yellow" onClick={context.resetTimer}>
              Reset
            </Button>
          </HStack>
        </Box>
      </Container>
    </>
  )
}