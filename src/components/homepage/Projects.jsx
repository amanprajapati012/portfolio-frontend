"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "@/config/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/projects`);
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="relative py-28 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Projects
          </h2>

          <span className="mt-3 block h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"></span>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            A selection of projects I have worked on, showcasing my skills in web development, full-stack applications, and interactive platforms.
          </p>
        </motion.div>

        {/* PROJECT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -10, rotateX: 3, rotateY: -3 }}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/40 via-violet-500/40 to-cyan-400/40"
            >
              <div className="relative h-full rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 flex flex-col shadow-lg transition-all group-hover:shadow-2xl">
                {/* PROJECT IMAGE */}
                <div className="relative w-full h-48 mb-4 rounded-2xl overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* PROJECT TITLE */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-700 dark:text-gray-300 flex-1">
                  {project.description}
                </p>

                {/* LINKS */}
                <div className="mt-4 flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-600 dark:text-cyan-400 font-semibold hover:gap-3 transition-all"
                  >
                    GitHub <ArrowRight size={18} />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:gap-3 transition-all"
                    >
                      Live Demo <ArrowRight size={18} />
                    </a>
                  )}
                </div>

                {/* GLOW EFFECT */}
                <span className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-cyan-400/10"></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BACKGROUND BLUR SHAPES */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
    </section>
  );
}
