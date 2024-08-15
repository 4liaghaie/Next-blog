"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function PostPage({ params }) {
  const [post, setPost] = useState(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/posts/${id}/`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the blog post!", error);
      });
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-10 border border-gray-200 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{post.title}</h1>
        {post.image && (
          <img src={post.image} alt={post.title} className="w-full h-96 object-cover rounded-lg mb-6" />
        )}
        <p className="text-lg text-gray-700 leading-relaxed">{post.content}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}
