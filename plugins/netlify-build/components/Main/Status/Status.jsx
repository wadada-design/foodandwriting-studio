import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FiArrowUpCircle } from 'react-icons/fi'
import { GrUpdate } from 'react-icons/gr'

import { netlifyClient } from '../../../utils'
import styles from './Status.css'

const Status = ({ lastUpdated, refreshNetlifyState }) => {
    // Instantiate deploy state
    const [buildState, setBuildState] = useState({ loading: false, build: null })

    const updateSite = async () => {
        if (buildState.loading) {
            return
        }

        try {
            // Create a new deploy
            const build = await netlifyClient.post(`/sites/${process.env.SANITY_STUDIO_NETLIFY_SITE_ID}/builds`)
            const id = build.data.id
            // Get build info
            const buildStatus = await netlifyClient.get(`/builds/${id}`)
            setBuildState({ loading: true, build: buildStatus.data })
        } catch (err) {
            console.log(err)
        }
    }

    // Create loop to check build status
    useEffect(() => {
        if (!buildState.loading) {
            return
        }

        const check = setInterval(async () => {
            const checkStatus = await netlifyClient.get(`/builds/${buildState.build.id}`)
            // console.log(checkStatus.data)

            if (checkStatus.data.done) {
                clearInterval(check)
                refreshNetlifyState()
                setBuildState({ loading: false, build: checkStatus.data })
            }
        }, 10000)

        return () => {
            clearInterval(check)
        }
    }, [buildState])

    const getStatus = (loading, done, error) => {
        switch (true) {
            case (loading && !done):
                return 'Building site'

            case (done && !error):
                return 'Site built'

            case (done && error !== null):
                return error

            default:
                return 'Nothing yet'
        }
    }

    // Compute variables
    const lastUpdatedString = lastUpdated ? moment(lastUpdated).fromNow() : 'loading'

    return (
        <div>
            <div className={styles.meta}>
                <span className={styles.lastUpdated}>Last updated: <b>{lastUpdatedString}</b></span>
                <button onClick={updateSite} className={`${styles.updateBtn} ${buildState.loading ? styles.loading : ''}`}>
                    {buildState.loading ? 'Updating' : 'Update site'}
                    {buildState.loading ? <GrUpdate /> : <FiArrowUpCircle />}
                </button>
            </div>
            {(buildState.loading || (buildState.build && buildState.build.done)) && (
                <p className={styles.buildStatus}>Status: {getStatus(buildState.loading, buildState.build.done, buildState.build.error)}</p>
            )}
        </div>
    )
}

export default Status