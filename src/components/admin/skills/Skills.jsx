"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import API_BASE_URL from "@/config/api";

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // FETCH SKILLS ON MOUNT
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/skills`);
      setSkills(res.data);
    } catch (err) {
      toast.error("Failed to load skills");
    }
  };

  // HANDLE IMAGE SELECTION
  const handleImage = (e) => {
    const img = e.target.files[0];
    if (!img) return;

    if (!img.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    if (img.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Image size must be <= 5MB");
      return;
    }

    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  // ADD SKILL
  const addSkill = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Enter skill name");
    if (!file) return toast.error("Select skill image");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", file);

      await toast.promise(
        axios.post(`${API_BASE_URL}/api/skills`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        {
          loading: "Saving skill...",
          success: "Skill added 🎉",
          error: "Failed to save skill ❌",
        }
      );

      setName("");
      setFile(null);
      setPreview("");
      fetchSkills(); // refresh list
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // DELETE SKILL
  const deleteSkill = async (id) => {
    await toast.promise(
      axios.delete(`${API_BASE_URL}/api/skills/${id}`),
      {
        loading: "Deleting...",
        success: "Skill deleted 🗑️",
        error: "Delete failed ❌",
      }
    );
    fetchSkills();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      <h2 className="text-3xl font-bold text-center">⚡ Skills Management</h2>

      {/* ADD SKILL FORM */}
      <form
        onSubmit={addSkill}
        className="bg-white rounded-xl shadow p-5 grid md:grid-cols-3 gap-4"
      >
        <input
          placeholder="Skill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-4 py-2"
        />

        <input type="file" accept="image/*" onChange={handleImage} />

        <button
          disabled={loading}
          className="bg-indigo-600 text-white rounded px-4 py-2 disabled:opacity-60"
        >
          {loading ? "Please wait..." : "Add Skill"}
        </button>

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-24 h-24 mx-auto rounded-full col-span-full border"
          />
        )}
      </form>

      {/* SKILLS LIST */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((s) => (
          <div key={s._id} className="bg-white rounded shadow p-4 relative">
            <img
              src={s.image}
              alt={s.name}
              className="w-16 h-16 mx-auto object-contain"
            />
            <p className="text-center mt-2">{s.name}</p>
            <button
              onClick={() => deleteSkill(s._id)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
