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

const About: React.FC = () => {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/about/docker')
      .then((r) => r.json())
      .then((data) => setAbout(data))
      .catch(() => {});
  }, []);

  if (!about) return <div>Loading...</div>;

  return (
    <div>
      <h2>{about.title}</h2>
      <p>{about.description}</p>
      <h3>Commands</h3>
      <ul>
        {about.commands.map((c: { command: string; description: string }, i: number) => (
          <li key={i}><code>{c.command}</code> — {c.description}</li>
        ))}
      </ul>
      <h3>Tutorials</h3>
      <ul>
        {about.tutorialLinks.map((t: { title: string; url: string }, i: number) => (
          <li key={i}><a href={t.url} target="_blank" rel="noreferrer">{t.title}</a></li>
        ))}
      </ul>
    </div>
  );
};

export default About;
