"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

export default function EditPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/posts/${id}/`)
      .then(response => {
        const { title, content, image } = response.data;
        setTitle(title);
        setContent(content);
        setImage(image);
      })
      .catch(error => {
        console.error("There was an error fetching the post data!", error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    // Only append the image if it's a file
    if (image && typeof image === 'object') {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/posts/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      router.push('/');
    } catch (error) {
      console.error('Error updating the post:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-10 border border-gray-200 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="mt-2 p-2 w-full h-48 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Image:</label>
            <input
              type="file"
              accept="image/jpeg"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {typeof image === 'string' && (
              <img src={image} alt="Current" className="mt-4 h-48 w-full object-cover rounded-lg" />
            )}
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Update Post
          </button>
        </form>
      </div>
    </main>
  );
}
