import React, { useEffect, useState } from 'react';

interface AboutData {
  title: string;
  description: string;
  commands: {
    command: string;
    description: string;
  }[];
  tutorialLinks: {
    title: string;
    url: string;
  }[];
}

const DockerPage: React.FC = () => {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/about/docker')
      .then((r) => r.json())
      .then((data) => setAbout(data))
      .catch(() => {});
  }, []);

  if (!about) return (
    <div className="flex justify-center items-center h-64 text-green-700 font-semibold text-lg">
      Loading Document...
    </div>
  );

  return (
    <article className="prose max-w-none prose-green">
      <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-4 mb-6">
        {about.title}
      </h1>
      
      <p className="text-gray-700 text-lg mb-8 leading-relaxed">
        {about.description}
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold bg-green-50 text-gfg-green border-l-4 border-gfg-green p-3 mb-6 shadow-sm">
          Basic Docker Commands
        </h2>
        <div className="flex flex-col gap-4">
          {about.commands.map((c: { command: string; description: string }, i: number) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded text-sm p-4 hover:shadow transition">
              <code className="text-pink-600 bg-pink-50 px-2 py-1 rounded font-mono font-bold block mb-2 w-max">
                {c.command}
              </code>
              <p className="text-gray-600 m-0">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 pt-6 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Official Documentation & Tutorials</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {about.tutorialLinks.map((t: { title: string; url: string }, i: number) => (
            <li key={i}>
              <a 
                href={t.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-gfg-green hover:underline font-medium hover:text-green-800 transition"
              >
                {t.title}
              </a>
            </li>
          ))}
          <li>
            <a 
                href="https://docs.docker.com/" 
                target="_blank" 
                rel="noreferrer"
                className="text-gfg-green hover:underline font-medium hover:text-green-800 transition"
              >
               Docker Official Documentation
              </a>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default DockerPage;
