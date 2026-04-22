import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Modal from '../../components/Modal';

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState({ id: '', name: '' });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAuthors = () => {
        setLoading(true);
        axiosClient.get('/authors?page=0&size=100')
            .then(res => {
                // Handle both paginated (data.content) and non-paginated (data) responses
                const data = res.data?.content || (Array.isArray(res.data) ? res.data : []);
                setAuthors(data);
                setError(null);
            })
            .catch(err => {
                console.error("API Error:", err);
                setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra backend.");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchAuthors(); }, []);

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            axiosClient.delete(`/authors/${id}`).then(() => fetchAuthors());
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const payload = {
            id: selectedAuthor.id,
            name: selectedAuthor.name
        };
        axiosClient.put(`/authors/${selectedAuthor.id}`, payload).then(() => {
            setEditModal(false);
            fetchAuthors();
        }).catch(err => {
            console.error("Lỗi cập nhật tác giả:", err.response || err);
            alert("Không thể cập nhật tác giả: " + (err.response?.data?.message || err.message));
        });
    };

    if (loading && authors.length === 0) return <div className="p-4 text-gray-500">Đang tải dữ liệu...</div>;
    if (error) return <div className="p-4 text-red-500 border border-red-200 bg-red-50 rounded">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Danh sách Tác giả</h2>
                <button onClick={fetchAuthors} className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Làm mới</button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Tên tác giả</th>
                            <th className="p-3 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="p-8 text-center text-gray-500">Chưa có tác giả nào.</td>
                            </tr>
                        ) : (
                            authors.map(author => (
                                <tr key={author.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{author.id}</td>
                                    <td className="p-3 font-medium">{author.name}</td>
                                    <td className="p-3 text-center space-x-2">
                                        <button 
                                            onClick={() => { setSelectedAuthor(author); setEditModal(true); }} 
                                            className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded transition"
                                        >
                                            Sửa
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(author.id)} 
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

            <Modal 
                isOpen={editModal} 
                onClose={() => setEditModal(false)} 
                title="Cập nhật Tác giả"
            >
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên tác giả</label>
                        <input 
                            type="text" 
                            value={selectedAuthor.name}
                            onChange={(e) => setSelectedAuthor({...selectedAuthor, name: e.target.value})}
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Nhập tên tác giả..."
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={() => setEditModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">Hủy</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium">Lưu thay đổi</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AuthorList;
