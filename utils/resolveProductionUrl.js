import client from 'part:@sanity/base/client'

export default function resolveProductionUrl(document) {
    if (!['contact', 'about', 'post', 'cookies'].includes(document._type)) {
        return undefined
    }

    const baseUrl = client.clientConfig.dataset === 'development'
        ? 'http://localhost:8000'
        : 'https://feature-website-1-0.foodandwriting.co.uk'

    return `${baseUrl}/preview?_id=${document._id}&_type=${document._type}`
}
