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
                                    { type: 'contact' },
                                    { type: 'cookies' },
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
                                description: 'e.g. https://google.com or mailto:example@gmail.com',
                                validation: Rule => Rule.uri({
                                    scheme: ['http', 'https', 'mailto', 'tel']
                                }).required().error('Enter a valid link address'),
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