import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  github?: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}