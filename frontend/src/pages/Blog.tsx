import React, { useEffect, useState } from 'react';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/blogs')
      .then((r) => r.json())
      .then((data) => setPosts(data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-4 mb-8">
        Latest Tutorials & Blogs
      </h1>
      
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 py-10">Loading posts...</div>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((p) => (
            <article 
              key={p._id || p.title} 
              className="bg-white border text-left border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-2xl font-bold text-gfg-green mb-2">{p.title}</h2>
              <div className="mb-4">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  Tutorial
                </span>
                {p.tags && p.tags.map((tag: string) => (
                  <span key={tag} className="ml-2 bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-800 font-medium mb-3">{p.summary}</p>
              <p className="text-gray-600 leading-relaxed">{p.content}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                <span>By GFG CloudPro Team</span>
                <span>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'Recent'}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
