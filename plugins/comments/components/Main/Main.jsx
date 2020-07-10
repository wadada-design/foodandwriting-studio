import React, { useEffect, useReducer } from 'react'

import styles from './Main.css'
import { MainContext, mainReducer } from './Main.state'

import PostList from './PostList'
import { commentsClient } from '../../utils'

const Main = () => {
    const [state, dispatch] = useReducer(mainReducer, { posts: null, activePost: null })

    // Fetch initial comments from api
    // UPDATE to get all unique posts with comments + amount of user comments + not replied to
    useEffect(() => {
        (async () => {
            const comments = await commentsClient.get('/comments')
            dispatch({ type: 'SET_POSTS', payload: comments.data.map(comment => comment.post_id) })
        })()
    }, [])

    return (
        <MainContext.Provider value={{ state, dispatch }}>
            <div className={styles.container}>
                <section>
                    <h2 className={styles.title}>Comments</h2>
                </section>
                <section>
                    <PostList posts={state.posts} />
                </section>
            </div>
        </MainContext.Provider>
    )
}

export default Main