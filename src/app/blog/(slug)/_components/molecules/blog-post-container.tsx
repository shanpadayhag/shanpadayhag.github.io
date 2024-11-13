import dateUtil from '@/lib/core/date-util';
import Link from 'next/link';
import React from 'react';

type BlogPostContainerProps = {
    title: string;
    publishDate: Date;
    durationToRead: string;
    children: React.ReactNode;
};

const BlogPostContainer = (props: BlogPostContainerProps) => (
    <div className=" w-full">
        <div className="space-y-1 text-left pb-8">
            <div className="col-span-2 pb-6 block">
                <Link href="/blog">← Back</Link>
            </div>

            <dl className="space-y-10">
                <div>
                    <dt className="text-mineshaft-300">Blog post <span className="text-mineshaft-300"> • {props.durationToRead} read</span></dt>
                </div>
            </dl>

            <div className="py-1">
                <h1 className="text-xl font-medium leading-9 tracking-tight text-black sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
                    {props.title}
                </h1>
            </div>

            <dl className="space-y-10">
                <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="mb-4 text-base leading-6 text-mineshaft-300">
                        <time dateTime={dateUtil.toDateSortableFormat(props.publishDate)}>
                            {dateUtil.toBlogPostItemDatetimeFormat(props.publishDate)}
                        </time>
                    </dd>
                </div>
            </dl>
        </div>

        {props.children}
    </div>
);

export default BlogPostContainer;
