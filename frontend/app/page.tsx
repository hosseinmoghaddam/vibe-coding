'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from './components/Navigation';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from './context/LanguageContext';
import { translations } from '@/lib/translations';

interface Post {
  ID: number;
  title: string;
  content: string;
  user: {
    username: string;
  };
  CreatedAt: string;
}

const truncateText = (text: string, maxLength: number) => {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  
  const truncated = trimmed.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.slice(0, lastSpace) + '...';
  }
  
  return truncated + '...';
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token } = useAuth();
  const { currentLang } = useLanguage();
  const t = translations[currentLang];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get('http://localhost:8080/api/posts', { headers });
        const mappedPosts = response.data.map((post: any) => ({
          ...post,
          content: post.content?.trim() || '',
          title: post.title?.trim() || ''
        }));
        setPosts(mappedPosts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {token && (
          <div className="mb-8">
            <Link href="/create">
              <Button className="w-full sm:w-auto">
                {t.createPost}
              </Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.ID} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Link href={`/posts/${post.ID}`}>
                  <CardTitle className="hover:text-primary cursor-pointer">
                    {post.title}
                  </CardTitle>
                </Link>
                <CardDescription>
                  {t.by} {post.user?.username || t.unknownUser} • {new Date(post.CreatedAt).toLocaleDateString(currentLang === 'fa' ? 'fa-IR' : 'en-US')}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="prose prose-sm text-muted-foreground">
                  {truncateText(post.content, 150)}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/posts/${post.ID}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    {t.readMore}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
