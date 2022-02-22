import { IconButton, useColorMode } from '@chakra-ui/react'

import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export function ColorConfig() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <IconButton
            onClick={toggleColorMode}
            bg='transparent'
            aria-label='Change color mode'
            icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
            size='lg'
        />
    )
}