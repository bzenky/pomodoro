import { Flex, FormLabel, NumberInput, NumberInputField } from '@chakra-ui/react'

export function ModalTimeInput({ label, value, setValue, nameId }) {
    return (
        <Flex direction='column' justifyContent='center' mr='16px'>
            <FormLabel htmlFor='focusDuration' textAlign='center' m='0 0 8px'>
                {label}
            </FormLabel>
            <NumberInput
                w='80px'
                min={1}
                value={value}
                onChange={val => setValue(val)}
                type='number'
                name={nameId}
                id={nameId}
                variant='filled'
            >
                <NumberInputField />
            </NumberInput>
        </Flex>
    )
}