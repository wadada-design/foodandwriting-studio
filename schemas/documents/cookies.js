import { MdInfo } from 'react-icons/md'

export default {
    title: 'Cookies',
    name: 'cookies',
    type: 'document',
    fields: [
        {
            title: 'Content',
            name: 'content',
            type: 'portableText',
        },
        {
            title: 'Cookies',
            name: 'cookies',
            type: 'array',
            of: [{ type: 'cookie' }]
        }
    ],
    preview: {
        select: {
            title: 'content',
        },
        prepare(select) {
            return {
                title: 'Cookies page',
                media: MdInfo
            }
        }
    }
}