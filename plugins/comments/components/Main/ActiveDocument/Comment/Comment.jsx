import React, { useState } from 'react'
import moment from 'moment'
import { FaRegClock, FaRegTrashAlt, FaUserAlt } from 'react-icons/fa'

import styles from './Comment.css'

export default ({ comment: { date, display_name, text, replies, verified, approved } }) => {
    const [activeReply, setActiveReply] = useState(null)

    // Variables
    const time = moment(date).fromNow()
    const verifiedBadgeText = verified ? 'Verified' : 'Unverified'
    const approvedBtnText = approved ? 'Approved' : 'Approve'

    return (
        <article>
            <header className={styles.header}>
                <time dateTime={date} className={styles.headerTime}><FaRegClock /> {time}</time>
                <button className={styles.deleteBtn}><FaRegTrashAlt /></button>
            </header>
            <section>
                <p className={styles.commentText}>"{text}"</p>
                <p className={styles.commentAuthor}>
                    - {display_name}
                    <span className={verified ? styles.verifiedBadge : styles.unverifiedBadge}>{verifiedBadgeText}</span>
                </p>
            </section>
            <footer className={styles.footer}>
                <button className={styles.approveBtn}>Approve</button>
                <button className={styles.replyBtn} disabled={!approved}>Reply</button>
            </footer>
        </article>
    )
}