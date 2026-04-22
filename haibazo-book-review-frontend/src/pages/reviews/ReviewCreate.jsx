import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const ReviewCreate = () => {
  const [content, setContent] = useState("");
  const [bookId, setBookId] = useState("");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get("/books").then((res) => setBooks(res.data || []));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = books.find((b) => String(b.id) === String(bookId));
    if (!book) {
        alert("Vui lòng chọn sách hợp lệ");
        return;
    }
    
    // Send a minimal book object with just the ID to avoid cyclic dependencies
    const payload = {
        content,
        book: { id: book.id }
    };
    
    axiosClient
      .post("/reviews", payload)
      .then(() => navigate("/reviews"))
      .catch((err) => {
          console.error("Lỗi thêm review:", err.response || err);
          alert("Không thể thêm review: " + (err.response?.data?.message || err.message));
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Viết Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          required
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Chọn sách để review --</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Nội dung đánh giá..."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded h-32"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded font-bold"
        >
          Gửi Review
        </button>
      </form>
    </div>
  );
};

export default ReviewCreate;
