import React, { useEffect, useState, useCallback } from 'react'

import styles from './Main.css'
import Status from './Status'
import Documents from './Documents'
import { netlifyClient } from '../../utils'

const Main = () => {
    const [netlifyState, setNetlifyState] = useState(null)

    const refreshNetlifyState = useCallback(async () => {
        const { data } = await netlifyClient.get(`/sites/${process.env.SANITY_STUDIO_NETLIFY_SITE_ID}`)
        console.log(data)
        setNetlifyState(data)
    },
        [setNetlifyState],
    )

    useEffect(() => {
        refreshNetlifyState()
        const refresh = setInterval(refreshNetlifyState, 60000)

        return () => {
            clearInterval(refresh)
        }
    }, [])

    // Compute variables
    const lastUpdated = netlifyState ? netlifyState.published_deploy.published_at : null

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>Build status</h2>
                <Status lastUpdated={lastUpdated} refreshNetlifyState={refreshNetlifyState} />
            </section>
            <section>
                <h2 className={styles.title}>Recently updated</h2>
                <Documents lastUpdated={lastUpdated} />
            </section>
        </div>
    )
}


export default Main
