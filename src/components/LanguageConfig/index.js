import { IconButton } from '@chakra-ui/react'

import { useAppContext } from '../../contexts/AppContext'

import BrazilFlag from '../../../public/br.svg'
import EuaFlag from '../../../public/us.svg'

export function LanguageConfig() {
  const { setLanguageSelected } = useAppContext()

  return (
    <>
      <IconButton 
        icon={<BrazilFlag />}
        variant='unstyled'
        size='sm'
        margin='5px'
        onClick={() => setLanguageSelected('pt')}
      />

      <IconButton 
        icon={<EuaFlag />}
        variant='unstyled'
        size='sm'
        margin='5px'
        onClick={() => setLanguageSelected('en')}
      />
    </>
  )
}