export default {
    title: 'Home',
    name: 'home',
    type: 'document',
    fieldsets: [
        {
            title: 'Featured recipe',
            name: 'featuredRecipe',
        },
        {
            title: 'Featured topic',
            name: 'featuredTopic',
        },
        {
            title: 'Parallax topic',
            name: 'parallaxTopic'
        },
        {
            title: 'Bottom featured post',
            name: 'bottomFeaturedPost',
        }
    ],
    fields: [
        {
            title: 'Post',
            name: 'featuredRecipe',
            type: 'reference',
            to: [{ type: 'post' }],
            options: {
                filter: 'defined(content[0].steps)'
            },
            validation: Rule => Rule.required().error('Add a featured post'),
            fieldset: 'featuredRecipe'
        },
        {
            title: 'Description',
            name: 'featuredRecipeDescription',
            type: 'text',
            rows: 5,
            validation: Rule => [Rule.required().max(160).error('Max 160 characters')],
            fieldset: 'featuredRecipe'
        },
        {
            title: 'Subtitle',
            name: 'featuredTopicSubtitle',
            type: 'string',
            fieldset: 'featuredTopic'
        },
        {
            title: 'Title',
            name: 'featuredTopicTitle',
            type: 'string',
            fieldset: 'featuredTopic'
        },
        {
            title: 'Posts',
            name: 'featuredTopicPosts',
            type: 'array',
            of: [
                {
                    title: 'Post',
                    type: 'reference',
                    to: [{ type: 'post' },]
                },
            ],
            fieldset: 'featuredTopic',
            validation: Rule => [
                Rule.unique().max(2).error('Please select 2 unique posts')
            ]
        }
    ]
}