import React, { useState, useEffect, useCallback } from 'react'

import styles from './ActiveDocument.css'

import Comment from './Comment'
import { commentsClient } from '../../../utils'

export default ({ doc }) => {
    const [comments, setComments] = useState([])

    // Set up getting comments
    const getComments = useCallback(async () => {
        const { data } = await commentsClient.get(`/comments/${doc._id}`)
        setComments(data)
    }, [doc])

    // Fetch comments on load
    useEffect(() => { getComments() }, [doc])

    return (
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
    )
}