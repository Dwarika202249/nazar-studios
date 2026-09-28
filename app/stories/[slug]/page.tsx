import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { stories, Story } from '@/content/stories';
import { StoryDetailClient } from './StoryDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return stories.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) return { title: 'Story Not Found — NAZAR' };

  return {
    title: `${story.couple} — Wedding Story | NAZAR`,
    description: `${story.intro} Documented at ${story.venue}, ${story.city} by NAZAR.`,
  };
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  // Find next story for scrollytelling teaser
  const currentIndex = stories.findIndex((s) => s.slug === slug);
  const nextStory = stories[(currentIndex + 1) % stories.length];

  return <StoryDetailClient story={story} nextStory={nextStory} />;
}
