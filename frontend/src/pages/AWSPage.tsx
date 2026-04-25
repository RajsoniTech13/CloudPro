import React, { useEffect, useState } from 'react';

const AWSPage: React.FC = () => {
  const [tutorials, setTutorials] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/aws/tutorials')
      .then((r) => r.json())
      .then((data) => setTutorials(data))
      .catch(() => {});
  }, []);

  const awsServices = [
    {
      name: "Amazon EC2 (Elastic Compute Cloud)",
      description: "Secure and resizable compute capacity in the cloud.",
      steps: [
        "1. Login to the AWS Management Console.",
        "2. Navigate to the EC2 Dashboard and click 'Launch Instance'.",
        "3. Select an Amazon Machine Image (AMI), e.g., Ubuntu or Amazon Linux 2.",
        "4. Choose an Instance Type (e.g., t2.micro for free tier).",
        "5. Configure instance details, storage, and tags.",
        "6. Configure a Security Group to allow SSH (port 22) and HTTP (port 80).",
        "7. Review and Launch, selecting an existing or new key pair for access."
      ]
    },
    {
      name: "Amazon S3 (Simple Storage Service)",
      description: "Object storage service offering industry-leading scalability, data availability, security, and performance.",
      steps: [
        "1. Open the Amazon S3 console.",
        "2. Click 'Create bucket' and enter a global unique bucket name.",
        "3. Choose the AWS Region.",
        "4. Set block public access settings according to your needs.",
        "5. Enable or disable bucket versioning.",
        "6. Click 'Create bucket'.",
        "7. Upload files by clicking on the bucket and selecting 'Upload'."
      ]
    },
    {
      name: "Amazon RDS (Relational Database Service)",
      description: "Set up, operate, and scale a relational database in the cloud with just a few clicks.",
      steps: [
        "1. Navigate to the RDS Dashboard.",
        "2. Click 'Create database'.",
        "3. Choose a database creation method (Standard or Easy create).",
        "4. Select the engine type (e.g., MySQL, PostgreSQL).",
        "5. Choose your DB instance size (e.g., db.t3.micro).",
        "6. Configure master username and password.",
        "7. Set up VPC and security groups to allow traffic to the DB port.",
        "8. Click 'Create database'."
      ]
    }
  ];

  return (
    <article className="prose max-w-none">
      <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-4 mb-6">
        AWS Complete Reference & Services
      </h1>
      
      <p className="text-gray-700 text-lg mb-8 leading-relaxed">
        Amazon Web Services (AWS) is the world's most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold bg-green-50 text-gfg-green border-l-4 border-gfg-green p-3 mb-6 shadow-sm mt-8">
          Key AWS Services & Setup Steps
        </h2>
        <div className="flex flex-col gap-8">
          {awsServices.map((svc, i) => (
            <div key={i} className="bg-white border text-left border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{svc.name}</h3>
              <p className="text-gray-600 mb-4">{svc.description}</p>
              
              <div className="bg-gray-50 rounded p-4 font-mono text-sm border-l-2 border-gfg-green text-gray-700">
                <span className="font-bold block mb-2 text-gray-900">Setup Steps:</span>
                <ul className="list-none p-0 m-0 space-y-1">
                  {svc.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {tutorials && (
        <section className="mt-12 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Official Documentation & Tutorials</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {tutorials.links.map((t: any, i: number) => (
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
          </ul>
        </section>
      )}
    </article>
  );
};

export default AWSPage;
