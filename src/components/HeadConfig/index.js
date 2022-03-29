import Head from 'next/head'

import { useAppContext } from '../../contexts/AppContext'

export function HeadConfig() {
    const { pause, timer } = useAppContext()

    return (
        <Head>
            <title>{pause ? `Pomo-Pomodoro` : `${timer.toFormat('mm:ss')} - Pomo-Pomodoro`}</title>
            <meta name="description" content="Pomo-Pomodoro is a great partner for everyone achieve your goals. It´s simple, accessible and flexible. Give a boost in your focus and results using the Pomodoro technique."></meta>
            <meta property="og:type" content="website" />
            <meta name="og:title" property="og:title" content="Pomo-Pomodoro"></meta>
            <meta property="og:image" content="https://www.pomopomodoro.tech/metaImg.png"></meta>
            <meta name="robots" content="index, follow"></meta>
            <meta name="google-site-verification" content="FNVgTegWhJr89tTIcUvJDXOid6NzHGKvqSSW-lrXOG0" />
        </Head>
    )
}