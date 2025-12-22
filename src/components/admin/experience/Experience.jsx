"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/config/api";



export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
  });

  const fetchData = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/experience`);
    setExperiences(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE_URL}/api/experience`, form);
    setForm({ role: "", company: "", duration: "", description: "" });
    fetchData();
  };

  const deleteExp = async (id) => {
    await axios.delete(`${API_BASE_URL}/api/experience/${id}`);
    fetchData();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold">Experience Admin</h2>

      {/* ADD FORM */}
      <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-6 rounded shadow">
        <input
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Duration"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />
        <button className="bg-indigo-600 text-white py-2 rounded">
          Add Experience
        </button>
      </form>

      {/* LIST */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp._id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <h3 className="font-semibold">{exp.role}</h3>
              <p className="text-sm">{exp.company}</p>
              <p className="text-xs text-gray-500">{exp.duration}</p>
            </div>
            <button
              onClick={() => deleteExp(exp._id)}
              className="text-red-600 font-bold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
