"use Client"


import Hero from "@/components/homepage/Hero"
import Overview from "@/components/homepage/Overview"
import React from "react"
import Skills from "@/components/homepage/Skills"
import Experience from "@/components/homepage/Experience"
import Projects from "@/components/homepage/Projects"
import Testimonials from "@/components/homepage/Testimonials"
import Contact from "@/components/homepage/Contact"

export default function Page () {
  return (
    <>
    <Hero/>
    <Overview/>
    <Skills/>
    <Experience/>
    <Projects/>
    <Testimonials/>
    <Contact/>
    </>
  )
}