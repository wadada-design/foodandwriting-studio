import React, { useEffect, useState, useContext } from 'react'
import client from 'part:@sanity/base/client'

import styles from './DocumentList.css'

import { MainContext } from '../Main.state'

const Documents = ({ documents }) => {
    const context = useContext(MainContext)
    const [listedDocs, setListedDocs] = useState(null)

    // Fetch documents from sanity 
    useEffect(() => {
        if (!documents || !documents.length) {
            return
        }

        (async () => {
            const ids = documents.map(doc => doc.post_id)
            const sanityDocuments = await client.fetch('*[!(_id in path("drafts.**")) && _id in $ids] | order (_updatedAt desc)', { ids })
            setListedDocs(sanityDocuments)
        })()
    }, [documents])

    // Setup dispatch for document click
    const handleDocumentClick = (id) => {
        context.dispatch({ type: 'SET_ACTIVE_DOC', payload: id })
    }

    return (
        <div>
            <h2>Documents</h2>
            <ul className={styles.docList}>
                {(listedDocs && listedDocs.length) && (
                    listedDocs.map(doc => {
                        const activeDoc = documents.filter(stateDoc => stateDoc.post_id === doc._id)[0]

                        return (
                            <li key={doc._id}>
                                <button onClick={() => handleDocumentClick(doc._id)}>
                                    <p>Tile: {doc.title}</p>
                                    <p>Comments amount: {activeDoc.comments_no}</p>
                                    <p>Replies amount: {activeDoc.replies_no}</p>
                                </button>
                            </li>
                        )
                    })
                )}
            </ul>
        </div>
    )
}

export default Documents