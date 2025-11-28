import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { GithubIcon, Home, Mail, Notebook } from 'lucide-react';

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
      logoUrl: "https://media.licdn.com/dms/image/v2/D560BAQHM2Kk19OIjJw/company-logo_200_200/company-logo_200_200/0/1708672877625/cytechinternational_logo?e=1758153600&v=beta&t=ujDOGQpOx1t_f2ck8PcpO80Y7tOhhoYsRWqwFUMylnU",
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
      logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6GrOLsEykORCf58Jndw84S6RGM9dWx6kU0A&s",
      start: "2019",
      end: "2024",
    },
  ],
  skills: [
    "TypeScript",
    "PHP",
    "Node.js",
    "Java",
    "Rust",
    "AWS EC2",
    "AWS RDS",
    "AWS SNS",
    "AWS S3",
    "Docker",
    "Redis",
    "CI/CD Pipelines",
    "MySQL",
    "PostgreSQL",
    "NoSQL",
    "System Design",
    "Test-Driven Development",
    "Microservices",
    "SOLID Principles",
    "REST API Design",
  ],
  projects: [
    // {
    //   title: "Cloud-Native Savings Tracker",
    //   image: "https://lh3.googleusercontent.com/d/1bYYvIbPrpNaWYcMAgLhUViotf43uiSLL",
    //   dates: "July 2025 - Present",
    //   active: true,
    //   description: "A serverless savings tracker built on a microservices architecture. This project showcases modern cloud-native development practices, focusing on security, scalability, and automated testing.",
    //   technologies: [
    //     "Java 21",
    //     "Spring Boot",
    //     "AWS Lambda",
    //     "API Gateway",
    //     "DynamoDB",
    //     "JWT",
    //     "TDD",
    //   ],
    //   href: "https://github.com/shanpadayhag/savings-tracker-service-auth-handler",
    //   links: [{
    //     type: "GitHub",
    //     href: "https://github.com/shanpadayhag/savings-tracker-service-auth-handler",
    //     icon: <GithubIcon className="size-3" />
    //   }],
    // },
    // {
    //   title: "Invoice Generator",
    //   image: "https://lh3.googleusercontent.com/d/1QI-ds75pVCaQ-u4Ngu3uSHkL9K5oadNy",
    //   dates: "Jun - July 2025",
    //   active: true,
    //   description: "A backend service built to demonstrate a modern, test-driven, and containerized development workflow for a Java/Spring Boot application.",
    //   technologies: [
    //     "Java",
    //     "Spring Boot",
    //     "Apache POI",
    //     "Docker",
    //     "REST APIs",
    //   ],
    //   href: "https://github.com/shanpadayhag/invoice-generator",
    //   links: [{
    //     type: "GitHub",
    //     href: "https://github.com/shanpadayhag/invoice-generator",
    //     icon: <GithubIcon className="size-3" />
    //   }],
    // },
  ],
  contact: {
    email: "shanpadayhag@gmail.com",
    tel: "(+49) 162 1530098",
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
