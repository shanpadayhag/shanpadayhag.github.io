import BlogPostContainer from '@/app/blog/(slug)/_components/molecules/blog-post-container';
import Image from 'next/image';

export const metadata = {
    title: 'Learning Next.js and TypeScript'
};

export default () => {
    return (
        <BlogPostContainer
            title='Learning Next.js and TypeScript: My Experience'
            publishDate={new Date("2024-11-30")}
            durationToRead='12 min'>

            <div className="flex flex-row w-full pb-10">
                <div className="mr-auto">
                    <span className='box-border inline-block overflow-hidden w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0 relative max-w-full'>
                        <span className='box-border block w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0 max-w-full'>
                            <Image alt="" src="https://lh3.googleusercontent.com/d/16v6K7zA2st_agai6j8vePrKTuc4Zg_P8" className='block max-w-full w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0' width={100} height={100} />
                        </span>
                    </span>
                </div>
            </div>

            <div className="prose max-w-none pt-4 pb-8 flex flex-col gap-4">
                <h2 id="a-passion-ignited" className='text-3xl mb-2 font-semibold'>
                    <a href="#a-passion-ignited" aria-hidden="true" tabIndex={-1}>
                        <span className="icon icon-link"></span>
                    </a>Learning Next.js: My Experience
                </h2>

                <p className='text-base text-justify'>As a seasoned developer with extensive TypeScript experience, I ventured into Next.js, leveraging its SEO capabilities. This blog chronicles my journey, highlighting challenges, solutions and key takeaways. My goal was to enhance my development skills, explore SEO optimization techniques and refine coding practices.</p>

                <p className='text-base text-justify'>Learning Next.js was pivotal in my development career. Curiosity about React and React Native led me to Next.js, primarily for its SEO capabilities. My existing TypeScript expertise simplified learning Next.js basics. This foundation enabled me to build robust applications.</p>

                <p className='text-base text-justify'>Integrating TypeScript with Next.js posed challenges, particularly maintaining clean, organized code. Resolving compatibility issues and optimizing performance required careful debugging. However, overcoming these hurdles refined my problem-solving skills.</p>

                <p className='text-base text-justify'>Throughout my journey, valuable resources facilitated my learning. YouTube tutorials and conference talks provided Next.js insights, while Medium articles offered programming concepts and best practices. Stack Overflow helped resolve technical issues.</p>

                <p className='text-base text-justify'>Currently, I'm developing a hotel management system using Next.js and TypeScript. This project focuses on structuring files for cleanliness, exploring SEO techniques and refining development skills. My projects demonstrate attractive UI/UX design, SEO-optimized content and smooth user experiences.</p>

                <p className='text-base text-justify'>One notable project is a hotel marketing site, showcasing secure login features, property management and intuitive interfaces. Another project, a homeowner's portal, highlights my ability to develop complex applications.</p>

                <p className='text-base text-justify'>In conclusion, learning Next.js and TypeScript has significantly enhanced my development skills. I'm eager to apply these skills in future projects, continuing to refine my expertise. This journey showcases my adaptability, problem-solving abilities and passion for innovative technologies.</p>

                <h2 id="current-focus" className='text-3xl my-4 font-semibold'>
                    <a href="#current-focus" aria-hidden="true" tabIndex={-1}>
                        <span className="icon icon-link"></span>
                    </a>Showcase
                </h2>

                <p className='text-base text-justify'>Here are snapshots of my projects:</p>

                <h2 id="current-focus" className='text-3xl my-4 font-semibold'>
                    <a href="#current-focus" aria-hidden="true" tabIndex={-1}>
                        <span className="icon icon-link"></span>
                    </a>Project 1: Hotel Marketing Site
                </h2>

                <p className='text-base text-justify'>Here are snapshots of my projects:</p>

                <Image alt='Hotel Management Marketing Site' src="https://lh3.googleusercontent.com/d/1xuUmW7jAHd3IgxCX95cJ2OlI4_cQnxqG" width={1000} height={1000} />

                <ul className='pl-8 grid gap-2'>
                    <li>Attractive UI/UX design</li>
                    <li>SEO-optimized content</li>
                    <li>Smooth user experience</li>
                </ul>

                <h2 id="current-focus" className='text-3xl my-4 font-semibold'>
                    <a href="#current-focus" aria-hidden="true" tabIndex={-1}>
                        <span className="icon icon-link"></span>
                    </a>Project 2: Home Owner's Portal
                </h2>

                <p className='text-base text-justify'>Here are snapshots of my projects:</p>

                <Image alt="Homeowner's Portal" src="https://lh3.googleusercontent.com/d/16v6K7zA2st_agai6j8vePrKTuc4Zg_P8" width={1000} height={1000} />

                <ul className='pl-8 grid gap-2'>
                    <li>Secure login and dashboard</li>
                    <li>Property management features</li>
                    <li>Intuitive interface</li>
                </ul>
            </div>
        </BlogPostContainer>
    );
};
