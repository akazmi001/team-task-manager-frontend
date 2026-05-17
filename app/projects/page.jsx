"use client";
import { useState, useEffect } from "react";
import { createProject, getProjectApi, deleteProject } from "../../lib/api";
import { Accordion } from "../../components/Accordian";
import { toast } from "sonner";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(
    {
      name: "",
      description: "",
    }
  );

  useEffect(() => {
    fetchProjects();
  }, []);


  const fetchProjects = async () => {
    const resp = await getProjectApi();
    setProjects(resp);
  }

   const handleSubmit = async (e) => {
     e.preventDefault();
     let data = null;
      try {
        data = await createProject(form);
        fetchProjects()
        toast.success("Project Created successfully!");
      } catch (err) {
        toast.error("you are not admin!")
      }
    };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-start justify-center px-6 py-16">
  <div className="w-full max-w-2xl space-y-10">

    {/* Form Card */}
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white">New Project</h2>
        <p className="text-zinc-500 text-sm mt-1">Fill in the details to create a new project.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400 tracking-wide">Title</label>
          <input
            className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            placeholder="My awesome project"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400 tracking-wide">Description</label>
          <textarea
            rows={4}
            className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
            placeholder="What's this project about?"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="self-start bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
        >
          Create Project
        </button>

      </form>
    </div>

    {/* Projects List */}
    {projects.length > 0 && (
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Projects</h3>
          {projects.map((p) => (
            <Accordion key={p.id} project={p} deleteFn={ deleteProject } />
        ))}
      </div>
    )}

  </div>
</div>
    


    //   <input
    //     placeholder="Project Title"
    //     value={title}
    //     onChange={(e) => setTitle(e.target.value)}
    //   />
    //   <button onClick={createProject}>Create</button>

    //   <hr />

    //   {projects.map((p) => (
    //     <div key={p.id}>
    //       <p>{p.title}</p>
    //     </div>
    //   ))}
    // </div>
  );
}