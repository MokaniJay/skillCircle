"use client";
import { useState, useEffect } from "react";

export default function Showcase() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    days: "",
    languages: "",
    link: "",
    images: [],
  });

  /* Load projects from localStorage */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sc_projects")) || [];
    setProjects(stored);
  }, []);

  /* Convert image file to Base64 */
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  /* Handle multiple image upload */
  const handleFile = async (e) => {
    const files = Array.from(e.target.files);

    const base64Images = await Promise.all(
      files.map((file) => toBase64(file))
    );

    setForm({ ...form, images: base64Images });
  };

  /* Submit form */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    const newProject = {
      id: Date.now(),
      ...form,
    };

    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);

    localStorage.setItem(
      "sc_projects",
      JSON.stringify(updatedProjects)
    );

    // Reset form
    setForm({
      title: "",
      description: "",
      days: "",
      languages: "",
      link: "",
      images: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Upload Section */}
        <div className="bg-white shadow rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-6">
            Upload Project
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Project Title"
              className="w-full border rounded-lg px-4 py-2"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />

            <textarea
              placeholder="Project Description"
              className="w-full border rounded-lg px-4 py-2"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Days to Complete"
                className="border rounded-lg px-4 py-2"
                value={form.days}
                onChange={(e) =>
                  setForm({ ...form, days: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Languages Used"
                className="border rounded-lg px-4 py-2"
                value={form.languages}
                onChange={(e) =>
                  setForm({ ...form, languages: e.target.value })
                }
                required
              />
            </div>

            <input
              type="url"
              placeholder="Live Project Link (https://...)"
              className="w-full border rounded-lg px-4 py-2"
              value={form.link}
              onChange={(e) =>
                setForm({ ...form, link: e.target.value })
              }
              required
            />

        <div>
 

  <button
    type="button"
    onClick={() =>
      document.getElementById("imageUpload").click()
    }
    className="border border-green-600 text-green-600 px-6 py-4 cursor-pointer rounded-lg transition duration-300 hover:bg-green-600 hover:text-white"
  >
    Upload Images
  </button>

  <input
    id="imageUpload"
    type="file"
    multiple
    accept="image/*"
    onChange={handleFile}
    className="hidden"
    required
  />

  {form.images.length > 0 && (
    <p className="mt-2 text-sm text-gray-600">
      {form.images.length} image(s) selected
    </p>
  )}
</div>


            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add Project
            </button>

          </form>
        </div>

        {/* Display Projects */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow rounded-2xl p-5"
            >
              <h3 className="text-xl font-bold mb-2">
                {project.title}
              </h3>

              <p className="text-gray-600 mb-2">
                {project.description}
              </p>

              <p><strong>Days:</strong> {project.days}</p>
              <p><strong>Languages:</strong> {project.languages}</p>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 underline block mt-2"
              >
                View Project
              </a>

              <div className="mt-4 space-y-3">
                {project.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="project"
                    className="w-full h-52 object-cover rounded-lg"
                  />
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
