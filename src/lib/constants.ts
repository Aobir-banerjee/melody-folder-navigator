
export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
}

export const MUSIC_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Electronic Dreams',
    artist: 'You',
    duration: 185,
    coverUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=electronic-future-beats-117997.mp3',
  },
  {
    id: '2',
    title: 'Ambient Flow',
    artist: 'You',
    duration: 240,
    coverUrl: 'https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d16737dc28.mp3?filename=ambient-piano-amp-strings-10711.mp3',
  },
  {
    id: '3',
    title: 'Chill Sunset',
    artist: 'You',
    duration: 210,
    coverUrl: 'https://images.unsplash.com/photo-1548130858-c35fe7c92768?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/06/14/audio_958a24bc76.mp3?filename=chill-abstract-intention-12099.mp3',
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Music Visualizer',
    description: 'An interactive music visualizer created with Three.js and Web Audio API',
    tags: ['Three.js', 'Web Audio', 'JavaScript'],
    imageUrl: 'https://images.unsplash.com/photo-1616424625127-cda59ecef870?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    demoUrl: 'https://example.com/demo',
    repoUrl: 'https://github.com/yourusername/visualizer',
  },
  {
    id: '2',
    title: 'Beat Maker App',
    description: 'A browser-based application for creating drum patterns and beats',
    tags: ['React', 'Web Audio', 'CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1493225277624-f3f94c036a1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    demoUrl: 'https://example.com/beatmaker',
    repoUrl: 'https://github.com/yourusername/beatmaker',
  },
  {
    id: '3',
    title: 'Audio Processing Tool',
    description: 'A tool for basic audio processing with effects like reverb, delay, and EQ',
    tags: ['Web Audio', 'JavaScript', 'DSP'],
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    demoUrl: 'https://example.com/audioprocessor',
    repoUrl: 'https://github.com/yourusername/audio-processor',
  }
];

export const PORTFOLIO_URL = 'https://aobir-banerjee.github.io/my-portfolio/';
