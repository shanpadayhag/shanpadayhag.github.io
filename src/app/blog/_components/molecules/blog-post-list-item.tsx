import dateUtil from '@/lib/core/date-util';
import Link from 'next/link';

type BlogPostListItemProps = {
    link: string;
    datetime: Date;
    title: string;
    image: string;
    description: string;
};

const BlogPostListItem = (props: BlogPostListItemProps) => (
    <div className="changelog-article flex flex-col gap-6 py-12 sm:gap-8">
        <div className="w-full shrink-0 space-y-4">
            <p className="article-publish-date text-base font-medium text-secondary-500">
                <time dateTime={dateUtil.toDateSortableFormat(props.datetime)}>
                    {dateUtil.toBlogPostItemDatetimeFormat(props.datetime)}
                </time>
            </p>

            <Link href={props.link} className='block'>
                <h3 className="article-title text-2xl font-bold text-secondary-900 space-x-2.5 sm:text-3xl">
                    <span>{props.title}</span>
                </h3>
            </Link>
        </div>

        <div className="flex-1 space-y-5">
            <Link href={props.link} className='aspect-w-2 aspect-h-1 block overflow-hidden shadow rounded-2xl'>
                <img alt={props.title} src={props.image} className="h-full w-full object-cover transition-all duration-200 hover:scale-110" />
            </Link>

            <div className="flex flex-wrap gap-2"></div>

            <Link href={props.link} className='block'>
                <p className="article-excerpt text-base font-normal text-secondary-600">
                    {props.description}
                </p>
            </Link>

            <p className="flex text-sm font-semibold uppercase tracking-widest text-secondary-900 hover:text-primary-500">
                <Link href={props.link} className='inline-flex items-center'>
                    Read More<svg className="h-4 w-4 transform transition-all duration-100 ml-2 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
            </p>
        </div>
    </div>
);

export default BlogPostListItem;
