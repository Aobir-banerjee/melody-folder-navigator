
import React from 'react';
import { PROJECTS } from '@/lib/constants';
import { ExternalLink, Github } from 'lucide-react';

const ProjectFolder: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">My Projects</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {PROJECTS.map((project) => (
          <div 
            key={project.id}
            className="glass-panel p-4 hover-scale"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3 aspect-video overflow-hidden rounded-md">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-muted-foreground mt-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-secondary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 mt-4">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                  
                  {project.repoUrl && (
                    <a 
                      href={project.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <Github size={14} />
                      Repository
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectFolder;
