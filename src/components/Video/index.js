import ReactPlayer from 'react-player'
import { useAppContext } from '../../contexts/AppContext'

import styles from './Video.module.scss'

export function Video() {
    const {
        videoVolume,
        videoPlaying,
        selectedRadio
    } = useAppContext()

    return (
        <ReactPlayer
            url={selectedRadio}
            className={styles.video}
            playing={videoPlaying}
            loop={true}
            volume={videoVolume}
        />
    )
}