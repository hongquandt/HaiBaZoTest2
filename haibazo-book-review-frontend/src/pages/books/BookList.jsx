import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState({ id: '', title: '', author: null });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = () => {
        setLoading(true);
        Promise.all([
            axiosClient.get('/books'),
            axiosClient.get('/authors?page=0&size=100')
        ]).then(([booksRes, authorsRes]) => {
            setBooks(Array.isArray(booksRes.data) ? booksRes.data : []);
            setAuthors(authorsRes.data?.content || (Array.isArray(authorsRes.data) ? authorsRes.data : []));
            setError(null);
        }).catch(err => {
            console.error("API Error:", err);
            setError("Lỗi khi tải dữ liệu từ máy chủ.");
        }).finally(() => setLoading(false));
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = (id) => {
        if (window.confirm("Xóa sách này?")) {
            axiosClient.delete(`/books/${id}`).then(() => fetchData());
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        
        const payload = {
            id: selectedBook.id,
            title: selectedBook.title,
            author: selectedBook.author ? { id: selectedBook.author.id } : null
        };

        axiosClient.put(`/books/${selectedBook.id}`, payload).then(() => {
            setEditModal(false);
            fetchData();
        }).catch(err => {
            console.error("Lỗi cập nhật sách:", err.response || err);
            alert("Không thể cập nhật sách: " + (err.response?.data?.message || err.message));
        });
    };

    if (loading && books.length === 0) return <div className="p-4 text-gray-500">Đang tải dữ liệu...</div>;
    if (error) return <div className="p-4 text-red-500 border border-red-200 bg-red-50 rounded">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Danh sách Sách</h2>
                <button onClick={fetchData} className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Làm mới</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Tiêu đề</th>
                            <th className="p-3 text-left">Tác giả</th>
                            <th className="p-3 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500">Chưa có sách nào.</td>
                            </tr>
                        ) : (
                            books.map(book => (
                                <tr key={book.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{book.id}</td>
                                    <td className="p-3 font-medium">{book.title}</td>
                                    <td className="p-3">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                                            {book.author?.name || 'Chưa rõ'}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center space-x-2">
                                        <button 
                                            onClick={() => { setSelectedBook(book); setEditModal(true); }} 
                                            className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded transition"
                                        >
                                            Sửa
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(book.id)} 
                                            className="text-red-600 hover:bg-red-50 px-3 py-1 rounded transition"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Sửa Sách - Sử dụng component Modal dùng chung */}
            {editModal && (
                <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="modal-content bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <h3 className="text-xl font-bold mb-6">Sửa thông tin Sách</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề sách</label>
                                <input 
                                    type="text" 
                                    value={selectedBook.title}
                                    onChange={(e) => setSelectedBook({...selectedBook, title: e.target.value})}
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Chọn tác giả</label>
                                <select 
                                    value={selectedBook.author?.id || ''}
                                    onChange={(e) => {
                                        const author = authors.find(a => String(a.id) === String(e.target.value));
                                        setSelectedBook({...selectedBook, author});
                                    }}
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                >
                                    <option value="">-- Chọn tác giả --</option>
                                    {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <button type="button" onClick={() => setEditModal(false)} className="bg-gray-100 px-4 py-2 rounded text-gray-700 hover:bg-gray-200">Hủy</button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">Lưu lại</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookList;
