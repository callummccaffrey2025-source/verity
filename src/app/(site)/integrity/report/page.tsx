"use client";
import { useState } from "react";
export default function ReportPage() {
  const [title,setTitle]=useState(""); const [description,setDescription]=useState("");
  async function submit(e: any){ e.preventDefault();
    await fetch("/api/complaints/submit",{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ title, description })});
    alert("Submitted (stub)");
  }
  return (
    <form onSubmit={submit} className="p-6 space-y-3">
      <h1 className="text-xl font-semibold">Report an Issue</h1>
      <input className="border p-2 w-full" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="border p-2 w-full" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <button className="px-3 py-2 bg-black text-white rounded">Submit</button>
    </form>
  );
}
