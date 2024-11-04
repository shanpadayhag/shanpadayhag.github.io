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
            company: "Prowess Property Management Inc.",
            href: "https://prowessproperty.ca",
            badges: [],
            location: "Contract",
            title: "Freelance Developer",
            logoUrl: "data:image/jpeg;base64,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",
            start: "June 2024",
            end: "September 2024",
            description:
                "Developed a companion system for Prowess Property to enable partners to access and view relevant data, reducing the need for manual reporting. Designed with user-friendly interfaces and secure data access, the system streamlined data-sharing processes, enhancing transparency and improving collaboration with partners. This addition complemented the initial system, creating an integrated solution to support both internal operations and external partnerships.",
        },
        {
            company: "Mabizza IT Solutions",
            badges: [],
            location: "Remote",
            title: "Software Engineer",
            logoUrl: "/atomic.png",
            start: "December 2023",
            end: "July 2024",
            description:
                "Returned to Mabizza IT Solutions as a Software Engineer after a 4-month OJT break, resuming work on ongoing projects and contributing to new initiatives. Leveraged prior experience to quickly reintegrate with the team, ensuring continuity and maintaining high standards in software development and maintenance. Focused on delivering efficient solutions and supporting team goals with renewed insights gained during the OJT experience.",
        },
        {
            company: "Prowess Property Management Inc.",
            href: "https://prowessproperty.ca",
            badges: [],
            location: "Contract",
            title: "Freelance Developer",
            logoUrl: "data:image/jpeg;base64,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",
            start: "May 2023",
            end: "February 2024",
            description:
                "Developed a custom system to streamline and enhance operational processes for Prowess Property. Collaborated with stakeholders to understand business requirements and translated them into functional software solutions. Implemented efficient workflows to improve productivity and support business objectives.",
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
                "Developed a custom system to streamline and enhance operational processes for Prowess Property. Collaborated with stakeholders to understand business requirements and translated them into functional software solutions. Implemented efficient workflows to improve productivity and support business objectives.",
        },
        {
            company: "Mabizza IT Solutions",
            badges: [],
            location: "Remote",
            title: "Software Engineer",
            logoUrl: "/atomic.png",
            start: "September 2022",
            end: "August 2023",
            description:
                "Contributed to the development and maintenance of applications using React, Git, and SQL, collaborating with cross-functional teams to design and deliver solutions that met user needs. Played a key role in application development and maintenance. Worked closely with teams to analyze user needs and design, test, and develop software solutions.",
        },
        {
            company: "Whitelide Solutions",
            badges: [],
            location: "Remote",
            title: "Lead Developer",
            start: "May 2021",
            end: "September 2022",
            description:
                "Led a team in developing software solutions using TypeScript and PHP, overseeing the entire development lifecycle to ensure timely and budget-compliant delivery. Established coding standards and optimized development processes to enhance code quality and maintainability. Mentored junior developers to foster team growth and boost productivity.",
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
            links: [
                {
                    type: "Mobile App",
                    icon: <Smartphone className="size-3" />,
                },
            ],
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
            links: [
                {
                    type: "Website",
                    icon: <Globe className="size-3" />,
                },
            ],
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
            links: [
                {
                    type: "Website",
                    icon: <Globe className="size-3" />,
                },
            ],
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
            links: [
                {
                    type: "Mobile App",
                    icon: <Smartphone className="size-3" />,
                },
            ],
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
