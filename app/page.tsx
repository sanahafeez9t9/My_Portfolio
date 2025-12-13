"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  Phone,
  Linkedin,
  Instagram,
  MapPin,
  Calendar,
  ExternalLink,
  Heart,
  Sparkles,
  Flower2,
  Menu,
  X,
  Send,
  Github,
  Palette,
  Star,
  Wand2,
  MousePointer2,
  Megaphone,
  PenTool,
  Loader2,
} from "lucide-react"
import {
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiHtml5,
  SiCss3,
  SiMongodb,
  SiFigma,
  SiAdobexd,
  SiCanva,
  SiAdobephotoshop,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"
import instagramEmbeds from "@/lib/instagram-embeds.json"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
  const [activeInstagramIndex, setActiveInstagramIndex] = useState(0)
  const [isInstagramHovered, setIsInstagramHovered] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Load Instagram embed script once so blockquotes render as embeds
    if (typeof window === "undefined") return

    const scriptId = "instagram-embed-script"
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null

    if (existing) {
      ;(window as any).instgrm?.Embeds?.process()
      return
    }

    const script = document.createElement("script")
    script.id = scriptId
    script.src = "https://www.instagram.com/embed.js"
    script.async = true
    script.onload = () => {
      ;(window as any).instgrm?.Embeds?.process()
    }
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    // Re-process embeds when the active Instagram slide changes
    if (typeof window === "undefined") return
    ;(window as any).instgrm?.Embeds?.process()
  }, [activeInstagramIndex])

  useEffect(() => {
    if (instagramEmbeds.length <= 1) return
    if (isInstagramHovered) return

    const interval = setInterval(() => {
      setActiveInstagramIndex((prev) => (prev + 1) % instagramEmbeds.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isInstagramHovered])

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "education",
        "experience",
        "projects",
        "instagram",
        "skills",
        "contact",
      ]
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
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setMobileMenuOpen(false)
      setActiveSection(sectionId)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("sending")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("https://formsubmit.co/ajax/sanahafeez8oct@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })

      if (response.ok) {
        setFormStatus("sent")
        form.reset()
        setTimeout(() => setFormStatus("idle"), 3000)
      } else {
        setFormStatus("error")
        setTimeout(() => setFormStatus("idle"), 3000)
      }
    } catch {
      setFormStatus("error")
      setTimeout(() => setFormStatus("idle"), 3000)
    }
  }

  const VSCodeIcon = ({ className }: { className?: string }) => (
    <img src="/images/vscode-logo.png" alt="VS Code" className={`${className} object-contain`} />
  )

  const navigationItems = [
    "home",
    "about",
    "education",
    "experience",
    "projects",
    "instagram",
    "skills",
    "contact",
  ]

  // Focus areas for creative fields
  const focusAreas = [
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating intuitive user experiences",
      color: "from-pink-400 to-rose-500",
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description: "Strategic online brand presence",
      color: "from-purple-400 to-violet-500",
    },
    {
      icon: PenTool,
      title: "Graphic Design",
      description: "Visual storytelling & branding",
      color: "from-fuchsia-400 to-pink-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-x-hidden">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated gradient blobs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-300/40 to-rose-400/30 rounded-full blur-3xl animate-blob"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-20 w-96 h-96 bg-gradient-to-br from-purple-300/30 to-fuchsia-400/20 rounded-full blur-3xl animate-blob"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute -bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-rose-300/30 to-pink-400/20 rounded-full blur-3xl animate-blob"
          animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 4 }}
        />

        {/* Floating flowers and elements */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-20 left-[10%] text-pink-300/50 animate-float"
              style={{ animationDelay: "0s" }}
            >
              <Flower2 size={45} />
            </motion.div>
            <motion.div
              className="absolute top-40 right-[15%] text-purple-300/40 animate-float-reverse"
              style={{ animationDelay: "1s" }}
            >
              <Sparkles size={35} />
            </motion.div>
            <motion.div
              className="absolute top-[60%] left-[5%] text-rose-300/40 animate-float"
              style={{ animationDelay: "2s" }}
            >
              <Heart size={30} />
            </motion.div>
            <motion.div
              className="absolute top-[30%] right-[8%] text-fuchsia-300/30 animate-float-reverse"
              style={{ animationDelay: "3s" }}
            >
              <Star size={28} />
            </motion.div>
            <motion.div
              className="absolute bottom-[30%] left-[20%] text-pink-300/40 animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <Wand2 size={32} />
            </motion.div>
            <motion.div
              className="absolute bottom-[20%] right-[25%] text-purple-300/35 animate-float-reverse"
              style={{ animationDelay: "2.5s" }}
            >
              <MousePointer2 size={26} />
            </motion.div>
            <motion.div className="absolute top-[45%] left-[40%] text-rose-200/30 animate-sparkle">
              <Sparkles size={20} />
            </motion.div>
            <motion.div
              className="absolute top-[70%] right-[40%] text-pink-200/25 animate-sparkle"
              style={{ animationDelay: "1s" }}
            >
              <Star size={18} />
            </motion.div>
          </>
        )}

        {/* Mobile simplified background */}
        {isMobile && (
          <>
            <motion.div className="absolute top-20 left-4 text-pink-300/30 animate-float">
              <Flower2 size={28} />
            </motion.div>
            <motion.div className="absolute top-40 right-4 text-purple-300/25 animate-float-reverse">
              <Sparkles size={22} />
            </motion.div>
            <motion.div className="absolute bottom-40 left-8 text-rose-300/25 animate-float">
              <Heart size={20} />
            </motion.div>
          </>
        )}
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-pink-100/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-xl md:text-2xl font-bold font-[var(--font-playfair)]"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Sana Hafeez
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigationItems.map((section) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`relative px-4 py-2 capitalize text-sm font-medium rounded-full transition-all ${
                    activeSection === section ? "text-pink-600" : "text-gray-600 hover:text-pink-500"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeSection === section && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-pink-100/80 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {section}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-pink-100/80 text-pink-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-pink-100/50 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
                {navigationItems.map((section, index) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`w-full text-left px-4 py-3 rounded-xl capitalize font-medium transition-all ${
                      activeSection === section
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                        : "text-gray-600 hover:bg-pink-50"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {section}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <motion.div style={{ y }} className="absolute inset-0 z-0" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              className="text-center lg:text-left order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100/80 rounded-full text-pink-600 text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles size={16} className="animate-sparkle" />
                Welcome to my creative space
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight font-[var(--font-playfair)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-gray-800">Hi, I'm</span>
                <br />
                <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
                  Sana Hafeez
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                UI/UX Designer | Digital Marketing Enthusiast
                <br />
                <span className="text-pink-500 font-semibold">Crafting beautiful digital experiences</span>
              </motion.p>

              <motion.p
                className="text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Passionate about creating stunning visuals, intuitive interfaces, and strategic digital solutions that
                make a lasting impact.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-6 rounded-full text-base font-medium shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/30 transition-all"
                >
                  <Palette className="mr-2" size={18} />
                  View My Work
                </Button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="outline"
                  className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-6 rounded-full text-base font-medium"
                >
                  <Mail className="mr-2" size={18} />
                  Let's Connect
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex gap-4 mt-8 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.a
                  href="https://github.com/sanahafeez9t9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-gray-600 hover:text-pink-500 transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={22} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/sana-hafeez-839599361/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-gray-600 hover:text-pink-500 transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={22} />
                </motion.a>
                <motion.a
                  href="mailto:sanahafeez8oct@gmail.com"
                  className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-gray-600 hover:text-pink-500 transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={22} />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              className="relative order-1 lg:order-2 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Decorative rings */}
                <motion.div
                  className="absolute inset-0 border-2 border-dashed border-pink-300/50 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-4 border-2 border-dashed border-purple-300/40 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Glow effect */}
                <div className="absolute inset-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 blur-2xl animate-pulse-glow" />

                {/* Main image container */}
                <motion.div
                  className="absolute inset-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full shadow-2xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src="/images/pic.jpg" alt="Sana Hafeez" className="w-full h-full object-cover object-top" />
                </motion.div>

                {/* Floating decorations */}
                <motion.div
                  className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-white p-3 rounded-full shadow-xl"
                  animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Palette className="text-pink-500" size={isMobile ? 18 : 24} />
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-white p-3 rounded-full shadow-xl"
                  animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Heart className="text-rose-500" size={isMobile ? 18 : 24} />
                </motion.div>
                <motion.div
                  className="absolute top-1/2 -right-4 md:-right-8 bg-white p-2 md:p-3 rounded-full shadow-xl"
                  animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                  transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="text-purple-500" size={isMobile ? 16 : 20} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-pink-300 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-3 bg-pink-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-pink-500 font-medium mb-2 block">Get to know me</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[var(--font-playfair)] text-gray-800">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              className="glass rounded-3xl p-8 md:p-12 shadow-xl mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-600 mb-6 leading-relaxed text-center md:text-left">
                I'm a passionate <span className="text-pink-500 font-semibold">Software Engineering student</span> at
                the National University of Modern Languages with a creative soul. While I'm equipped with technical
                skills, my heart lies in the world of{" "}
                <span className="text-purple-500 font-semibold">design and digital creativity</span>.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed text-center md:text-left">
                I believe in the power of beautiful design to transform user experiences. My journey combines technical
                knowledge with artistic vision, allowing me to create digital experiences that are both functional and
                visually stunning.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600">
                <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full">
                  <MapPin className="text-pink-500" size={18} />
                  <span className="text-sm">Abbottabad, Pakistan</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
                  <Mail className="text-purple-500" size={18} />
                  <span className="text-sm">sanahafeez8oct@gmail.com</span>
                </div>
              </div>
            </motion.div>

            {/* Focus Areas */}
            <div className="grid md:grid-cols-3 gap-6">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 h-full group">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <area.icon className="text-white" size={28} />
                      </motion.div>
                      <h3 className="font-bold text-gray-800 mb-2 text-lg">{area.title}</h3>
                      <p className="text-gray-500 text-sm">{area.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 md:py-28 bg-gradient-to-b from-white/50 to-pink-50/50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-pink-500 font-medium mb-2 block">My journey</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[var(--font-playfair)] text-gray-800">Education</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500" />
              <CardHeader className="pb-4 pt-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  >
                    <span className="text-white font-bold text-xl">NUML</span>
                  </motion.div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl text-gray-800">
                      National University of Modern Languages
                    </CardTitle>
                    <CardDescription className="text-base text-gray-600">
                      Bachelor of Science in Software Engineering
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-pink-600">
                  <Calendar size={16} />
                  <span className="font-medium">Sep 2021 – May 2026</span>
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <h4 className="font-semibold text-gray-800 mb-4">Relevant Coursework:</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Data Structures",
                    "Operating Systems",
                    "OOP",
                    "DBMS",
                    "Internet Technology",
                    "AI",
                    "Software Methodology",
                    "Computer Architecture",
                    "Algorithm Analysis",
                  ].map((course, index) => (
                    <motion.div
                      key={course}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Badge className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 hover:from-pink-200 hover:to-purple-200 border-0 py-1.5 px-3">
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
      <section id="experience" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-pink-500 font-medium mb-2 block">Where I've worked</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[var(--font-playfair)] text-gray-800">
              Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                company: "Inotech Solutions",
                role: "Frontend & Design Intern",
                period: "2024",
                description:
                  "Focused on UI/UX design and frontend development, creating visually appealing interfaces.",
                skills: ["UI Design", "Frontend Dev", "Figma"],
              },
              {
                company: "NTC Islamabad",
                role: "Software Engineer Intern",
                period: "June 2022 – August 2022",
                description:
                  "Configured network infrastructure, monitored performance, and troubleshot LAN/WAN issues.",
                skills: ["Networking", "Cisco", "Troubleshooting"],
              },
            ].map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all">
                  <div
                    className={`h-1 bg-gradient-to-r ${index === 0 ? "from-pink-500 to-rose-500" : "from-purple-500 to-fuchsia-500"}`}
                  />
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                        <p className="text-pink-500 font-medium">{exp.company}</p>
                      </div>
                      <Badge variant="outline" className="border-pink-300 text-pink-600 w-fit">
                        <Calendar size={14} className="mr-1" />
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <Badge key={skill} className="bg-pink-50 text-pink-600 border-0">
                          {skill}
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

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-28 bg-gradient-to-b from-pink-50/50 to-white/50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-pink-500 font-medium mb-2 block">My creative work</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[var(--font-playfair)] text-gray-800">Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Student Management System",
                type: "Web Application",
                date: "Jan 2024",
                description:
                  "Comprehensive web app for managing student records with responsive UI for registration, course assignments, and attendance.",
                tech: ["HTML", "CSS", "JavaScript", "Python"],
                gradient: "from-pink-500 to-rose-500",
              },
              {
                title: "WireGuard VPN System",
                type: "Network Security",
                date: "Nov 2024",
                description:
                  "Secure VPN solution using WireGuard with Python automation for tunnel configuration and performance optimization.",
                tech: ["Cisco", "Python", "WireGuard", "Networking"],
                gradient: "from-purple-500 to-fuchsia-500",
              },
              {
                title: "Habit Tracking App",
                type: "Mobile / Web App",
                date: "2024",
                description:
                  "A simple and clean habit tracker that helps users build consistency with daily routines.",
                tech: ["React", "TypeScript", "CSS"],
                gradient: "from-emerald-500 to-teal-500",
                link: "https://github.com/sanahafeez9t9/HabitTrackingApp",
                details:
                  "This project lets users create, update, and monitor daily habits with progress visualization and a friendly UI, focusing on usability and motivation.",
              },
              {
                title: "Personal Portfolio Website",
                type: "Web Portfolio",
                date: "2025",
                description:
                  "My personal portfolio built with Next.js, showcasing projects, skills, and a live Instagram section.",
                tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
                gradient: "from-rose-500 to-purple-500",
                link: "https://github.com/sanahafeez9t9/My_Portfolio",
                details:
                  "This responsive portfolio highlights my design, development, and marketing skills with smooth animations, themed sections, and custom Instagram embeds.",
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card
                  className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden group hover:shadow-2xl transition-all h-full cursor-pointer"
                  onClick={() =>
                    setSelectedProjectIndex((prev) => (prev === index ? null : index))
                  }
                >
                  <div className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ExternalLink className="text-white/80" size={40} />
                    </motion.div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`bg-gradient-to-r ${project.gradient} text-white border-0`}>
                        {project.type}
                      </Badge>
                      <span className="text-sm text-gray-500">{project.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <Badge key={t} variant="outline" className="border-gray-200 text-gray-600 text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    {selectedProjectIndex === index && (
                      <div className="mt-5 border-t border-pink-100 pt-4 space-y-3 text-sm text-gray-700">
                        {"details" in project && project.details && (
                          <p>{project.details}</p>
                        )}
                        {"link" in project && project.link && (
                          <div className="flex flex-wrap gap-3">
                            <Button
                              asChild
                              size="sm"
                              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                            >
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-1" size={14} />
                                View on GitHub
                              </a>
                            </Button>
                          </div>
                        )}
                        <p className="text-[11px] text-gray-400">Click again to hide details.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section id="instagram" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-pink-500 font-medium mb-2 block">Live from Instagram</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[var(--font-playfair)] text-gray-800">
              Instagram Highlights
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Selected posts and reels embedded directly from my Instagram profile @sana_zi9t9.
            </p>
          </motion.div>
          {instagramEmbeds.length > 0 ? (
            <div
              className="max-w-5xl mx-auto"
              onMouseEnter={() => setIsInstagramHovered(true)}
              onMouseLeave={() => setIsInstagramHovered(false)}
            >
              <div className="relative">
                <motion.div
                  key={activeInstagramIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {Array.from({ length: Math.min(3, instagramEmbeds.length) }).map((_, offset) => {
                    const index = (activeInstagramIndex + offset) % instagramEmbeds.length
                    const item = instagramEmbeds[index]
                    return (
                      <motion.div
                        key={item.url}
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ duration: 0.25 }}
                        className="group rounded-3xl bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 p-[1px] shadow-2xl shadow-pink-200/60"
                      >
                        <div className="relative rounded-3xl bg-white overflow-hidden">
                          <div
                            className="w-full"
                            dangerouslySetInnerHTML={{
                              __html: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${item.url}" data-instgrm-version="14" style="margin:0 auto; max-width:540px; width:100%;"></blockquote>`,
                            }}
                          />
                          <div className="pointer-events-none absolute top-3 right-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-pink-600 shadow-md">
                            <Instagram size={14} className="text-pink-500" />
                            <span className="hidden sm:inline">Instagram Highlight</span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>

                {/* Desktop arrow controls */}
                {instagramEmbeds.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="hidden md:flex absolute inset-y-0 -left-4 items-center justify-center"
                      onClick={() =>
                        setActiveInstagramIndex((prev) =>
                          prev === 0 ? instagramEmbeds.length - 1 : prev - 1,
                        )
                      }
                      aria-label="Previous Instagram slides"
                    >
                      <div className="rounded-full bg-white/90 shadow-lg border border-pink-100 p-2 text-pink-500 hover:bg-pink-50 transition-colors">
                        <span className="inline-block -translate-x-[1px]">‹</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="hidden md:flex absolute inset-y-0 -right-4 items-center justify-center"
                      onClick={() =>
                        setActiveInstagramIndex((prev) => (prev + 1) % instagramEmbeds.length)
                      }
                      aria-label="Next Instagram slides"
                    >
                      <div className="rounded-full bg-white/90 shadow-lg border border-pink-100 p-2 text-pink-500 hover:bg-pink-50 transition-colors">
                        <span className="inline-block translate-x-[1px]">›</span>
                      </div>
                    </button>
                  </>
                )}
              </div>

              {instagramEmbeds.length > 1 && (
                <div className="mt-5 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    {instagramEmbeds.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveInstagramIndex(index)}
                        className={`h-2 rounded-full transition-all duration-200 ${
                          index === activeInstagramIndex
                            ? "w-5 bg-pink-500"
                            : "w-2 bg-pink-200 hover:bg-pink-300"
                        }`}
                        aria-label={`Go to Instagram slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <p className="text-center text-[11px] text-gray-400">
                    Carousel auto-scrolls every few seconds. Hover to pause.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center text-gray-500 text-sm">
              No Instagram embeds configured yet. Add URLs to lib/instagram-embeds.json to show posts here.
            </div>
          )}

          <motion.div
            className="mt-10 max-w-xl mx-auto text-center text-gray-600 text-sm bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="mb-2 font-medium text-gray-800">Follow along on Instagram</p>
            <p className="mb-4">
              These embeds come directly from my Instagram profile. You can update or add more posts anytime by
              replacing the embed URLs in the portfolio code.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            >
              <a href="https://www.instagram.com/sana_zi9t9" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2" size={18} />
                Visit my Instagram
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-pink-500 font-medium mb-2 block">What I work with</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[var(--font-playfair)] text-gray-800">
              Skills & Tools
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Design Tools */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-800">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                      <Palette className="text-white" size={20} />
                    </div>
                    Design & Creative Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { name: "Figma", icon: SiFigma, color: "text-purple-500" },
                      { name: "Adobe XD", icon: SiAdobexd, color: "text-pink-500" },
                      { name: "Canva", icon: SiCanva, color: "text-blue-500" },
                      { name: "Photoshop", icon: SiAdobephotoshop, color: "text-blue-600" },
                    ].map((tool, index) => (
                      <motion.div
                        key={tool.name}
                        className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 text-center hover:shadow-lg transition-all"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <tool.icon className={`text-3xl mx-auto mb-2 ${tool.color}`} />
                        <span className="text-sm font-medium text-gray-700">{tool.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Programming */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-800">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">{"</>"}</span>
                    </div>
                    Programming Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { name: "Python", icon: SiPython, color: "text-yellow-500" },
                      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
                      { name: "Java", icon: FaJava, color: "text-orange-500" },
                      { name: "C++", icon: SiCplusplus, color: "text-blue-500" },
                      { name: "HTML", icon: SiHtml5, color: "text-orange-600" },
                      { name: "CSS", icon: SiCss3, color: "text-blue-600" },
                    ].map((lang, index) => (
                      <motion.div
                        key={lang.name}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center hover:shadow-lg transition-all"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <lang.icon className={`text-3xl mx-auto mb-2 ${lang.color}`} />
                        <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Certifications */}
          <motion.div
            className="mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Certifications</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "MEAN Stack Development", icon: SiMongodb, color: "from-green-500 to-teal-500" },
                { title: "UI/UX Design", icon: SiFigma, color: "from-pink-500 to-purple-500" },
              ].map((cert, index) => (
                <motion.div
                  key={cert.title}
                  className="glass rounded-2xl p-6 flex items-center gap-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${cert.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <cert.icon className="text-white text-xl" />
                  </div>
                  <span className="font-semibold text-gray-800">{cert.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 bg-gradient-to-b from-white/50 to-pink-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-pink-500 font-medium mb-2 block">Get in touch</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[var(--font-playfair)] text-gray-800">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
            <p className="text-gray-600 mt-6 max-w-xl mx-auto">
              I'm always excited to discuss new opportunities and collaborate on creative projects!
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-500" />
                <CardContent className="p-6 md:p-8 space-y-6">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "sanahafeez8oct@gmail.com",
                      href: "mailto:sanahafeez8oct@gmail.com",
                    },
                    { icon: Phone, label: "Phone", value: "+92 314 3707610", href: "tel:+923143707610" },
                    { icon: Github, label: "GitHub", value: "sanahafeez9t9", href: "https://github.com/sanahafeez9t9" },
                    {
                      icon: Linkedin,
                      label: "LinkedIn",
                      value: "sanahafeez",
                      href: "https://www.linkedin.com/in/sana-hafeez-839599361/",
                    },
                    { icon: MapPin, label: "Location", value: "Abbottabad, Pakistan" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <item.icon className="text-pink-500" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-gray-800 hover:text-pink-500 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium text-gray-800">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Your Name</label>
                      <Input
                        name="name"
                        placeholder="Enter your name"
                        required
                        className="border-pink-100 focus:border-pink-300 rounded-xl py-6"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Your Email</label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="border-pink-100 focus:border-pink-300 rounded-xl py-6"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
                      <Input
                        name="subject"
                        placeholder="What's this about?"
                        required
                        className="border-pink-100 focus:border-pink-300 rounded-xl py-6"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                      <Textarea
                        name="message"
                        placeholder="Tell me about your project..."
                        rows={4}
                        required
                        className="border-pink-100 focus:border-pink-300 rounded-xl resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 rounded-xl font-medium shadow-lg shadow-pink-500/25"
                    >
                      {formStatus === "sending" ? (
                        <>
                          <Loader2 className="mr-2 animate-spin" size={18} />
                          Sending...
                        </>
                      ) : formStatus === "sent" ? (
                        <>
                          <Heart className="mr-2" size={18} />
                          Message Sent!
                        </>
                      ) : formStatus === "error" ? (
                        "Try Again"
                      ) : (
                        <>
                          <Send className="mr-2" size={18} />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              className="text-sm text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © 2025 Sana Hafeez. Crafted with <Heart className="inline w-4 h-4 text-pink-200 mx-1" /> and creativity
            </motion.p>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/sanahafeez9t9"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/sana-hafeez-839599361/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href="mailto:sanahafeez8oct@gmail.com"
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
