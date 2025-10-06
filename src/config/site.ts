export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ProjectLink {
  type: 'github' | 'steam' | 'download' | 'website' | 'video';
  url: string;
  label?: string;
}

export type ProjectContentComponent =
  | { type: 'text'; content: string; }
  | { type: 'heading'; content: string; level?: 1 | 2 | 3; }
  | { type: 'image'; src: string; alt?: string; width?: string; caption?: string; }
  | { type: 'video'; youtubeId: string; width?: string; caption?: string; }
  | { type: 'gallery'; images: Array<{ src: string; alt?: string; }>; columns?: number; }
  | { type: 'link'; url: string; label: string; icon?: string; }
  | { type: 'spacer'; height?: string; };

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  videos?: string[];
  links: ProjectLink[];
  tags: string[];
  status: 'released' | 'in-development' | 'concept';
  highlight?: boolean;
  fullDescription?: string;
  content?: ProjectContentComponent[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  skills: string[];
  projects: string[]; // Project IDs
  social: SocialLink[];
  experience: {
    title: string;
    company?: string;
    period: string;
    description: string;
  }[];
}

export interface SiteConfig {
  name: string;
  description: string;
  font: {
    family: string;
    url?: string;
    file?: string;
  };
  about: {
    title: string;
    content: string;
    mission: string;
  };
  projects: Project[];
  team: TeamMember[];
  social: SocialLink[];
  supporters: string[];
}

