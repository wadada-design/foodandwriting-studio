import { MdEmail } from 'react-icons/md'

export default {
    title: 'Contact',
    name: 'contact',
    type: 'document',
    fields: [
        {
            title: 'Content',
            name: 'content',
            type: 'portableText',
        },
    ],
    preview: {
        select: {
            title: 'content',
        },
        prepare(select) {
            return {
                title: 'Contact page',
                media: MdEmail
            }
        }
    }
}