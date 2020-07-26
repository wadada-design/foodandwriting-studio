import React, { useState } from 'react'
import moment from 'moment'
import { FaRegClock, FaTrashAlt, FaUserAlt } from 'react-icons/fa'

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
                <button>Delete <FaTrashAlt /></button>
            </header>
            <section>
                <p className={styles.commentText}>"{text}"</p>
                <p><FaUserAlt /> {display_name} <span>{verifiedBadgeText}</span></p>
            </section>
            <footer>
                <button>Approve</button>
                <button>Reply</button>
            </footer>
        </article>
    )
}