
import {
    SiPython,
    SiJavascript,
    SiCplusplus,
    SiHtml5,
    SiCss3,
    SiMysql,
    SiCisco,
    SiGooglecolab,
    SiAndroidstudio,
    SiMongodb,
    SiExpress,
    SiAngular,
    SiNodedotjs,
    SiFigma,
    SiAdobexd,
    SiJava,
  } from "react-icons/si";
  import { FaJava } from "react-icons/fa";

  export const navigationItems = ["home", "about", "education", "experience", "projects", "skills", "contact"];

  export const about = {
    description1: "I'm a passionate Software Engineering student at the National University of Modern Languages, currently pursuing my Bachelor's degree. With a strong foundation in programming and a keen interest in creating innovative solutions, I'm dedicated to building beautiful and functional digital experiences.",
    description2: "My journey in technology has been enriched by hands-on experience as a Software Engineer Intern at NTC Islamabad, where I worked on network infrastructure and gained valuable industry insights.",
    location: "Nawanshehr Tehsil & District Abbottabad, Pakistan",
  };

  export const education = {
    university: "National University of Modern Languages",
    degree: "Bachelor of Science in Software Engineering",
    duration: "Sep 2021 – May 2026",
    courses: [
      "Data Structures and Algorithms",
      "Operating System",
      "Object Oriented Programming",
      "DBMS",
      "Internet Technology",
      "AI",
      "Software Methodology",
      "Computer Architecture",
      "Algorithm Analysis",
    ],
  };

  export const experience = {
    company: "NTC Islamabad",
    role: "Software Engineer Intern",
    duration: "June 2022 – August 2022",
    tasks: [
      "Assisted in configuring and maintaining routers, switches, and firewalls.",
      "Monitored network performance and uptime using standard tools.",
      "Troubleshot LAN/WAN issues under senior supervision.",
    ],
  };

  export const projects = [
    {
      title: "Student Management System",
      date: "Jan 2024",
      description: "Developed a comprehensive web application for managing student records with responsive UI for registration, course assignments, and attendance tracking.",
      technologies: ["HTML", "CSS", "JavaScript", "Python"],
    },
    {
      title: "WireGuard VPN System",
      date: "Nov 2024",
      description: "Implemented a secure VPN solution using WireGuard with Python automation for tunnel configuration and performance optimization.",
      technologies: ["Cisco", "Python", "WireGuard", "Networking"],
    },
  ];

  export const skills = {
    languages: [
      { name: "Python", icon: SiPython },
      { name: "Java", icon: FaJava },
      { name: "C++", icon: SiCplusplus },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
      { name: "SQL", icon: SiMysql },
    ],
    tools: [
      { name: "VS Code", isCustom: true },
      { name: "Cisco Packet Tracer", icon: SiCisco },
      { name: "Google Colab", icon: SiGooglecolab },
      { name: "Android Studio", icon: SiAndroidstudio },
    ],
    certifications: [
      {
        title: "MEAN Stack Development",
        description: "Built full-stack applications using MongoDB, Express.js, Angular, and Node.js. Learned RESTful API design, NoSQL databases, and front-end/backend integration.",
        technologies: [
          { name: "MongoDB", icon: SiMongodb },
          { name: "Express.js", icon: SiExpress },
          { name: "Angular", icon: SiAngular },
          { name: "Node.js", icon: SiNodedotjs },
        ],
      },
      {
        title: "UI/UX Design",
        description: "Studied user-centered design principles, usability testing, and modern design trends. Created wireframes and interactive prototypes using industry-standard tools.",
        technologies: [
          { name: "Figma", icon: SiFigma },
          { name: "Adobe XD", icon: SiAdobexd },
          { name: "Prototyping" },
          { name: "User Research" },
        ],
      },
    ],
  };

  export const contact = {
    phone: "+92 314 3707610",
    email: "sanahafeez8oct@gmail.com",
    linkedin: "linkedin.com/in/sanahafeez",
  };
