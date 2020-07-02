import axios from 'axios'

export const commentsClient = axios.create({
    headers: {
        apiKey: process.env.SANITY_STUDIO_COMMENTS_API_KEY
    },
    baseURL: process.env.SANITY_STUDIO_COMMENTS_API_URL,
})