import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

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
            description: "A small summary of what the article is about.",
            required: true,
        },
        image: {
            type: "string",
            description: "The hero image of the article.",
            required: true,
        },
        date: {
            type: 'date',
            description: 'The date of the article.',
            required: true,
        },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (article) => `/articles/${article._raw.flattenedPath}`,
        },
    },
}));


export default makeSource({
    contentDirPath: 'articles',
    documentTypes: [Article],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: 'one-dark-pro',
                    onVisitLine(node) {
                        // Prevent lines from collapsing in `display: grid` mode, and allow empty
                        // lines to be copy/pasted
                        if (node.children.length === 0) {
                            node.children = [{ type: 'text', value: ' ' }];
                        }
                    },
                    onVisitHighlightedLine(node) {
                        node.properties.className.push('line--highlighted');
                    },
                    onVisitHighlightedWord(node) {
                        node.properties.className = ['word--highlighted'];
                    },
                },
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['anchor'],
                    },
                },
            ],
        ],
    },
})