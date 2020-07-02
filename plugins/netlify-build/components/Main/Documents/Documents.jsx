import React, { useEffect, useState, useCallback } from 'react'
import { IntentLink } from 'part:@sanity/base/router'
import Preview from 'part:@sanity/base/preview'
import client from 'part:@sanity/base/client'
import schema from 'part:@sanity/base/schema'

import styles from './Documents.css'

// Get all document types from sanity
const documentTypes = ['post', 'category', 'home', 'about', 'contact', 'cookies', 'config']

const Documents = ({ lastUpdated }) => {
    // Return empty while loading
    if (!lastUpdated) {
        return <div></div>
    }

    // Setup document state
    const [documents, setDocuments] = useState([])

    // Get the recently updated documents
    useEffect(() => {
        (async () => {
            const documents = await client.fetch('*[!(_id in path("drafts.**")) && _type in $types && _updatedAt > $lastUpdated] | order (_updatedAt desc)', { types: documentTypes, lastUpdated })
            setDocuments(documents)
        })()
    }, [lastUpdated])

    return (
        <div>
            <p className={styles.helpText}><em>These documents will be pushed when the site is next updated. To remove an item from the list, click and then unpublish it. Deleted documents won't show up here.</em></p>
            <ul className={styles.documentList}>
                {documents.length ? (
                    documents.map(doc => (
                        <li key={doc._id} className={styles.documentListItem}>
                            <Preview value={doc} type={schema.get(doc._type)} />
                            <IntentLink intent="edit" params={{ id: doc._id, type: doc._type }} className={styles.documentListItemEdit}>Edit item</IntentLink>
                        </li>
                    ))
                ) : (
                        <li className={styles.emptyDocumentListItem}>Everything is up to date</li>
                    )}
            </ul>
        </div>
    )
}

export default Documents