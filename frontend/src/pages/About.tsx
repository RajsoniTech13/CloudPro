import React, { useEffect, useState } from 'react';

const About: React.FC = () => {
  const [about, setAbout] = useState<any>(null);

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
        {about.commands.map((c: any, i: number) => (
          <li key={i}><code>{c.command}</code> — {c.description}</li>
        ))}
      </ul>
      <h3>Tutorials</h3>
      <ul>
        {about.tutorialLinks.map((t: any, i: number) => (
          <li key={i}><a href={t.url} target="_blank" rel="noreferrer">{t.title}</a></li>
        ))}
      </ul>
    </div>
  );
};

export default About;
