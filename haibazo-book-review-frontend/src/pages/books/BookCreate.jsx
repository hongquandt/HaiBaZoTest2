import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

const BookCreate = () => {
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/authors?page=0&size=100').then(res => {
            const data = res.data?.content || (Array.isArray(res.data) ? res.data : []);
            setAuthors(data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const author = authors.find(a => String(a.id) === String(authorId));
        if (!author) {
            alert("Vui lòng chọn tác giả hợp lệ");
            return;
        }
        // Send a clean object to avoid cyclic JSON issues
        const payload = { 
            title, 
            author: { id: author.id } 
        };
        
        axiosClient.post('/books', payload)
            .then(() => navigate('/books'))
            .catch(err => {
                console.error("Lỗi thêm sách:", err.response || err);
                alert("Không thể thêm sách: " + (err.response?.data?.message || err.message));
            });
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Thêm Sách mới</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Tiêu đề sách" required value={title}
                    onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" />
                <select required value={authorId} onChange={(e) => setAuthorId(e.target.value)} className="w-full border p-2 rounded">
                    <option value="">-- Chọn tác giả --</option>
                    {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-bold">Thêm Sách</button>
            </form>
        </div>
    );
};

export default BookCreate;
