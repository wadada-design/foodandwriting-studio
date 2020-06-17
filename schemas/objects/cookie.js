import { MdDone } from 'react-icons/md'

export default {
    title: 'cookie',
    name: 'cookie',
    type: 'object',
    fields: [
        {
            title: 'Type',
            name: 'type',
            type: 'string',
            options: {
                list: ['Necessary', 'Analytical']
            },
            validation: Rule => [
                Rule.required().error('Missing cookie type')
            ]
        },
        {
            title: 'Name',
            name: 'name',
            type: 'string',
            validation: Rule => [
                Rule.required().error('Missing cookie name')
            ]
        },
        {
            title: 'Purpose',
            name: 'purpose',
            type: 'text',
            rows: 4,
            validation: Rule => [
                Rule.required().error('Missing cookie name')
            ]
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'type',
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle,
                media: MdDone
            }
        }
    }
}