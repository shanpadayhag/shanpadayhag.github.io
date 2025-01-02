import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { Home, Mail, Notebook, Globe, Smartphone } from 'lucide-react';

const env = {
    name: "Shan Padayhag",
    initials: "SP",
    avatarURL: "https://lh3.googleusercontent.com/d/1t3_MTe0UIhX392JwzF8k-SFpQpPQjcI5",
    url: "https://shanpadayhag.github.io",
    delay: 0.04,
    navbar: [
        { href: "/", icon: Home, label: "Home" },
        { href: "/blog", icon: Notebook, label: "Blog" },
    ],
    workExperiences: [
        {
            company: "Mabizza IT Solutions",
            badges: [],
            location: "Remote",
            title: "Software Engineer",
            logoUrl: "/atomic.png",
            start: "September 2022",
            end: "July 2024",
            description:
                "At Mabizza IT Solutions, which rebranded from Whitelide Solutions, I transitioned to the role of Software Engineer. With a larger team of senior software engineers and front-end developers, I've had the opportunity to enhance my skills by learning from experienced colleagues. I’m currently working on an enterprise-level lottery management system for the government-backed Small Town Lottery (STL) operation, further improving my back-end development and system optimization abilities.",
        },
        {
            company: "CyTech International",
            href: "https://cytechint.com",
            badges: [],
            location: "Internship",
            title: "Cyber Security Operation Center Analyst Tier 1 Intern",
            logoUrl: "https://media.licdn.com/dms/image/v2/D560BAQHM2Kk19OIjJw/company-logo_100_100/company-logo_100_100/0/1708672877625/cytechinternational_logo?e=1738800000&v=beta&t=G_02GBeWKctE8BC3vjJsDhcZi4ia_LuG36wjb4QcNs0",
            start: "August 2023",
            end: "November 2023",
            description:
                "During my internship at CyTech International, I worked as a Tier 1 CSOC Analyst, where I monitored cybersecurity threats and executed incident response protocols. I expanded my skill set with hands-on experience in network security and performed Android mobile penetration testing, beyond the scope of my primary role.",
        },
        {
            company: "Whitelide Solutions",
            badges: [],
            location: "Remote",
            title: "Lead Developer",
            start: "May 2021",
            end: "September 2022",
            description:
                "At Whitelide Solutions, I led full-stack development efforts in a dynamic startup environment, building scalable web and mobile applications. I gained expertise in software engineering, database management, DevOps, and system architecture, while enhancing team workflows and contributing to product development across various projects.",
        },
    ],
    education: [
        {
            school: "Xavier University - Ateneo de Cagayan",
            href: "https://www.xu.edu.ph",
            degree: "Bachelor of Science in Computer Science",
            logoUrl: "https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/365067679_666954685478962_1160893988330137018_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=jN5WDjpk3nAQ7kNvgGhDche&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_gid=AJn6scMEcexxtGZl2XytsJr&oh=00_AYAcNq_A5T5q1pFVo2EnC3DMD8x6lOjGfvtVBQYP_CYTow&oe=672E6AC6",
            start: "2019",
            end: "2024",
        },
    ],
    skills: [
        "React.js",
        "Next.js",
        "Typescript",
        "Node.js",
        "MySQL",
        "MongoDB",
        "Docker",
        "Object Oriented Design",
        "CI/CD",
        "Test Driven Development",
    ],
    projects: [
        {
            title: "Eventify",
            dates: "Sep 2024 - Present",
            active: true,
            description:
                "Eventify is a comprehensive event management system developed using Angular for its robust framework and Tailwind CSS for its modern and responsive design capabilities. This project is structured to offer modularity and scalability, making it easy for developers to customize and expand its features.",
            technologies: [
                "AngularJS 19",
                "Spring Boot 3.4.0",
                "MySQL",
                "TailwindCSS",
            ],
            links: [],
            image: "https://lh3.googleusercontent.com/d/1n3B5juAweYuvLmmQIOhr1anIoLhIxT24",
        },
        {
            title: "Hotel Management System",
            dates: "Sep 2024 - Present",
            active: true,
            description:
                "A comprehensive hotel management system designed to streamline operations, covering front-desk operations, reservations, room assignments, guest information and billing processes. Additionally, it features an integrated Point of Sale (POS) system for managing restaurant transactions, providing a seamless experience for guests and hotel staff.",
            technologies: [
                "Laravel 11",
                "PHP 8.3",
                "MySQL",
                "Next.js",
                "TypeScript",
                "TailwindCSS",
            ],
            links: [
                {
                    type: "Website",
                    href: 'https://attywsm.com',
                    icon: <Globe className="size-3" />,
                },
            ],
            href: 'https://attywsm.com',
            image: "https://lh3.googleusercontent.com/d/1xuUmW7jAHd3IgxCX95cJ2OlI4_cQnxqG",
        },
        {
            title: "Prowess Homeowner Portal",
            dates: "Jun 2024 - Sep 2024",
            active: true,
            description:
                "With the need for seamless communication in property management, I designed a homeowner view within the system, allowing property owners to access reports directly, anytime and anywhere. This feature empowers homeowners with real-time insights into their properties while reducing the reporting workload for property managers, streamlining operations and improving transparency.",
            technologies: [
                "Laravel 11",
                "PHP 8.3",
                "MySQL",
                "Next.js",
                "TypeScript",
                "TailwindCSS",
            ],
            links: [
                {
                    type: "Website",
                    href: 'https://homeowner.prowessproperty.ca/login',
                    icon: <Globe className="size-3" />,
                },
            ],
            href: 'https://homeowner.prowessproperty.ca/login',
            image: "https://lh3.googleusercontent.com/d/1pTb_cv7ahpJ5UscmZZG61ge8yghsm4jP",
        },
        {
            title: "Property Management System",
            dates: "May 2023 - Feb 2024",
            active: true,
            description:
                "With the increasing complexity of managing multiple properties, I developed a SaaS property management system that allows owners to list and organize reservations seamlessly. This system helps streamline processes, providing a centralized platform for tracking bookings across various properties. It also features report generation, saving valuable time and making property management more efficient.",
            technologies: [
                "Laravel 10",
                "PHP 8.3",
                "MySQL",
                "React.js",
                "TypeScript",
                "TailwindCSS",
            ],
            links: [
                {
                    type: "Website",
                    href: 'https://pms.prowessproperty.ca/login',
                    icon: <Globe className="size-3" />,
                },
            ],
            href: 'https://pms.prowessproperty.ca/login',
            image: "https://lh3.googleusercontent.com/d/1duYaFOuRocrgqdO9OwtvjnsnoytWT0lz",
        },
        {
            title: "STL Mobile",
            dates: "Sep 2022 - Jul 2024",
            active: true,
            description:
                "STL Mobile is the application designed for Small Town Lottery (STL) Tellers, who play a crucial role in managing client bets. Through the app, tellers enter client bets directly and handle any necessary requests for ticket cancellations. This streamlined tool supports STL operations, ensuring tellers can efficiently process transactions and provide a smooth betting experience for clients.",
            technologies: [
                "React.js",
                "TypeScript",
                "Ionic 7",
            ],
            links: [],
            image: "https://lh3.googleusercontent.com/d/1PkqyWxfsJJ2vfmbohVa52q8KuTOJQxv6",
        },
        {
            title: "STL Dashboard",
            dates: "Sep 2022 - Jul 2024",
            active: true,
            description:
                "The STL Dashboard is the admin control center for Small Town Lottery (STL) Operations, providing essential tools for managing lottery activities. This is where game settings are configured, winning numbers are set, and ticket review and cancellation requests are processed. Designed for smooth and secure STL operations, the dashboard ensures admins have everything they need to oversee and adjust game parameters effectively.",
            technologies: [
                "Laravel 10",
                "PHP",
                "Bootstrap 3",
                "MySQL",
                "MongoDB",
                "Redis",
                "Docker",
            ],
            links: [],
            image: "https://lh3.googleusercontent.com/d/1nLDlzJtWZ7iKOCLhYth6o-8f9Iz8UeAA",
        },
        {
            title: "Lendster Online Dashboard",
            dates: "May 2021 - Sep 2022",
            active: false,
            description:
                "The Lendster Dashboard serves as the admin control center for the Lendster mobile application. This is where essential admin tasks are managed, such as approving loans, reviewing applications, and overseeing other critical operations.",
            technologies: [
                "Laravel 5",
                "PHP",
                "MySQL",
                "Redis",
            ],
            links: [],
            image: "https://lh3.googleusercontent.com/d/1m0QOIRoyXDcrYzgu1rJcigLM5XZVs2vX",
        },
        {
            title: "Lendster Online Mobile",
            dates: "May 2021 - Sep 2022",
            active: false,
            description:
                "Lendster Mobile is the core of the Lendster platform, designed for users to create accounts, apply for loans, and manage their profiles. It streamlines the entire loan application process, offering a user-friendly interface to make accessing lending services simple and efficient.",
            technologies: [
                "React Native",
                "TypeScript",
            ],
            links: [],
            image: "https://lh3.googleusercontent.com/d/1GmaXysqMDaVAPfEfAbvvVFN9tZzXp5yw",
        },
    ],
    contact: {
        email: "shanpadayhag@gmail.com",
        tel: "(+63) 976 387 9418",
        social: {
            GitHub: {
                name: "GitHub",
                url: "https://github.com/shanpadayhag",
                icon: GitHubLogoIcon,
                navbar: true,
            },
            LinkedIn: {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/shanpadayhag/",
                icon: LinkedInLogoIcon,
                navbar: true,
            },
            email: {
                name: "Send Email",
                url: "#",
                icon: Mail,
                navbar: false,
            },
        },
    },
};

export default env;
