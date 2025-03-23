'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  en: {
    blogApp: 'Blog App',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    createPost: 'Create Post'
  },
  fa: {
    blogApp: 'وبلاگ',
    login: 'ورود',
    register: 'ثبت نام',
    logout: 'خروج',
    createPost: 'ایجاد پست'
  }
};

export default function Navigation() {
  const { token, logout } = useAuth();
  const { currentLang, isRTL } = useLanguage();
  const t = translations[currentLang];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:text-primary">
          {t.blogApp}
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageToggle />
          {token ? (
            <Button variant="ghost" onClick={logout}>
              {t.logout}
            </Button>
          ) : (
            <div className="flex gap-4">
              <Link href="/login">
                <Button variant="ghost">{t.login}</Button>
              </Link>
              <Link href="/register">
                <Button>{t.register}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
