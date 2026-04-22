import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const AuthorCreate = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient.post("/authors", { name }).then(() => navigate("/"));
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Thêm Tác giả</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Tên tác giả</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Nhập tên..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700"
        >
          Lưu lại
        </button>
      </form>
    </div>
  );
};

export default AuthorCreate;
