import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    
    const menuItems = [
        { name: 'Danh sách Tác giả', path: '/authors' },
        { name: 'Thêm Tác giả', path: '/authors/create' },
        { name: 'Danh sách Sách', path: '/books' },
        { name: 'Thêm Sách', path: '/books/create' },
        { name: 'Danh sách Reviews', path: '/reviews' },
        { name: 'Thêm Review', path: '/reviews/create' },
    ];

    return (
        <div className="w-64 bg-slate-800 text-white min-h-screen p-4">
            <h1 className="text-xl font-bold mb-8 border-b border-slate-700 pb-4">Book Review</h1>
            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-4 py-2 rounded transition ${
                            location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-slate-700'
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
