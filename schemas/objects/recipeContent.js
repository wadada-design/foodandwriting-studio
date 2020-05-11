import { MdShortText, MdDone } from 'react-icons/md'
import CookingTime from '../../components/CookingTime'

export default {
    title: 'Recipe content',
    name: 'recipeContent',
    type: 'object',
    fields: [
        {
            title: 'Serves',
            name: 'serves',
            type: 'number',
            validation: Rule => [
                Rule.integer().error('Must be a whole number'),
                Rule.positive().error('Must be a number greater than 0')
            ]
        },
        {
            title: 'Ready in',
            name: 'readyIn',
            type: 'string',
            inputComponent: CookingTime,
            validation: Rule => Rule.required().custom(timeStr => timeStr !== "0:0").error('Please add a cooking time')
        },
        {
            title: 'Shopping list',
            name: 'shoppingList',
            type: 'array',
            of: [
                {
                    title: 'Item',
                    type: 'shoppingListItem',
                    icon: MdDone,
                }
            ]
        },
        {
            title: 'Recipe intro',
            name: 'recipeIntro',
            type: 'portableText',
        },
        {
            title: 'Recipe steps',
            name: 'steps',
            type: 'portableText',
        },
        {
            title: 'Notes',
            name: 'recipeNotes',
            type: 'portableText',
        },
    ],
    preview: {
        select: {
        },
        prepare(select) {

            return {
                title: 'Recipe content',
                media: MdShortText
            }
        }
    }
}