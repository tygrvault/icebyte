import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head />
            <body className='flex flex-col h-screen text-black bg-primary-100 dark:text-white dark:bg-primary-800'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
