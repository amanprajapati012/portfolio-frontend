"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/config/api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    image: "",
    feedback: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/testimonials`);
      setTestimonials(res.data);
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await axios.put(`${API_BASE_URL}/api/testimonials/${editingId}`, formData);
      } else {
        // Add new
        await axios.post(`${API_BASE_URL}/api/testimonials`, formData);
      }
      setFormData({ name: "", role: "", company: "", image: "", feedback: "" });
      setEditingId(null);
      fetchTestimonials();
    } catch (err) {
      console.error("Failed to save testimonial:", err);
    }
  };

  // Edit testimonial
  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      image: testimonial.image || "",
      feedback: testimonial.feedback,
    });
    setEditingId(testimonial._id);
  };

  // Delete testimonial
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Manage Testimonials</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-lg">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="feedback"
          placeholder="Feedback"
          value={formData.feedback}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {editingId ? "Update Testimonial" : "Add Testimonial"}
        </button>
      </form>

      {/* Testimonials Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Feedback</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((t) => (
            <tr key={t._id} className="hover:bg-gray-50">
              <td className="border p-2">{t.name}</td>
              <td className="border p-2">{t.role}</td>
              <td className="border p-2">{t.company}</td>
              <td className="border p-2">{t.feedback}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
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
