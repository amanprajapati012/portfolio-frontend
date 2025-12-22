"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Code2, Server, Layers, ShieldCheck } from "lucide-react";
import API_BASE_URL from "@/config/api";

const iconMap = [Code2, Server, Layers, ShieldCheck];

export default function Overview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/overview`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <section  id="overview"  className="relative py-28 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      {/* BACKGROUND BLUR SHAPES */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            {data.header}
          </h2>
          <span className="mt-3 block h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"></span>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {data.description}
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {data.cards.map((card, index) => {
            const Icon = iconMap[index] || Code2;
            return (
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
                  <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-md group-hover:scale-110 transition-transform">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {card.desc}
                  </p>
                  <span className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-cyan-400/10"></span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