export const siteConfig: SiteConfig = {
  name: "NnStdios",
  description: "Innovative Game Development Studio",
  font: {
    family: "Maple Mono NF CN",
    file: "/fonts/MapleMono-NF-CN-Regular.ttf"
  },
  about: {
    title: "About NnStdios",
    content: "We are a passionate team of game developers, artists, and storytellers dedicated to creating immersive gaming experiences. Founded with the vision of pushing the boundaries of interactive entertainment, we combine cutting-edge technology with creative storytelling to deliver games that resonate with players worldwide.",
    mission: "Our mission is to craft memorable gaming experiences that inspire, challenge, and entertain. We believe in the power of games to bring people together and create lasting memories."
  },
  projects: [
    {
      id: "Katana",
      title: "Katana Game",
      description: "Full on autism game made for GameJam.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXfbykPwDhVzW1yeXr_s_A-fvEaQh9FddtqQ&s",
      images: [
        "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1200"
      ],
      videos: ["https://www.youtube.com/watch?v=kSWAupZP30o"],
      links: [
        { type: 'steam', url: 'https://store.steampowered.com/app/123456', label: 'Steam Store' },
        { type: 'github', url: 'https://github.com/NnStdios/neon-runners' },
        { type: 'website', url: 'https://neonrunners.NnStdios.com' }
      ],
      tags: ['Autism', 'Katana', 'Slicing'],
      status: 'in-development',
      highlight: true,
      fullDescription: "Just full autism idea four lobotomites had in their head.",
      content: [
        { type: 'heading', content: 'About This Project', level: 2 },
        { type: 'text', content: 'Just full autism idea four lobotomites had in their head.' },
        { type: 'spacer', height: '2rem' },
        { type: 'video', youtubeId: 'kSWAupZP30o', width: '100%', caption: 'Game Trailer' },
        { type: 'spacer', height: '2rem' },
        { type: 'heading', content: 'Screenshots', level: 2 },
        { type: 'gallery', images: [
          { src: '/images/daler_chin.jpg', alt: 'Screenshot 1' },
          { src: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Screenshot 2' }
        ], columns: 1 }
      ]
    },
    {
      id: "project-2",
      title: "Mystic Realms",
      description: "An epic fantasy RPG with rich storytelling and immersive world-building.",
      image: "https://images.pexels.com/photos/194096/pexels-photo-194096.jpeg?auto=compress&cs=tinysrgb&w=600",
      images: [
        "https://images.pexels.com/photos/194096/pexels-photo-194096.jpeg?auto=compress&cs=tinysrgb&w=1200"
      ],
      links: [
        { type: 'github', url: 'https://github.com/NnStdios/mystic-realms' },
        { type: 'website', url: 'https://mysticroalms.NnStdios.com' }
      ],
      tags: ['RPG', 'Fantasy', 'Adventure'],
      status: 'in-development',
      highlight: true,
      fullDescription: "Dive into a world of magic and mystery in Mystic Realms. This expansive RPG features a deep narrative, complex character progression, and a vast open world filled with secrets to discover. Choose your path, forge alliances, and shape the destiny of the realm."
    },
    {
      id: "project-3",
      title: "Space Colony",
      description: "Build and manage your own space station in this strategic simulation game.",
      image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=600",
      links: [
        { type: 'github', url: 'https://github.com/NnStdios/space-colony' }
      ],
      tags: ['Simulation', 'Strategy', 'Sci-Fi'],
      status: 'concept'
    }
  ],
  team: [
    {
      id: "nn",
      name: "Enenra",
      role: "Lead Developer & Founder",
      avatar: "https://cdn.discordapp.com/avatars/576156118519119894/3c0ef3df49323117bff784525db29ec2.webp?size=1024",
      bio: "Passionate game developer with 5+ years of experience in creating immersive gaming experiences. Specializes in unity.",
      skills: ["Unity", "C#", "Game Design", "Level Design", "Team Leadership"],
      projects: ["Katana"],
      social: [
        { name: "GitHub", url: "https://github.com/nnra6864", icon: "github" },
        { name: "LinkedIn", url: "https://linkedin.com/in/alexjohnson", icon: "linkedin" },
        { name: "Twitter", url: "https://twitter.com/alexjohnson", icon: "twitter" }
      ],
      experience: [
        {
          title: "Lead Developer",
          company: "NnStdios",
          period: "2020 - Present",
          description: "Leading development of multiple AAA game projects, managing technical architecture and team coordination."
        },
        {
          title: "Senior Game Developer",
          company: "GameCorp",
          period: "2018 - 2020",
          description: "Developed core gameplay systems and optimization for mobile and PC platforms."
        }
      ]
    },
    {
      id: "darko",
      name: "Darko Jeremić",
      role: "Art Director & Co-Founder",
      avatar: "https://cdn.discordapp.com/avatars/171604199300268032/eec0c0c900ce61b60e47ec14c0bf9ac3.webp?size=1024",
      bio: "Specializes in Blender and Maya. Very good modeler and UV Mapper.",
      skills: ["Mr. Modeler", "UV Maps"],
      projects: ["Katana"],
      social: [
        { name: "ArtStation", url: "https://artstation.com/sarahchen", icon: "palette" },
        { name: "Instagram", url: "https://instagram.com/sarahchen_art", icon: "instagram" }
      ],
      experience: [
        {
          title: "Art Director",
          company: "NnStdios",
          period: "2020 - Present",
          description: "Overseeing visual direction and art pipeline for all studio projects."
        },
        {
          title: "3D Artist",
          company: "Visual Studios",
          period: "2017 - 2020",
          description: "Created high-quality 3D assets and environments for various gaming projects."
        }
      ]
    },
    {
      id: "troshe",
      name: "Trowe",
      role: "Model texturer",
      avatar: "https://cdn.discordapp.com/avatars/521032505344655380/a5b1ceebaabbdac8e32f689977ecb701.webp?size=1024",
      bio: "Specializes in creating textures for models.",
      skills: ["Texture Maker", "Level Designer"],
      projects: ["Katana"],
      social: [
        { name: "SoundCloud", url: "https://soundcloud.com/mikerodriguez", icon: "music" },
        { name: "LinkedIn", url: "https://linkedin.com/in/mikerodriguez", icon: "linkedin" }
      ],
      experience: [
        {
          title: "Model Texturer",
          company: "NnStdios",
          period: "2023 - Present",
          description: "Crafting immersive audio experiences and memorable soundtracks for studio games."
        },
        {
          title: "Freelance Composer",
          period: "2020 - Present",
          description: "Created music and sound effects for indie game developers and multimedia projects."
        }
      ]
    }
  ],
  social: [
    { name: "Twitter", url: "https://twitter.com/NnStdios", icon: "fab fa-twitter" },
    { name: "Discord", url: "https://discord.gg/NnStdios", icon: "fab fa-discord" },
    { name: "YouTube", url: "https://youtube.com/@NnStdios", icon: "fab fa-youtube" },
    { name: "GitHub", url: "https://github.com/NnStdios", icon: "fab fa-github" },
    { name: "GitLab", url: "https://gitlab.com/NnStdios", icon: "fab fa-gitlab" },
    { name: "Telegram", url: "https://t.me/NnStdios", icon: "fab fa-telegram" }
  ],
  supporters: [
    "Troshe",
    "Nemera",
    "Darko Jeremić"
  ]
};