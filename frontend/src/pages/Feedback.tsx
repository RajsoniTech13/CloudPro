import React, { useState, useEffect } from 'react';

interface FeedbackItem {
  name?: string;
  email?: string;
  message: string;
  createdAt: string;
}

const Feedback: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [recentFeedbacks, setRecentFeedbacks] = useState<FeedbackItem[]>([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/feedback');
      if (res.ok) {
        const data = await res.json();
        setRecentFeedbacks(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/feedback');
        if (res.ok) {
          const data = await res.json();
          setRecentFeedbacks(data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('http://localhost:8080/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const d = await res.json();
      if (res.ok) {
        setStatus('Thanks for your feedback!');
        setName(''); setEmail(''); setMessage('');
        fetchFeedbacks(); // Refresh the list
      } else {
        setStatus(d.message || 'Error occurred');
      }
    } catch {
      setStatus('Error submitting feedback');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-4 mb-6">
        Submit Feedback
      </h1>
      
      <div className="bg-white rounded-lg shadow border border-gray-100 p-6 mb-10">
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-gfg-green focus:border-gfg-green outline-none transition"
              value={name} onChange={(e) => setName(e.target.value)} 
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-gfg-green focus:border-gfg-green outline-none transition"
              value={email} onChange={(e) => setEmail(e.target.value)} 
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-gfg-green focus:border-gfg-green outline-none transition"
              value={message} onChange={(e) => setMessage(e.target.value)} rows={5} 
              placeholder="What are your thoughts?"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="mt-2 bg-gfg-green text-white font-semibold py-2 px-6 rounded-md hover:bg-green-700 transition self-start shadow-sm"
          >
            Send Feedback
          </button>
          
          {status && (
            <div className={`mt-2 p-3 rounded text-sm font-medium ${status.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-gfg-green'}`}>
              {status}
            </div>
          )}
        </form>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-gfg-green rounded-full inline-block"></span>
        Recent Community Feedback
      </h2>
      <div className="flex flex-col gap-4">
        {recentFeedbacks.length === 0 ? (
          <p className="text-gray-500 italic">No feedback submitted yet. Be the first!</p>
        ) : (
          recentFeedbacks.map((fb, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-sm transition">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-gray-900">{fb.name || 'Anonymous User'}</span>
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{fb.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedback;
