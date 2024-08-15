'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function BlogForm({ initialData, onSuccess }) {
    const [title, setTitle] = useState(initialData ? initialData.title : '');
    const [content, setContent] = useState(initialData ? initialData.content : '');
    const [image, setImage] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) formData.append('image', image);

        try {
            if (initialData) {
                // Update existing post
                await axios.put(`http://localhost:8000/api/posts/${initialData.id}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                // Create new post
                await axios.post('http://localhost:8000/api/posts/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            onSuccess();
            router.push('/'); // Redirect to the homepage or another page
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
            </div>
            <div>
                <label>Image:</label>
                <input type="file" accept="image/jpeg" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <button type="submit">Save</button>
        </form>
    );
}
