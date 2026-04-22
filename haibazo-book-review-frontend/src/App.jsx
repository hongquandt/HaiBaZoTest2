import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import AuthorList from "./pages/authors/AuthorList";
import AuthorCreate from "./pages/authors/AuthorCreate";
import BookList from "./pages/books/BookList";
import BookCreate from "./pages/books/BookCreate";
import ReviewList from "./pages/reviews/ReviewList";
import ReviewCreate from "./pages/reviews/ReviewCreate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/authors" replace />} />
          <Route path="authors" element={<AuthorList />} />
          <Route path="authors/create" element={<AuthorCreate />} />
          <Route path="books" element={<BookList />} />
          <Route path="books/create" element={<BookCreate />} />
          <Route path="reviews" element={<ReviewList />} />
          <Route path="reviews/create" element={<ReviewCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
