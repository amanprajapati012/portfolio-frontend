"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import API_BASE_URL from "@/config/api";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  // FETCH SKILLS ON COMPONENT MOUNT
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/skills`);
      console.log("SKILLS FROM API:", res.data);

      // Expecting each skill: { _id, name, image: "https://ik.imagekit.io/..." }
      setSkills(res.data);
    } catch (err) {
      console.error("Fetch skills error:", err);
    }
  };

  return (
    <section
      id="skills"
      className="relative py-28 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          My Skills & Tools
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {skills.map((skill) => (
            <motion.div
              key={skill._id}
              whileHover={{ y: -8 }}
              className="rounded-2xl bg-white shadow p-6 flex flex-col items-center"
            >
              <img
                src={skill.image} // ImageKit URL directly
                alt={skill.name}
                className="w-16 h-16 object-contain mb-3"
              />
              <p className="font-semibold">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
    </section>
  );
}
