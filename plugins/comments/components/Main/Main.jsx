import React, { useEffect, useReducer } from 'react'

import styles from './Main.css'
import { MainContext, mainReducer } from './Main.state'
import { commentsClient } from '../../utils'

const Main = () => {
    const [state, dispatch] = useReducer(mainReducer, { comments: null, activePost: null })

    useEffect(() => {
        (async () => {
            // Fetch initial comments from api
            const fetchedComments = await commentsClient.get('/comments')
            dispatch({ type: 'setComments', payload: fetchedComments.data })
        })()
    }, [])

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>Comments</h2>
                {JSON.stringify(state.comments)}
            </section>
        </div>
    )
}

export default Main