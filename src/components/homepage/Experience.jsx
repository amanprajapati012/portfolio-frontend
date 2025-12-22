"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "@/config/api";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  /* =========================
     FETCH DATA FROM ADMIN API
  ========================= */
  const fetchExperiences = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/experience`);
      setExperiences(res.data);
    } catch (error) {
      console.error("Experience fetch error:", error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <section
      id="experience"
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
            Experience
          </h2>

          <span className="mt-3 block h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"></span>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            A brief summary of my professional journey at Web Loxic Technology.
          </p>
        </motion.div>

        {/* EXPERIENCE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -10, rotateX: 3, rotateY: -3 }}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/40 via-violet-500/40 to-cyan-400/40"
            >
              {/* INNER CARD */}
              <div className="relative h-full rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-7 shadow-lg transition-all group-hover:shadow-2xl">

                {/* ICON */}
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-md group-hover:scale-110 transition-transform">
                  <Briefcase size={26} />
                </div>

                {/* ROLE */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {exp.role}
                </h3>

                {/* COMPANY & DURATION */}
                <p className="text-sm text-gray-500">{exp.company}</p>
                <p className="text-sm text-gray-400 mb-4">{exp.duration}</p>

                {/* DESCRIPTION */}
                <p className="text-gray-700 dark:text-gray-300">
                  {exp.description}
                </p>

                {/* GLOW */}
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
