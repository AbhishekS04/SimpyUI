"use client"

import { useMemo } from 'react'
import { SocialStories } from './social-stories'

export default function SocialStoriesDemo() {
  const stories = useMemo(() => [
    {
      id: '1',
      platform: 'instagram' as const,
      mediaUrl: 'https://rdxqqgntmtzvqsmepmls.supabase.co/storage/v1/object/public/assets/videos/original/d5521455-f668-481c-85a4-2ab10f49d580.mp4',
      linkUrl: 'https://instagram.com',
      caption: '',
      duration: 5,
    },
    {
      id: '2',
      platform: 'instagram' as const,
      mediaUrl: 'https://rdxqqgntmtzvqsmepmls.supabase.co/storage/v1/object/public/assets/videos/original/8a98fec1-5439-4cb3-8eb2-f0d605204397.mp4',
      linkUrl: 'https://instagram.com',
      caption: '',
      duration: 7,
    },
    {
      id: '3',
      platform: 'instagram' as const,
      mediaUrl: 'https://rdxqqgntmtzvqsmepmls.supabase.co/storage/v1/object/public/assets/videos/original/44fe63af-47e0-4df6-8fc3-0a984c7337da.mp4',
      linkUrl: 'https://instagram.com',
      caption: '',
      duration: 6,
    },
  ], [])

  const profile = useMemo(() => ({
    name: 'Abhishek Singh',
    avatarUrl: 'https://rdxqqgntmtzvqsmepmls.supabase.co/storage/v1/object/public/assets/original/68e0efce-84a4-42ae-9bd7-a2be6aca73d8.jpg',
  }), [])

  return <SocialStories stories={stories} profile={profile} />
}
