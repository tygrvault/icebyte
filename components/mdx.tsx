import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';

const CustomLink = (props: any) => {
    const href = props.href;

    if (href.startsWith('/')) {
        return (
            <Link href={href} {...props}>
                {props.children}
            </Link>
        );
    }

    if (href.startsWith('#')) {
        return <a {...props} />;
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props: any) {
    return <img alt={props.alt} className="rounded-md" {...props} />;
}

function Callout(props: any) {
    return (
        <div className="flex px-4 py-2 my-8 border rounded-lg bg-primary-100 dark:bg-primary-900 border-primary-200 dark:border-primary-700">
            <div className="flex items-center w-4 mr-4">{props.emoji}</div>
            <div className="w-full callout">{props.children}</div>
        </div>
    );
}

const components = {
    img: RoundedImage,
    a: CustomLink,
    Callout,
};

interface MdxProps {
    code: string;
}

export function Mdx({ code }: MdxProps) {
    const Component = useMDXComponent(code);

    return (
        <article className="prose max-w-none prose-neutral dark:prose-invert prose-headings:mb-0 prose-headings:mt-8">
            <Component components={{ ...components }} />
        </article>
    );
}