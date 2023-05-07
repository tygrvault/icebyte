import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Article = defineDocumentType(() => ({
    name: 'Article',
    filePathPattern: `**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: {
            type: 'string',
            description: 'The title of the article.',
            required: true,
        },
        summary: {
            type: "string",
            description: "A small summary of what the article is about",
            required: true,
        },
        image: {
            type: "string",
            description: "The hero image of the post",
            required: true,
        },
        date: {
            type: 'date',
            description: 'The date of the post',
            required: true,
        },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (post) => `/articles/${post._raw.flattenedPath}`,
        },
    },
}));


export default makeSource({
    contentDirPath: 'articles',
    documentTypes: [Article],
})