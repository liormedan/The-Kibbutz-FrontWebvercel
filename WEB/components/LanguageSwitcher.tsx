'use client';

import { Button, Flex } from '@radix-ui/themes';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      color="gray"
      size="2"
      onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
      style={{ minWidth: 60 }}
    >
      {language === 'he' ? 'EN' : 'עברית'}
    </Button>
  );
}
