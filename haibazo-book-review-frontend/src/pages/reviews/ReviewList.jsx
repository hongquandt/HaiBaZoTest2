import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = () => {
        setLoading(true);
        axiosClient.get('/reviews')
            .then(res => {
                setReviews(Array.isArray(res.data) ? res.data : []);
                setError(null);
            })
            .catch(err => {
                console.error("API Error:", err);
                setError("Không thể tải đánh giá. Vui lòng kiểm tra backend.");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchReviews(); }, []);

    const handleDelete = (id) => {
        if (window.confirm("Xóa review này?")) {
            axiosClient.delete(`/reviews/${id}`).then(() => fetchReviews());
        }
    };

    if (loading && reviews.length === 0) return <div className="p-4 text-gray-500">Đang tải đánh giá...</div>;
    if (error) return <div className="p-4 text-red-500 border border-red-200 bg-red-50 rounded">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Danh sách Reviews</h2>
                <button onClick={fetchReviews} className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Làm mới</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.length === 0 ? (
                    <p className="text-gray-500 col-span-2 text-center py-8">Chưa có review nào.</p>
                ) : (
                    reviews.map(review => (
                        <div key={review.id} className="p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow relative group">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-blue-600 text-lg">{review.book?.title || 'Sách ẩn'}</h4>
                                <button 
                                    onClick={() => handleDelete(review.id)} 
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                    title="Xóa review"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-gray-700 italic line-clamp-3">"{review.content}"</p>
                            <div className="mt-4 flex items-center text-xs text-gray-400">
                                <span>ID: {review.id}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};


export default ReviewList;
