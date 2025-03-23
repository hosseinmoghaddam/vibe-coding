'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Navigation from '../../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '@/lib/translations';
import toast from 'react-hot-toast';

interface Post {
  ID: number;
  title: string;
  content: string;
  user: {
    username: string;
  };
  CreatedAt: string;
}

export default function PostDetail({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();
  const { token } = useAuth();
  const { currentLang } = useLanguage();
  const t = translations[currentLang];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${params.id}`);
        const postData = response.data;
        // Map Content to content
        setPost({
          ...postData,
          content: postData.content
        });
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error(t.loadError);
        router.push('/');
      }
    };

    fetchPost();
  }, [params.id, router, t]);

  const handleDelete = async () => {
    if (!token) {
      toast.error(t.loginRequired);
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/posts/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(t.deleteSuccess);
      router.push('/');
    } catch (error) {
      toast.error(t.deleteError);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8">
              <p className="text-center text-muted-foreground">{t.loading}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">{post.title}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {t.by} {post.user?.username || t.unknownUser} • {new Date(post.CreatedAt).toLocaleDateString(currentLang === 'fa' ? 'fa-IR' : 'en-US')}
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
              {post.content}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push('/')}
            >
              {t.backToPosts}
            </Button>
            {token && (
              <Button
                variant="destructive"
                onClick={handleDelete}
              >
                {t.deletePost}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
