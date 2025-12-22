"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "@/config/api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/testimonials`);
        setTestimonials(res.data);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section
      id="testimonials"
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
            Testimonials
          </h2>

          <span className="mt-3 block h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"></span>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            What people say about working with me.
          </p>
        </motion.div>

        {/* TESTIMONIAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -10, rotateX: 3, rotateY: -3 }}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/40 via-violet-500/40 to-cyan-400/40"
            >
              <div className="relative h-full rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-7 shadow-lg transition-all group-hover:shadow-2xl">

                {/* QUOTE ICON */}
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-md">
                  <Quote size={22} />
                </div>

                {/* FEEDBACK */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  “{item.feedback}”
                </p>

                {/* USER INFO */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.role} • {item.company}
                    </p>
                  </div>
                </div>

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
