'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'he' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  he: {
    // Navigation
    'nav.search': 'חיפוש...',
    'nav.feed': 'פיד',
    'nav.chats': 'צ\'אטים',
    'nav.friends': 'חברים',
    'nav.settings': 'הגדרות',
    'nav.messages': 'הודעות',
    'nav.notifications': 'התראות',
    
    // Post Feed
    'feed.createPost.placeholder': 'מה אתה חושב, יוחנן?',
    'feed.createPost.photo': 'תמונה',
    'feed.createPost.video': 'וידאו',
    'feed.createPost.feeling': 'רגש',
    'feed.stories': 'סיפורים',
    'feed.stories.add': 'הוסף סיפור',
    'feed.suggestions': 'הצעות',
    'feed.suggestions.mutual': 'חבר משותף',
    'feed.suggestions.newMember': 'חבר חדש',
    'feed.suggestions.add': 'הוסף',
    
    // Post Card
    'post.like': 'לייק',
    'post.comment': 'תגובה',
    'post.share': 'שתף',
    'post.likes': 'לייקים',
    'post.comments': 'תגובות',
    'post.communityMember': 'חבר קהילה',
    
    // Create Post Modal
    'modal.createPost.title': 'צור פוסט',
    'modal.createPost.shareWith': 'שתף עם הקהילה שלך',
    'modal.createPost.placeholder': 'מה אתה חושב?',
    'modal.createPost.addToPost': 'הוסף לפוסט שלך:',
    'modal.createPost.cancel': 'ביטול',
    'modal.createPost.post': 'פרסם',
    'modal.createPost.posting': 'מפרסם...',
    
    // Profile
    'profile.followers': 'עוקבים',
    'profile.following': 'עוקב אחרי',
    'profile.edit': 'ערוך',
    'profile.improve': 'שפר פרופיל',
    'profile.improveBio': 'הוסף ביוגרפיה כדי לקבל יותר עוקבים.',
    'profile.activities': 'הפעילויות שלי',
    'profile.saved': 'שמורים',
    'profile.noPosts': 'אין פוסטים עדיין',
    'profile.createPost': 'צור פוסט',
    
    // Chat
    'chat.online': 'מחובר',
    'chat.typeMessage': 'הקלד הודעה...',
    'chat.search': 'חפש צ\'אטים...',
    
    // Login/Signup
    'auth.welcomeBack': 'ברוך שובך',
    'auth.loginToAccount': 'התחבר לחשבון שלך',
    'auth.continueGitHub': 'המשך עם GitHub',
    'auth.continueMicrosoft': 'המשך עם Microsoft',
    'auth.loginWithEmail': 'או התחבר עם אימייל',
    'auth.email': 'אימייל',
    'auth.password': 'סיסמה',
    'auth.forgotPassword': 'שכחת סיסמה?',
    'auth.login': 'התחבר',
    'auth.noAccount': 'אין לך חשבון?',
    'auth.signup': 'הירשם',
    'auth.join': 'הצטרף לקיבוץ',
    'auth.startJourney': 'התחל את המסע שלך היום',
    'auth.firstName': 'שם פרטי',
    'auth.lastName': 'שם משפחה',
    'auth.dateOfBirth': 'תאריך לידה',
    'auth.day': 'יום',
    'auth.month': 'חודש',
    'auth.year': 'שנה',
    'auth.agreeTerms': 'אני מסכים לתנאים וההגבלות',
    'auth.signupButton': 'הירשם',
    'auth.haveAccount': 'יש לך כבר חשבון?',
    
    // Landing
    'landing.welcome': 'ברוכים הבאים ל',
    'landing.tagline': 'התחבר, שתף ושגשג יחד.',
    'landing.continueGoogle': 'המשך עם Google',
    'landing.continueMicrosoft': 'המשך עם Microsoft',
    'landing.or': 'או',
    'landing.loginWithEmail': 'התחבר עם אימייל',
    'landing.agreeTerms': 'בהמשך, אתה מסכים לתנאי השירות ומדיניות הפרטיות שלנו.',
  },
  en: {
    // Navigation
    'nav.search': 'Search...',
    'nav.feed': 'Feed',
    'nav.chats': 'Chats',
    'nav.friends': 'Friends',
    'nav.settings': 'Settings',
    'nav.messages': 'Messages',
    'nav.notifications': 'Notifications',
    
    // Post Feed
    'feed.createPost.placeholder': 'What\'s on your mind, John?',
    'feed.createPost.photo': 'Photo',
    'feed.createPost.video': 'Video',
    'feed.createPost.feeling': 'Feeling',
    'feed.stories': 'Stories',
    'feed.stories.add': 'Add Story',
    'feed.suggestions': 'Suggestions',
    'feed.suggestions.mutual': 'Mutual Friend',
    'feed.suggestions.newMember': 'New Member',
    'feed.suggestions.add': 'Add',
    
    // Post Card
    'post.like': 'Like',
    'post.comment': 'Comment',
    'post.share': 'Share',
    'post.likes': 'likes',
    'post.comments': 'comments',
    'post.communityMember': 'Community Member',
    
    // Create Post Modal
    'modal.createPost.title': 'Create Post',
    'modal.createPost.shareWith': 'Share with your community',
    'modal.createPost.placeholder': 'What\'s on your mind?',
    'modal.createPost.addToPost': 'Add to your post:',
    'modal.createPost.cancel': 'Cancel',
    'modal.createPost.post': 'Post',
    'modal.createPost.posting': 'Posting...',
    
    // Profile
    'profile.followers': 'Followers',
    'profile.following': 'Following',
    'profile.edit': 'Edit',
    'profile.improve': 'Improve Profile',
    'profile.improveBio': 'Add a bio to get more followers.',
    'profile.activities': 'My Activities',
    'profile.saved': 'Saved',
    'profile.noPosts': 'No posts yet',
    'profile.createPost': 'Create Post',
    
    // Chat
    'chat.online': 'Online',
    'chat.typeMessage': 'Type a message...',
    'chat.search': 'Search chats...',
    
    // Login/Signup
    'auth.welcomeBack': 'Welcome Back',
    'auth.loginToAccount': 'Login to your account',
    'auth.continueGitHub': 'Continue with GitHub',
    'auth.continueMicrosoft': 'Continue with Microsoft',
    'auth.loginWithEmail': 'Or login with email',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot password?',
    'auth.login': 'Login',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.signup': 'Sign up',
    'auth.join': 'Join The Kibbutz',
    'auth.startJourney': 'Start your journey today',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.dateOfBirth': 'Date of Birth',
    'auth.day': 'Day',
    'auth.month': 'Month',
    'auth.year': 'Year',
    'auth.agreeTerms': 'I agree to the Terms and Conditions',
    'auth.signupButton': 'Sign Up',
    'auth.haveAccount': 'Already have an account?',
    
    // Landing
    'landing.welcome': 'Welcome to',
    'landing.tagline': 'Connect, Share, and Thrive together.',
    'landing.continueGoogle': 'Continue with Google',
    'landing.continueMicrosoft': 'Continue with Microsoft',
    'landing.or': 'OR',
    'landing.loginWithEmail': 'Login with Email',
    'landing.agreeTerms': 'By continuing, you agree to our Terms of Service and Privacy Policy.',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('he');

  useEffect(() => {
    // Load language from localStorage or default to Hebrew
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'he' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Update HTML dir and lang attributes
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    // Set initial dir and lang
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.he] || key;
  };

  const dir = language === 'he' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
