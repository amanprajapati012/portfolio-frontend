"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "@/config/api";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    github: "",
    live: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchProjects = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/projects`);
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_BASE_URL}/api/projects/${editId}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/projects`, formData);
      }
      setFormData({ title: "", image: "", description: "", github: "", live: "" });
      setEditId(null);
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (project) => {
    setFormData(project);
    setEditId(project._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE_URL}/api/projects/${id}`);
    fetchProjects();
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Admin Projects Panel</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6 max-w-md">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="live"
          placeholder="Live URL"
          value={formData.live}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-indigo-500 text-white p-2 rounded">
          {editId ? "Update Project" : "Add Project"}
        </button>
      </form>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td className="border px-4 py-2">{project.title}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-yellow-400 p-1 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 p-1 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
