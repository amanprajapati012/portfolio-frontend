"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import API_BASE_URL from "@/config/api";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [hero, setHero] = useState(null);

  useEffect(() => {
    setMounted(true);

    axios.get(`${API_BASE_URL}/api/hero`).then((res) => {
      setHero(res.data);
    });
  }, []);

  if (!hero) return null;

  return (
    <section
      id="hero"
      className="relative py-28 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -40 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Hi, my name is
          </p>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 dark:text-white">
            {hero.name}
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-purple-600 dark:text-purple-400">
            {hero.title}
          </h2>

          <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-lg leading-relaxed">
            {hero.description}
          </p>

          <div className="mt-6 flex gap-4 flex-wrap">
            {hero.button1Text && (
              <a
                href={hero.button1Link}
                className="px-6 py-3 bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition"
              >
                {hero.button1Text}
              </a>
            )}

            {hero.button2Text && (
              <a
                href={hero.button2Link}
                className="px-6 py-3 border border-purple-600 text-purple-600 font-semibold rounded-2xl hover:bg-gradient-to-br hover:from-indigo-500 hover:via-violet-500 hover:to-cyan-400 hover:text-white transition"
              >
                {hero.button2Text}
              </a>
            )}
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl p-1 bg-gradient-to-br from-indigo-500/40 via-violet-500/40 to-cyan-400/40 shadow-lg">
            <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl">
              <Image
                src={hero.image || "/assets/image/profile.jpg"}
                alt={hero.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Blur Shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
    </section>
  );
}
