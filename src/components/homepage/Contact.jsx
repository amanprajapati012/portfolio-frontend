"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  User,
  Phone,
  MessageSquare,
  Send,
  Instagram,
  Linkedin,
  Github,
  MessageCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import API_BASE_URL from "@/config/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ API SUBMIT + TOAST
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Frontend ko turant success dena
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Message sent successfully 🚀");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      toast.error("Failed to send message ❌");
    }
  } catch (error) {
    console.error(error);
    toast.error("Server error ❌");
  } finally {
    // Loading hamesha false kar dena, chahe email fail ho
    setLoading(false);
  }
};


  return (
    <section
      id="contact"
      className="relative py-28 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Contact Me
          </h2>

          <span className="mt-3 block h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"></span>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
            Let’s build something great together.
            You can reach me anytime via form or social platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT INFO */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Direct Contact
              </h3>

              <p className="mt-3 flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="text-indigo-500" />
                <span className="font-medium">+91 9793333958</span>
              </p>

              <p className="mt-2 flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Mail className="text-indigo-500" />
                amanprajapati265482@gmail.com
              </p>
            </div>

            {/* SOCIAL ICONS */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Follow Me
              </h3>

              <div className="flex gap-5">
                <a href="https://www.instagram.com/rajkill_lifestyle/" target="_blank"
                  className="p-3 rounded-xl bg-white/80 dark:bg-slate-800 shadow hover:scale-110 transition">
                  <Instagram className="text-pink-500" />
                </a>

                <a href="https://linkedin.com/in/aman-prajapati-2b3b42273" target="_blank"
                  className="p-3 rounded-xl bg-white/80 dark:bg-slate-800 shadow hover:scale-110 transition">
                  <Linkedin className="text-blue-600" />
                </a>

                <a href="https://github.com/amanprajapati012" target="_blank"
                  className="p-3 rounded-xl bg-white/80 dark:bg-slate-800 shadow hover:scale-110 transition">
                  <Github className="text-gray-900 dark:text-white" />
                </a>

                <a href="https://wa.me/919793333958" target="_blank"
                  className="p-3 rounded-xl bg-white/80 dark:bg-slate-800 shadow hover:scale-110 transition">
                  <MessageCircle className="text-green-500" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* CONTACT FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/40 via-violet-500/40 to-cyan-400/40"
          >
            <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 md:p-10 shadow-lg">

              <InputField icon={<User size={18} />} label="Your Name" name="name" value={form.name} onChange={handleChange} />
              <InputField icon={<Mail size={18} />} label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} />
              <InputField icon={<Phone size={18} />} label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />

              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                  <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold text-white
                bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 hover:scale-105 transition shadow-lg"
              >
                {loading ? "Sending..." : "Send Message"} <Send size={18} />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* INPUT COMPONENT */
function InputField({ icon, label, ...props }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-3.5 text-gray-400">{icon}</span>
        <input
          {...props}
          required
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
