import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Welcome to <span className="text-gfg-green">CloudPro</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Your ultimate resource for mastering Cloud Computing, Docker containers, and AWS Infrastructure. Dive into our comprehensive tutorials and community feedback.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/docker" 
            className="bg-gfg-green hover:bg-green-700 text-white font-bold py-3 px-8 rounded-md transition shadow-md"
          >
            Docker Tutorial
          </Link>
          <Link 
            to="/aws" 
            className="bg-white border-2 border-gfg-green text-gfg-green hover:bg-green-50 font-bold py-3 px-8 rounded-md transition shadow-sm"
          >
            Explore AWS
          </Link>
          <Link 
            to="/feedback" 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-md transition shadow-sm"
          >
            Community Feedback
          </Link>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl w-full text-left">
        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Docker Ecosystem</h3>
          <p className="text-gray-600">Learn how to build, run, and scale applications in isolated containers seamlessly.</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-xl font-bold text-gray-800 mb-3">AWS Cloud</h3>
          <p className="text-gray-600">Master EC2, S3, RDS and other enterprise-grade infrastructure components.</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Learn with Us</h3>
          <p className="text-gray-600">Read the latest community blogs, tips, and provide your feedback on resources.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
