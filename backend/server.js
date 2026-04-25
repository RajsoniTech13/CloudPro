const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require('dotenv').config();

const User = require("./models/user");
const Feedback = require("./models/feedback");
const Blog = require("./models/blog");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/testdb";
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/api", (req, res) => {
  res.json({ message: "CloudPro Backend API running" });
});

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'User registered', token, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Logged in', token, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

app.get('/api/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!message) return res.status(400).json({ message: 'Message required' });
    const fb = new Feedback({ name, email, message });
    await fb.save();
    res.json({ message: 'Feedback saved' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).limit(5);
    res.json(feedbacks);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    let blogs = await Blog.find().sort({ createdAt: -1 });
    if (!blogs || blogs.length === 0) {
      const sample = [
        {
          title: 'Docker Basics',
          summary: 'Introduction to Docker and container concepts.',
          content: 'Docker is a container runtime that packages applications and their dependencies into a standardized unit for software development.',
          tags: ['docker']
        },
        {
          title: 'Docker Commands Cheat Sheet',
          summary: 'Useful Docker commands and examples.',
          content: 'Common commands: docker build, docker run, docker ps, docker images, docker rm, docker rmi, docker-compose up.',
          tags: ['docker', 'commands']
        }
      ];
      await Blog.insertMany(sample);
      blogs = await Blog.find().sort({ createdAt: -1 });
    }
    res.json(blogs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/about/docker', (req, res) => {
  const about = {
    title: 'Docker Overview',
    description: 'Docker is a platform to develop, ship, and run applications inside containers.',
    commands: [
      { command: 'docker build -t myapp:latest .', description: 'Builds an image from a Dockerfile.' },
      { command: 'docker run -d -p 80:80 myapp:latest', description: 'Runs a container in detached mode mapping port 80.' },
      { command: 'docker ps -a', description: 'Lists running and stopped containers.' },
      { command: 'docker images', description: 'Lists local images.' },
      { command: 'docker rmi IMAGE_ID', description: 'Removes an image.' },
      { command: 'docker rm CONTAINER_ID', description: 'Removes a container.' },
      { command: 'docker-compose up -d', description: 'Starts services defined in docker-compose.yml.' }
    ],
    tutorialLinks: [
      { title: 'Docker Tutorial (TutorialsPoint)', url: 'https://www.tutorialspoint.com/docker/index.htm' },
      { title: 'Docker Official Docs', url: 'https://docs.docker.com/get-started/' }
    ]
  };
  res.json(about);
});

app.get('/api/aws/tutorials', (req, res) => {
  res.json({
    title: 'AWS Tutorials',
    links: [
      { title: 'AWS Tutorial (TutorialsPoint)', url: 'https://www.tutorialspoint.com/aws/index.htm' },
      { title: 'AWS Documentation', url: 'https://docs.aws.amazon.com/' }
    ]
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Server running on port ' + PORT));