import React, { useEffect, useReducer } from 'react'

import styles from './Main.css'
import { MainContext, mainReducer, initalState } from './Main.state'

import DocumentList from './DocumentList'
import ActiveDocument from './ActiveDocument'
import { commentsClient } from '../../utils'

const Main = () => {
    const [state, dispatch] = useReducer(mainReducer, initalState)

    // Fetch distinct posts with comments
    useEffect(() => {
        (async () => {
            const comments = await commentsClient.get('/comments/posts')
            dispatch({ type: 'SET_DOCS', payload: comments.data })
        })()
    }, [])

    return (
        <MainContext.Provider value={{ state, dispatch }}>
            <div className={styles.container}>
                <section>
                    <h2 className={styles.title}>Comments</h2>
                </section>
                <section className={styles.postsContainer}>
                    <DocumentList documents={state.documents} />
                    <div className={styles.divider}></div>
                    {state.activeDoc ?
                        <ActiveDocument doc={state.activeDoc} />
                        : <div className={styles.noActiveDoc}>Click a post to view the comments</div>
                    }
                </section>
            </div>
        </MainContext.Provider>
    )
}

export default Main