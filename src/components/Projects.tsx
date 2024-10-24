import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectDetails from './ProjectDetails';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory management',
    longDescription: 'A comprehensive e-commerce solution built with React, Node.js, and MongoDB. Features include real-time inventory tracking, secure payment processing, and an intuitive admin dashboard.',
    image: '/projects/ecommerce.jpg',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
    features: [
      'Real-time inventory management',
      'Secure payment processing',
      'Admin dashboard',
      'Order tracking system'
    ],
    challenges: [
      'Implementing real-time updates across multiple clients',
      'Optimizing database queries for large product catalogs',
      'Ensuring secure payment processing'
    ],
    demoLink: 'https://demo-link-1.com',
    githubLink: 'https://github.com/yourusername/project1',
    category: 'Web',
    screenshots: [
      '/projects/ecommerce-1.jpg',
      '/projects/ecommerce-2.jpg',
      '/projects/ecommerce-3.jpg'
    ]
  },
  {
    title: 'Fitness Tracking App',
    description: 'Mobile app for tracking workouts and nutrition with AI-powered recommendations',
    longDescription: 'A comprehensive fitness tracking application built with Flutter and Firebase. Features include workout planning, progress tracking, and AI-powered meal recommendations.',
    image: '/projects/fitness.jpg',
    techStack: ['Flutter', 'Firebase', 'TensorFlow Lite'],
    features: [
      'Personalized workout plans',
      'Nutrition tracking',
      'Progress analytics',
      'Social features'
    ],
    challenges: [
      'Implementing offline functionality',
      'Optimizing AI model for mobile devices',
      'Managing complex state across multiple features'
    ],
    demoLink: 'https://demo-link-2.com',
    githubLink: 'https://github.com/yourusername/project2',
    category: 'Mobile',
    screenshots: [
      '/projects/fitness-1.jpg',
      '/projects/fitness-2.jpg',
      '/projects/fitness-3.jpg'
    ]
  }
];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        
        <motion.div
          className="mb-8 flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {['All', 'Web', 'Mobile'].map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                filter === category ? 'btn-primary' : 'card'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card card rounded-lg overflow-hidden shadow-lg"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              onClick={() => setSelectedProject(project)}
            >
              <motion.img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="mb-4 text-secondary">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="skill-tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <motion.button 
                  className="btn-primary px-6 py-3 rounded-full w-full font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedProject(project)}
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectDetails
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;