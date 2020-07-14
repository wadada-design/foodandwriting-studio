import React, { useEffect, useState } from 'react'
import client from 'part:@sanity/base/client'

import styles from './DocumentList.css'

const Documents = ({ ids }) => {
    const [listedDocs, setListedDocs] = useState(null)
    // Fetch documents from sanity 
    useEffect(() => {
        if (!ids || !ids.length) {
            return
        }

        (async () => {
            const documents = await client.fetch('*[!(_id in path("drafts.**")) && _id in $ids] | order (_updatedAt desc)', { ids })
            setListedDocs(documents)
        })()
    }, [ids])

    return (
        <div>
            <h2>Documents</h2>
            <ul className={styles.docList}>
                {(listedDocs && listedDocs.length) && (
                    listedDocs.map(doc => <li key={doc._id}>{doc.title}</li>)
                )}
            </ul>
        </div>
    )
}

export default Documents