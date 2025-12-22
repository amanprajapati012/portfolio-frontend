"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";
import API_BASE_URL from "@/config/api";
import { getCroppedImg } from "@/utils/cropImage";

export default function Dashboard() {
  const [hero, setHero] = useState({
    name: "",
    title: "",
    description: "",
    button1Text: "",
    button1Link: "",
    button2Text: "",
    button2Link: "",
    image: "",
  });

  const [imageSrc, setImageSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/hero`).then((res) => {
      if (res.data) {
        setHero(res.data);
        setPreview(res.data.image || "");
      }
    });
  }, []);

  const onCropComplete = (_, croppedPixels) => {
    setCroppedArea(croppedPixels);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const applyCrop = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedArea);
    setHero({ ...hero, image: croppedImage });
    setPreview(croppedImage);
    setImageSrc("");
  };

  const handleChange = (e) =>
    setHero({ ...hero, [e.target.name]: e.target.value });

  const submit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await axios.post(`${API_BASE_URL}/api/hero`, hero, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Hero section updated successfully 🚀");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update hero ❌");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Hero Section Editor
      </h2>

      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        {[
          ["name", "Name"],
          ["title", "Title"],
          ["button1Text", "Button 1 Text"],
          ["button1Link", "Button 1 Link"],
          ["button2Text", "Button 2 Text"],
          ["button2Link", "Button 2 Link"],
        ].map(([key, label]) => (
          <input
            key={key}
            name={key}
            value={hero[key]}
            onChange={handleChange}
            placeholder={label}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        ))}

        <textarea
          name="description"
          value={hero.description}
          onChange={handleChange}
          placeholder="Description"
          className="border rounded-lg px-4 py-2 col-span-full"
        />

        {/* IMAGE UPLOAD */}
        <div className="col-span-full">
          <label className="font-medium block mb-2">Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImage} />
        </div>

        {/* CROPPER */}
        {imageSrc && (
          <div className="col-span-full relative h-80 bg-black rounded-xl overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />

            <div className="absolute bottom-4 left-4 right-4 flex gap-4 items-center">
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
                className="w-full"
              />
              <button
                type="button"
                onClick={applyCrop}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {/* PREVIEW */}
        {preview && (
          <div className="col-span-full flex justify-center">
            <img
              src={preview}
              className="w-44 h-44 rounded-2xl object-cover border shadow"
            />
          </div>
        )}
<button
  disabled={loading}
  className="col-span-full bg-indigo-600 text-white py-3 rounded-xl 
  hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
>
  {loading ? "Saving..." : "Save Changes"}
</button>

      </form>
    </div>
  );
}
