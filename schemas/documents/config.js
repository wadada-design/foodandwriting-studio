import { MdSettings } from 'react-icons/md'

export default {
    title: 'Global config',
    name: 'config',
    type: 'document',
    fieldsets: [
        {
            title: 'Site config',
            name: 'siteConfig'
        },
        {
            title: 'Social',
            name: 'social',
        }
    ],
    fields: [
        {
            title: 'Site title',
            name: 'siteTitle',
            type: 'string',
            fieldset: 'siteConfig',
            validation: Rule => Rule.required().error('Missing site title')
        },
        {
            title: 'Title template',
            name: 'titleTemplate',
            type: 'string',
            fieldset: 'siteConfig',
            description: 'Template for page titles. %PAGETITLE% is required. You can also use %SITETITLE%',
            validation: Rule => [
                Rule.custom(str => str ? (str.includes('%PAGETITLE%') ? true : '%TITLE% missing from the format') : 'Required')
            ]
        },
        {
            title: 'Site Description',
            name: 'siteDecsription',
            type: 'text',
            fieldset: 'siteConfig',
            description: 'Max characters 160. You can use %SITETITLE%',
            rows: 2,
            validation: Rule => [
                Rule.max(160).error('Too many characters')
            ]
        },
        {
            title: 'Instagram handle',
            name: 'instagramHandle',
            type: 'string',
            fieldset: 'social',
            validation: Rule => Rule.required().error('Missing instagram handle')
        },
        {
            title: 'Social media image',
            name: 'socialMediaImage',
            type: 'image',
            fieldset: 'social',
            description: 'Image used when sharing the site to social media (posts will use their featured image when shared)',
        },

    ],
    preview: {
        select: {
            title: 'seoDescription',
        },
        prepare(select) {
            return {
                title: 'Global Config',
                media: MdSettings
            }
        }
    }
}