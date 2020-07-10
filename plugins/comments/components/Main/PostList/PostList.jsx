import React, { useEffect, useState } from 'react'
import client from 'part:@sanity/base/client'

const Documents = ({ posts }) => {
    const [listedPosts, setListedPosts] = useState(null)
    // Fetch documents from sanity 
    useEffect(() => {
        if (!posts || !posts.length) {
            return
        }

        (async () => {
            const documents = await client.fetch('*[!(_id in path("drafts.**")) && _id in $posts] | order (_updatedAt desc)', { posts })
            setListedPosts(documents)
        })()
    }, [posts])

    console.log(listedPosts)

    return (
        <section>
            <h2>Posts</h2>
        </section>
    )
}

export default Documents