import axios from 'axios'

export const netlifyClient = axios.create({
    headers: {
        Authorization: `Bearer ${process.env.SANITY_STUDIO_NETLIFY_TOKEN}`
    },
    baseURL: 'https://api.netlify.com/api/v1/',
})