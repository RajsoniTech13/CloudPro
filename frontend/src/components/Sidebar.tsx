import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Docker Setup & Details', path: '/docker' },
    { title: 'AWS Services & Steps', path: '/aws' },
    { title: 'Latest Blogs', path: '/blog' },
    { title: 'Submit Feedback', path: '/feedback' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shrink-0 hidden md:block overflow-y-auto h-[calc(100vh-64px)] sticky top-16">
      <div className="py-6 px-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
          Topics
        </h3>
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                location.pathname === link.path
                  ? 'bg-green-50 text-gfg-green'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gfg-green'
              }`}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
