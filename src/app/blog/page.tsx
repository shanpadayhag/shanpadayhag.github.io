import BlogPostListItem from '@/app/blog/_components/molecules/blog-post-list-item';
import BlurFade from '@/components/atoms/blur-fade';
import { Separator } from '@/components/atoms/separator';
import env from '@/configs/environments/env';

export const metadata = {
    title: "Blog",
    description: "My thoughts on software development, life, and more.",
};

export default () => {
    return (
        <section>
            <BlurFade delay={env.delay}>
                <h1 className="whitespace-pre-wrap text-4xl font-bold text-secondary-900 sm:text-5xl lg:text-6xl">Shan's Blog</h1>
                <h2 className="whitespace-pre-wrap text-xl font-normal text-secondary-600 mt-4">Where I share my journey, insights, and tips on software development, full-stack engineering, and emerging tech trends</h2>
            </BlurFade>

            <BlurFade delay={env.delay * 2 + 1 * 0.05}>
                <BlogPostListItem
                    link="/blog/learning-nextjs-and-typescript"
                    datetime={new Date("2024-11-30")}
                    title='Learning Next.js and TypeScript: My Experience'
                    image='https://lh3.googleusercontent.com/d/16v6K7zA2st_agai6j8vePrKTuc4Zg_P8'
                    description="Dive into my experience mastering Next.js and TypeScript, showcasing expertise in SEO optimization, clean coding, and robust application development." />
            </BlurFade>

            <BlurFade delay={env.delay * 2 + 1 * 0.05}>
                <BlogPostListItem
                    link="/blog/my-journey-to-becoming-a-software-engineer"
                    datetime={new Date("2024-11-13")}
                    title='My Journey to Becoming a Software Engineer'
                    image='https://lh3.googleusercontent.com/d/1v5NHqZAKeZ9diQmPBpJPoMYEifeZ2YvM'
                    description="Curious about the path to becoming a software engineer? Explore my personal journey, from my background and initial inspiration to the steps I've taken to learn and evolve in this dynamic field. Join me as I share insights that connect my experiences with aspiring developers and tech enthusiasts." />
            </BlurFade>
        </section>
    );
};
