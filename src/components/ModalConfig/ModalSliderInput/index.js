import {
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack
} from '@chakra-ui/react'

export function ModalSliderInput({ value, setValue }) {
    return (
        <Slider
            w='80%'
            margin='16px'
            flex='1'
            min={0}
            max={100}
            value={value}
            onChange={val => setValue(val)}
        >
            <SliderMark value={25} mt='8px' ml='-2.5' fontSize='sm'>
                25%
            </SliderMark>
            <SliderMark value={50} mt='8px' ml='-2.5' fontSize='sm'>
                50%
            </SliderMark>
            <SliderMark value={75} mt='8px' ml='-2.5' fontSize='sm'>
                75%
            </SliderMark>
            <SliderMark
                value={value}
                textAlign='center'
                bg='blue.600'
                color='white'
                mt='-10'
                ml='-5'
                w='12'
            >
                {value}%
            </SliderMark>
            <SliderTrack >
                <SliderFilledTrack bg={'red.300'} />
            </SliderTrack>
            <SliderThumb bg='gray.500' />
        </Slider>
    )
}