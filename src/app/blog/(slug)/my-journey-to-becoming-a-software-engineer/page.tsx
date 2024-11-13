import BlogPostContainer from '@/app/blog/(slug)/_components/molecules/blog-post-container';
import Image from 'next/image';

export default () => {
    return (
        <BlogPostContainer
            title='My Journey to Becoming a Software Engineer'
            publishDate={new Date("2024-11-13")}
            durationToRead='7 min'>
            <div className="flex flex-row w-full pb-10">
                <div className="mr-auto">
                    <span className='box-border inline-block overflow-hidden w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0 relative max-w-full'>
                        <span className='box-border block w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0 max-w-full'>
                            <Image alt="" src="https://lh3.googleusercontent.com/d/1v5NHqZAKeZ9diQmPBpJPoMYEifeZ2YvM" className='block max-w-full w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0' width={100} height={100} />
                        </span>
                    </span>
                </div>
            </div>

            <div className="prose max-w-none pt-4 pb-8 flex flex-col gap-4">
                <h2 id="a-passion-ignited" className='text-3xl mb-2 font-semibold'>
                    <a href="#a-passion-ignited" aria-hidden="true" tabIndex={-1}>
                        <span className="icon icon-link"></span>
                    </a>A Passion Ignited
                </h2>

                <p className='text-base text-justify'>Every journey has its beginnings, and mine started with a simple curiosity about technology. Growing up, I was always intrigued by how things worked, which naturally led me to explore the world of software engineering. My journey has been filled with challenges, learning experiences, and the thrill of creating something from scratch.</p>

                <h2 id="the-birth-of-lendster" className='text-3xl my-4 font-semibold'>
                    <a href="#the-birth-of-lendster" aria-hidden="true" tabIndex={-1}>
                        <span className="icon icon-link"></span>
                    </a>The Birth of Lendster: A Learning Experience
                </h2>

                <p className='text-base text-justify'>My first significant project was a lending application called <strong>Lendster</strong>, which emerged at a time when lending applications were just starting to gain traction in the tech landscape. This project was not merely an academic exercise; it provided me with the opportunity to engage deeply with the software development process at an enterprise level. Through Lendster, I had the chance to immerse myself in the technical aspects of software engineering, including the architecture of applications. I learned to navigate the complexities of <strong>REST APIs</strong>, which allowed different software applications to communicate with each other seamlessly. As I dove into <strong>monolithic architecture</strong> and <strong>microservices</strong>, I gained a solid understanding of how these architectural styles influence the scalability and maintainability of applications. The hands-on experience with web routes, unit testing, feature testing, and design patterns not only enhanced my technical skills but also instilled a sense of confidence in my ability to contribute to real-world projects.</p>

                <p className='text-base text-justify'>One of the key strategies we implemented to enhance the performance of Lendster was the use of Redis for caching. By leveraging <strong>Redis</strong>, we were able to store frequently accessed data in memory, which significantly reduced the time it took to retrieve information. This caching strategy was crucial for improving the application's speed and responsiveness, especially as user demand grew. Redis allowed us to handle large volumes of application requests efficiently, ensuring that our database queries did not become a bottleneck. The ability to quickly access cached data meant that users experienced faster load times and a smoother interaction with the application, which is essential in a competitive market where user experience can make or break an application.</p>

                <p className='text-base text-justify'>Working on Lendster also introduced me to critical concepts such as <strong>object-oriented programming</strong>, which emphasizes the use of objects to represent data and functions. This paradigm shift in thinking helped me design software that was modular and reusable. Additionally, I delved into database engineering, learning how to structure, manage, and retrieve data efficiently. The project required me to understand client-server communication, which is fundamental to any software application. I became adept at using various database technologies, including <strong>MongoDB</strong> and <strong>MySQL</strong>, each of which offered unique advantages depending on the project requirements. This experience was instrumental in shaping my understanding of how software applications operate on a fundamental level. Furthermore, I ventured into mobile application development with Android, which broadened my horizons and gave me insights into the nuances of building applications for mobile platforms. This multifaceted experience solidified my passion for software engineering and development operations, igniting a desire to explore even deeper into the realm of technology.</p>

                <h2 id="a-test-of-perseverance" className='text-3xl my-4 font-semibold'>
                    <a href="#a-test-of-perseverance" aria-hidden="true" tabIndex={-1}>
                        <span className="icon icon-link"></span>
                    </a>Overcoming Challenges: A Test of Perseverance
                </h2>

                <p className='text-base text-justify'>One of the most challenging moments during my journey occurred when I encountered a deprecated version of Expo while developing the Lendster application. This issue halted my progress for three consecutive days, causing significant stress and sleepless nights as I grappled with the implications of being stuck. The deprecation issue presented itself as an insurmountable wall, preventing me from making any further developments on the application. This experience taught me an invaluable lesson about resilience and the importance of adaptability in the tech world. Instead of becoming overwhelmed by the immediate error, I learned to take a step back and analyze the situation critically. I realized that the key to overcoming this challenge lay not in fixating on the error itself but rather in understanding the underlying issue—the need to update the application to a more recent version of Expo.</p>

                <p className='text-base text-justify'>During those three days, I immersed myself in research, exploring forums, documentation, and tutorials that addressed similar issues faced by other developers. I discovered that the real fix required not just a surface-level understanding of the error message but a deeper knowledge of version control and dependency management. I learned how to navigate the intricacies of updating the application, which ultimately led to a breakthrough. This experience significantly strengthened my problem-solving skills and taught me the importance of perseverance in the face of adversity. It was a humbling experience that reinforced my belief in the value of exploring problems beyond what is immediately apparent, and it ultimately became a pivotal moment in my development as a software engineer.</p>

                <h2 id="a-guiding-light" className='text-3xl my-4 font-semibold'>
                    <a href="#a-guiding-light" aria-hidden="true" tabIndex={-1}>
                        <span className="icon icon-link"></span>
                    </a>Mentorship: A Guiding Light
                </h2>

                <p className='text-base text-justify'>Throughout my journey, I was fortunate to have a mentor who profoundly influenced my career trajectory.&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://ph.linkedin.com/in/joshuapaylaga" className='font-bold'>Joshua Paylaga</a>, the CEO of Mabizza IT Solutions and Whitelide Solutions, played a pivotal role in my development as a software engineer. Our paths crossed when we were both involved in a startup called Whitelide Solutions, where Joshua’s vision and expertise inspired me to push my boundaries. At that time, I was still a second-year college student, eager to learn and contribute to the burgeoning tech startup scene. Joshua was a talented senior software engineer at incube8 ltd., and his decision to launch a startup was both ambitious and inspiring. I was drawn to his passion and commitment to building something meaningful, and I decided to join him in this venture.</p>

                <p className='text-base text-justify'>Working alongside Joshua was an invaluable experience that allowed me to learn from his wealth of knowledge. I dedicated countless hours to the startup, often going above and beyond my assigned tasks, driven by an insatiable desire to learn. The hands-on experience I gained during this time was unparalleled; I was exposed to the full spectrum of software development, from brainstorming sessions to deployment. Joshua’s mentorship was characterized by his willingness to share insights and provide constructive feedback, which helped me refine my skills and develop a professional mindset. I remember promising him that before I left the company, I would ensure it was thriving. As I look back on my time at Whitelide Solutions, I am proud to say that I upheld that promise, and I carry the lessons learned from Joshua with me as I continue my journey in software engineering.</p>

                <h2 id="resources-for-growth" className='text-3xl my-4 font-semibold'>
                    <a href="#resources-for-growth" aria-hidden="true" tabIndex={-1}>
                        <span className="icon icon-link"></span>
                    </a>Resources for Growth: Learning Never Stops
                </h2>

                <p className='text-base text-justify'>To enhance my skills, I relied heavily on various resources. Documentation for the tools I used, insightful Medium posts, and community support from platforms like Stack Overflow were instrumental in my learning process. These resources not only helped me troubleshoot issues but also kept me updated on industry trends and best practices.</p>

                <h2 id="current-focus" className='text-3xl my-4 font-semibold'>
                    <a href="#current-focus" aria-hidden="true" tabIndex={-1}>
                        <span className="icon icon-link"></span>
                    </a>Current Focus: Continuous Improvement
                </h2>

                <p className='text-base text-justify'>After over three years in the field, I feel a sense of accomplishment, yet I recognize that there is always more to learn. Currently, I am focused on developing efficient functions and expanding my skill set. I plan to delve into Java and Spring Boot to diversify my expertise and explore different front-end frameworks beyond React.</p>

                <h2 id="future-aspirations" className='text-3xl my-4 font-semibold'>
                    <a href="#future-aspirations" aria-hidden="true" tabIndex={-1}>
                        <span className="icon icon-link"></span>
                    </a>Future Aspirations: Building My Own SaaS Product
                </h2>

                <p className='text-base text-justify'>As I look to the future, my long-term goal as a software engineer is shrouded in a bit of mystery. I am currently immersed in a project that I believe holds incredible potential—a Software as a Service (SaaS) product that aims to transform a specific industry. While I can’t reveal too much just yet, I can say that it's something I’m passionate about, and I’m excited about what lies ahead. If you’re curious and want to discuss it further, I’d be more than happy to share more details.</p>
            </div>

        </BlogPostContainer>
    );
};
