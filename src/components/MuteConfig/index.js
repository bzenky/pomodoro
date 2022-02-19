import { Flex, IconButton } from '@chakra-ui/react'

import Volume from '../../../public/volume.svg'
import VolumeMute from '../../../public/volume-mute.svg'

import { useAppContext } from '../../contexts/AppContext'

export function MuteConfig() {
    const { muted, setMuted } = useAppContext()

    function mutedConfig() {
        return setMuted(!muted)
    }

    return (
        <IconButton
            onClick={mutedConfig}
            bg='transparent'
            aria-label='Set Muted'
            icon={muted ? <VolumeMute /> : <Volume />}
            size='lg'
        />
    )
}