"use client";
import API_BASE_URL from "@/config/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/contact/admin`)
      .then(res => res.json())
      .then(setMessages);
  }, []);

  const deleteMessage = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/admin/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setMessages(messages.filter(m => m._id !== id));
      toast.success("Message deleted successfully! ✅"); // ✅ Toast here
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message ❌"); // ❌ Error toast
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">📩 Contact Messages</h1>

      {messages.length === 0 && (
        <p className="text-gray-500">No messages found.</p>
      )}

      {messages.map(msg => (
        <div key={msg._id} className="p-6 mb-5 bg-white shadow rounded-xl">
          <h3 className="font-bold">{msg.name}</h3>
          <p>Email: {msg.email}</p>
          <p>Phone: {msg.phone}</p>
          <p className="mt-2">{msg.message}</p>

          <button
            onClick={() => deleteMessage(msg._id)}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
