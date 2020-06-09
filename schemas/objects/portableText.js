import { GoLinkExternal, GoLink } from 'react-icons/go'

export default {
    title: 'Portable text',
    name: 'portableText',
    type: 'array',
    of: [
        {
            type: 'block',
            styles: [
                { title: 'Heading', value: 'h2' },
                { title: 'Subheading', value: 'h3' },
                { title: 'Sub subheading', value: 'h4' }
            ],
            marks: {
                annotations: [
                    {
                        title: 'Internal link',
                        name: 'internalLink',
                        type: 'object',
                        blockEditor: {
                            icon: GoLink
                        },
                        fields: [
                            {
                                name: 'link',
                                type: 'reference',
                                to: [
                                    { type: 'post' },
                                    { type: 'category' },
                                    { type: 'about' },
                                ],
                                validation: Rule => [
                                    Rule.required().error('Missing link')
                                ]
                            }
                        ]
                    },
                    {
                        title: 'External Link',
                        name: 'externalLink',
                        type: 'object',
                        blockEditor: {
                            icon: GoLinkExternal
                        },
                        fields: [
                            {
                                title: 'URL',
                                name: 'href',
                                type: 'url',
                                description: 'e.g. https://google.com',
                                validation: Rule => [
                                    Rule.uri({ allowRelative: true, scheme: ['https', 'http', 'mailto', 'tel'] }),
                                    Rule.required().error('Missing link')
                                ]
                            },
                        ]
                    }
                ]
            }
        },
        {
            title: 'Image',
            type: 'flexImages'
        },
    ],
}