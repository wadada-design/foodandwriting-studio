import React, { useEffect, useCallback, useReducer } from 'react'

import styles from './ActiveDocument.css'

import { ActiveDocumentContext, activeDocumentReducer, initialState } from './ActiveDocument.state'

import Comment from './Comment'
import { commentsClient } from '../../../utils'

export default function ActiveDocument({ doc }) {
    const [comments, dispatch] = useReducer(activeDocumentReducer, initialState)

    // Set up getting comments
    const getComments = useCallback(async () => {
        const { data } = await commentsClient.get(`/comments/${doc._id}`)
        dispatch({ type: 'SET_COMMENTS', payload: data })
    }, [doc])

    // Fetch comments on load
    useEffect(() => { getComments() }, [doc])

    return (
        <ActiveDocumentContext.Provider value={{ state: comments, dispatch }}>
            <div>
                <h2>Comments: {doc.title}</h2>
                {comments.length && (
                    <ul className={styles.commentList}>
                        {comments.map(comment => (
                            <li key={comment.id} className={styles.commentListItem}>
                                <Comment comment={comment} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </ActiveDocumentContext.Provider>
    )
}

// 1. Set the state with a list of comments
// 2. Create function 