"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/posts/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the blog posts!", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      axios.delete(`http://127.0.0.1:8000/api/posts/${id}/`)
        .then(() => {
          setPosts(posts.filter(post => post.id !== id));
        })
        .catch(error => {
          console.error("There was an error deleting the post!", error);
        });
    }
  };

  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
  };

  const handleCreate = () => {
    router.push('/create');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Blog Posts</h1>
      <button
        onClick={handleCreate}
        className="mb-8 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Add New Post
      </button>
      <div className="w-full max-w-4xl">
        {posts.length > 0 ? (
          <ul className="space-y-6">
            {posts.map(post => (
              <li key={post.id} className="bg-white p-6 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                <p className="mt-4 text-gray-600">{post.excerpt || post.content.slice(0, 100) + '...'}</p>
                {post.image && (
                  <img src={post.image} alt={post.title} className="w-full h-64 object-cover mt-4 rounded-lg" />
                )}
                <div className="mt-6 flex justify-between items-center">
                  <a href={`/post/${post.id}`} className="text-blue-500 hover:text-blue-700 transition duration-200">Read More</a>
                  <div>
                    <button onClick={() => handleEdit(post.id)} className="mr-4 text-yellow-500 hover:text-yellow-600 transition duration-200">Edit</button>
                    <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-600 transition duration-200">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </main>
  );
}
