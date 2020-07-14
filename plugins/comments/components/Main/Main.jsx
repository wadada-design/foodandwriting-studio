import React, { useEffect, useReducer } from 'react'

import styles from './Main.css'
import { MainContext, mainReducer } from './Main.state'

import DocumentList from './DocumentList'
import { commentsClient } from '../../utils'

const Main = () => {
    const [state, dispatch] = useReducer(mainReducer, { docIds: null, activeDoc: null })

    // Fetch distinct posts with comments
    useEffect(() => {
        (async () => {
            const comments = await commentsClient.get('/comments/posts')
            dispatch({ type: 'SET_DOC_IDS', payload: comments.data })
        })()
    }, [])

    return (
        <MainContext.Provider value={{ state, dispatch }}>
            <div className={styles.container}>
                <section>
                    <h2 className={styles.title}>Comments</h2>
                </section>
                <section className={styles.postsContainer}>
                    <DocumentList ids={state.docIds} />
                </section>
            </div>
        </MainContext.Provider>
    )
}

export default Main