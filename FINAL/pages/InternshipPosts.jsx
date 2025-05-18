// FINAL/pages/company/Posts.jsx
import React, { useState } from "react";

const initialPosts = [
  {
    id: 1,
    title: "Frontend Intern",
    duration: "3 months",
    paid: true,
    salary: "5000 EGP",
    skills: ["React", "HTML", "CSS"],
    description: "Help build modern web interfaces."
  },
  {
    id: 2,
    title: "Backend Intern",
    duration: "2 months",
    paid: false,
    salary: null,
    skills: ["Node.js", "MongoDB"],
    description: "Work on APIs and database services."
  }
];

export default function Posts() {
  const [posts, setPosts] = useState(initialPosts);

  const deletePost = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2>My Internship Posts</h2>
      {posts.map(post => (
        <div key={post.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h3>{post.title}</h3>
          <p><strong>Duration:</strong> {post.duration}</p>
          <p><strong>Paid:</strong> {post.paid ? `Yes (${post.salary})` : "No"}</p>
          <p><strong>Skills:</strong> {post.skills.join(", ")}</p>
          <p>{post.description}</p>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
