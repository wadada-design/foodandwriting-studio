import React, { useContext } from 'react'
import { FaReply, FaComments } from 'react-icons/fa'

import styles from './Preview.css'

import { MainContext } from '../../Main.state'

export default ({ id, title, commentAmount, repliesAmount, doc }) => {
    const context = useContext(MainContext)
    const isActive = context.state.activeDoc && id === context.state.activeDoc._id

    // Setup dispatch for document click
    const handleClick = (event) => {
        event.preventDefault()
        context.dispatch({ type: 'SET_ACTIVE_DOC', payload: doc })
    }

    const awaitingReply = commentAmount - repliesAmount

    return (
        <li className={isActive ? styles.docPreviewActive : styles.docPreview}>
            <a href="#" onClick={handleClick} className={styles.docPreviewLink}>
                <h3 className={styles.docPreviewLinkTitle}>{title}</h3>
                <div className={styles.docPreviewIconWrapper}>
                    <span className={styles.docPreviewIconWrapperItem}>Comments: {commentAmount}</span>
                    {awaitingReply > 0 && (
                        <span className={styles.docPreviewIconWrapperItem}>Awaiting reply: {awaitingReply}</span>
                    )}
                </div>
            </a>
        </li>
    )
}