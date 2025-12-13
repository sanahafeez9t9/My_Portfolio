"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Linkedin, MapPin, Calendar, ExternalLink, Heart, Sparkles, Flower2, Menu, X } from "lucide-react"
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
} from "react-icons/si"
import { FaJava } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  navigationItems,
  about,
  education,
  experience,
  projects,
  skills,
  contact,
} from "@/lib/data"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    message: z.string().min(10, "Message must be at least 10 characters."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "education", "experience", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    console.log(`Navigating to section: ${sectionId}`) // Debug log
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
      setMobileMenuOpen(false) // Close mobile menu when navigating
      setActiveSection(sectionId) // Update active section immediately
    } else {
      console.error(`Element with id '${sectionId}' not found`)
    }
  }

  const toggleMobileMenu = () => {
    console.log(`Toggling mobile menu. Current state: ${mobileMenuOpen}`) // Debug log
    setMobileMenuOpen((prev) => !prev)
  }

  // Custom VS Code Icon Component
  const VSCodeIcon = ({ className }: { className?: string }) => (
    <img src="/images/vscode-logo.png" alt="VS Code" className={`${className} object-contain`} />
  )

  const navigationItems = ["home", "about", "education", "experience", "projects", "skills", "contact"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Sana Hafeez
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigationItems.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section
                      ? "text-primary font-semibold"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleMobileMenu()
                }}
                className="text-foreground/70 hover:text-primary p-2 relative z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-card/95 backdrop-blur-md border-t overflow-hidden"
            >
              <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col space-y-4">
                  {navigationItems.map((section, index) => (
                    <motion.button
                      key={section}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        scrollToSection(section)
                      }}
                      className={`capitalize text-left py-4 px-4 rounded-lg transition-all w-full ${
                        activeSection === section
                          ? "text-primary font-semibold bg-secondary"
                          : "text-foreground/70 hover:text-primary hover:bg-muted"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${activeSection === section ? "bg-primary" : "bg-muted"}`}
                        />
                        {section}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-primary via-accent to-rose-500 bg-clip-text text-transparent">
                  Hello, I'm
                </span>
                <br />
                <span className="text-foreground">Sana Hafeez</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Software Engineering Student & Aspiring Developer
                <br />
                <span className="text-accent font-semibold">Creating beautiful digital experiences</span>
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full"
                >
                  View My Work
                </Button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="outline"
                  className="border-border text-primary hover:bg-secondary px-8 py-3 rounded-full"
                >
                  Get In Touch
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative order-first lg:order-last"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full" />
                <div className="absolute inset-4 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full" />
                <div className="absolute inset-8 bg-card rounded-full shadow-2xl overflow-hidden flex items-center justify-center">
                  <img
                    src="/images/sana-avatar.jpg"
                    alt="Sana Hafeez"
                    className="w-full h-full object-cover object-center scale-110"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 bg-card/50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-base md:text-lg text-foreground/80 mb-6 leading-relaxed">{about.description1}</p>
              <p className="text-base md:text-lg text-foreground/80 mb-8 leading-relaxed">{about.description2}</p>

              <div className="flex items-center justify-center gap-4 text-foreground/80 text-sm md:text-base">
                <MapPin className="text-primary" size={20} />
                <span>{about.location}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-card">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm md:text-xl">NUML</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg md:text-2xl text-card-foreground">
                      {education.university}
                    </CardTitle>
                    <CardDescription className="text-base md:text-lg text-card-foreground/70">
                      {education.degree}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary text-sm md:text-base">
                  <Calendar size={16} />
                  <span>{education.duration}</span>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-card-foreground mb-4">Relevant Coursework:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {education.courses.map((course, index) => (
                    <motion.div
                      key={course}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-secondary text-secondary-foreground hover:bg-muted w-full justify-center py-2 text-xs md:text-sm"
                      >
                        {course}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-20 bg-card/50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-card">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm md:text-xl">NTC</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg md:text-2xl text-card-foreground">
                      {experience.role}
                    </CardTitle>
                    <CardDescription className="text-base md:text-lg text-card-foreground/70">
                      {experience.company}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary text-sm md:text-base">
                  <Calendar size={16} />
                  <span>{experience.duration}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {experience.tasks.map((task, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`w-2 h-2 ${index % 2 === 0 ? "bg-primary" : "bg-accent"} rounded-full mt-2 flex-shrink-0`} />
                      <span className="text-card-foreground/80 text-sm md:text-base">{task}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-2xl bg-card hover:shadow-3xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg md:text-xl text-card-foreground">
                        {project.title}
                      </CardTitle>
                      <ExternalLink className="text-primary" size={20} />
                    </div>
                    <CardDescription className="text-card-foreground/70">{project.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-card-foreground/80 mb-4 text-sm md:text-base">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-border text-primary text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="py-16 md:py-20 bg-card/50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tech Stack & Certifications
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Tech Stack */}
            <div className="mb-12 md:mb-16">
              <motion.div
                className="text-center mb-8 md:mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Technologies I Work With</h3>
                <p className="text-foreground/70 text-sm md:text-base">
                  My toolkit for building amazing digital experiences
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-2xl bg-card h-full">
                    <CardHeader>
                      <CardTitle className="text-lg md:text-xl text-card-foreground flex items-center gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs md:text-sm font-bold">💻</span>
                        </div>
                        Programming Languages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {skills.languages.map((lang, index) => (
                          <motion.div
                            key={lang.name}
                            className="bg-background rounded-xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 border"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -5 }}
                          >
                            <div className="text-center">
                              <lang.icon className="text-2xl md:text-3xl mb-2 mx-auto text-foreground/70" />
                              <div className="text-xs md:text-sm font-semibold text-foreground">{lang.name}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-2xl bg-card h-full">
                    <CardHeader>
                      <CardTitle className="text-lg md:text-xl text-card-foreground flex items-center gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs md:text-sm font-bold">🛠️</span>
                        </div>
                        Developer Tools
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {skills.tools.map((tool, index) => (
                          <motion.div
                            key={tool.name}
                            className="bg-background rounded-xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 border"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -5 }}
                          >
                            <div className="text-center">
                              {tool.isCustom ? (
                                <VSCodeIcon className="w-6 h-6 md:w-8 md:h-8 mb-2 mx-auto" />
                              ) : (
                                <tool.icon className="text-2xl md:text-3xl mb-2 mx-auto text-foreground/70" />
                              )}
                              <div className="text-xs md:text-sm font-semibold text-foreground">{tool.name}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Certifications</h3>
                <p className="text-foreground/70 text-sm md:text-base">
                  Professional development and specialized training
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {skills.certifications.map((cert) => (
                  <Card key={cert.title} className="border-0 shadow-2xl bg-card">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm md:text-base">
                            {cert.title.charAt(0)}
                          </span>
                        </div>
                        <CardTitle className="text-base md:text-lg text-card-foreground">
                          {cert.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-card-foreground/80 mb-4 text-sm md:text-base">
                        {cert.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cert.technologies.map((tech) => (
                          <Badge
                            key={tech.name}
                            className="bg-secondary text-secondary-foreground hover:bg-muted flex items-center gap-1 text-xs"
                          >
                            {tech.icon && <tech.icon className="w-3 h-3" />}
                            {tech.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
            <p className="text-foreground/70 mt-6 max-w-2xl mx-auto text-sm md:text-base">
              I'm always excited to discuss new opportunities and collaborate on interesting projects. Feel free to
              reach out!
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-2xl bg-card">
              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Your Message" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={formStatus === "sending"}>
                      {formStatus === "sending" ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
                {formStatus === "success" && (
                  <p className="text-green-500 mt-4">Message sent successfully!</p>
                )}
                {formStatus === "error" && (
                  <p className="text-red-500 mt-4">Failed to send message. Please try again.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <motion.p
            className="text-sm md:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            © 2024 Sana Hafeez. Made with <Heart className="inline w-4 h-4 text-accent" /> and lots of code.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
