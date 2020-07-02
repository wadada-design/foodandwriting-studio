import React, { useState, useEffect, useCallback } from 'react'

import styles from './Main.css'
import Comments from './Comments'
import { commentsClient } from '../../utils'

const Main = () => {
    // Setup comments state
    const [comments, setComments] = useState(null)

    const getComments = useCallback(async () => {
        const { data } = await commentsClient.get('/comments')
        console.log(data)
    }, [setComments])

    useEffect(() => {
        getComments()
    }, [])

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>Comments</h2>
                <button>Refresh</button>
            </section>
            <Comments />
        </div>
    )
}

export default Main