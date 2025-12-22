"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // ✅ toast import
import API_BASE_URL from "@/config/api";
export default function AdminOverview() {
  const [overview, setOverview] = useState({
    header: "Overview",
    subtitle: "",
    description: "",
    cards: [
      { title: "Frontend Development", desc: "" },
      { title: "Backend Development", desc: "" },
      { title: "MERN Stack Applications", desc: "" },
      { title: "API & Authentication", desc: "" },
    ],
  });

  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  useEffect(() => {
  axios.get(`${API_BASE_URL}/api/overview`)

      .then((res) => {
        if (res.data) setOverview(res.data);
      })
      .catch(() => toast.error("Failed to load overview ❌"));
  }, []);

  const handleChange = (e) => {
    setOverview({ ...overview, [e.target.name]: e.target.value });
  };

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...overview.cards];
    updatedCards[index][field] = value;
    setOverview({ ...overview, cards: updatedCards });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/api/overview`, overview, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Overview updated successfully 🚀"); // ✅ success
    } catch (error) {
      console.error(error);
      toast.error("Failed to update overview ❌"); // ❌ error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8 space-y-6">
      <h2 className="text-2xl font-bold">Admin: Overview Section</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          name="header"
          value={overview.header}
          onChange={handleChange}
          placeholder="Header"
          className="border rounded-lg px-4 py-2 w-full"
        />

        <textarea
          name="description"
          value={overview.description}
          onChange={handleChange}
          placeholder="Description"
          className="border rounded-lg px-4 py-2 w-full"
        />

        <div className="grid md:grid-cols-2 gap-4">
          {overview.cards.map((card, i) => (
            <div key={i} className="space-y-2">
              <input
                value={card.title}
                onChange={(e) =>
                  handleCardChange(i, "title", e.target.value)
                }
                placeholder="Card Title"
                className="border rounded-lg px-3 py-2 w-full"
              />
              <textarea
                value={card.desc}
                onChange={(e) =>
                  handleCardChange(i, "desc", e.target.value)
                }
                placeholder="Card Description"
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>
          ))}
        </div>

        <button
          disabled={loading}
          className="bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
