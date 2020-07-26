import React, { useEffect, useState } from 'react'
import client from 'part:@sanity/base/client'

import styles from './DocumentList.css'

import Preview from './Preview'

const Documents = ({ documents }) => {
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

    return (
        <div>
            <h2>Posts</h2>
            <ul className={styles.docList}>
                {(listedDocs && listedDocs.length) && (
                    listedDocs.map(doc => {
                        const activeDoc = documents.filter(stateDoc => stateDoc.post_id === doc._id)[0]

                        return <Preview
                            key={doc._id}
                            id={doc._id}
                            title={doc.title}
                            commentAmount={activeDoc.comments_no}
                            repliesAmount={activeDoc.replies_no}
                            doc={doc}
                        />
                    })
                )}
            </ul>
        </div>
    )
}

export default Documents