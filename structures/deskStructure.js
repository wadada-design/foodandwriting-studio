import S from '@sanity/desk-tool/structure-builder'
import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'
import { MdLibraryBooks, MdSettings, MdPerson, MdEmail, MdInfo, MdCollectionsBookmark, MdHome, MdFilterNone } from 'react-icons/md'
import IframePreview from '../components/IFramePreview'

export default () =>
    S.list().title('Admin').items([

        // Homepage
        S.listItem().title('Home').icon(MdHome).child(

            // Homepage editor
            S.editor().title('Home').id('home').schemaType('home'),
        ),

        // About
        S.listItem().title('About').icon(MdPerson).child(

            // // About editor
            // S.editor().title('About').id('about').schemaType('about'),

            S.document()
                .documentId('about')
                .schemaType('about')
                .views([
                    S.view.form().icon(EditIcon),
                    S.view.component(IframePreview).icon(EyeIcon).title('Preview'),
                ])
        ),

        // Contact
        S.listItem().title('Contact').icon(MdEmail).child(

            // Contact editor
            S.editor().title('Contact').id('contact').schemaType('contact'),
        ),

        // Divider 
        S.divider(),

        // Posts
        S.listItem().title('Posts').icon(MdLibraryBooks).child(
            S.list().title('Posts').items([

                // All posts
                S.listItem().title('All posts').icon(MdLibraryBooks).child(
                    S.documentTypeList('post').title('All posts').defaultOrdering([{ field: 'postMeta.date', direction: 'desc' }])
                ),

                // Divider
                S.divider(),

                // Published
                S.listItem().title('Published').icon(MdLibraryBooks).child(
                    S.documentList().schemaType('post').title('Published posts').filter('_type == "post" && !(_id in path("drafts.**"))')
                ),

                // Drafts
                S.listItem().title('Drafts').icon(MdFilterNone).child(
                    S.documentList().schemaType('post').title('Draft posts').filter('_type == "post" && _id in path("drafts.**")')
                ),
            ])
        ),

        // By category
        S.listItem().title('Posts by category').icon(MdCollectionsBookmark).child(

            // List out all categories
            S.documentTypeList('category').title('Posts by category').child(catId =>

                // List out project documents where the _id for the selected
                S.documentList().schemaType('post').title('Posts').filter('_type == "post" && category._ref == $catId').params({ catId }).initialValueTemplates([
                    S.initialValueTemplateItem('post-in-category', { catId })
                ])
            )
        ),

        // Categories
        S.documentTypeListItem('category').title('Categories').icon(MdCollectionsBookmark),

        // Divider
        S.divider(),

        // Config
        S.listItem().title('Cookies').icon(MdInfo).child(
            S.editor().title('Cookies').id('cookies').schemaType('cookies'),
        ),

        // Config
        S.listItem().title('Global config').icon(MdSettings).child(
            S.editor().title('Global config').id('global-config').schemaType('config'),
        ),

        /**
         * Debugging
         * 
         * S.divider()
         * S.listItem().title('Everything').child(S.list().title('Everything').items([...S.documentTypeListItems()]))
         */
    ])