import {
    IconButton,
    Flex,
    Select,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from '@chakra-ui/react'

import { useAppContext } from '../../contexts/AppContext'
import { radioLinks } from '../../utils/radioLinks'

import PlayImg from '../../../public/play.svg'
import PauseImg from '../../../public/pause.svg'

export function VideoPlayer() {
    const {
        videoVolume,
        setVideoVolume,
        videoPlaying,
        setVideoPlaying,
        selectedRadio,
        setSelectedRadio
    } = useAppContext()

    return (
        <Flex
            position='absolute'
            bottom='48px'
            left='50%'
            w='100%'
            px='4'
            transform='translateX(-50%)'
            align='center'
            justify='center'
            wrap='wrap'
        >
            <Select
                variant='flushed'
                w='160px'
                mr='4'
                align='center'
                onChange={(e) => setSelectedRadio(e.target.value)}
            >
                {radioLinks.map((radio, index) => (
                    <option key={index} value={radio.url}>{radio.name}</option>
                ))}
            </Select>

            <IconButton
                onClick={() => selectedRadio && setVideoPlaying(!videoPlaying)}
                bg='transparent'
                aria-label='Play/Pause Video'
                icon={videoPlaying ? <PauseImg /> : <PlayImg />}
                size='md'
            />

            {videoPlaying &&
                <Slider
                    w='80px'
                    min={0}
                    max={1}
                    step={0.05}
                    ml='4'
                    value={videoVolume}
                    onChange={val => setVideoVolume(val)}
                >
                    <SliderTrack >
                        <SliderFilledTrack bg={'red.300'} />
                    </SliderTrack>
                    <SliderThumb bg='gray.500' />
                </Slider>
            }
        </Flex>
    )
}