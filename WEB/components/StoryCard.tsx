'use client';

import { Box, Avatar, Text } from '@radix-ui/themes';
import { paletteColors } from '@/theme/theme';
import { useLanguage } from '@/contexts/LanguageContext';

interface StoryCardProps {
  name: string;
  avatar?: string;
  image?: string;
  isAddStory?: boolean;
}

export default function StoryCard({ name, avatar, image, isAddStory = false }: StoryCardProps) {
  const { t } = useLanguage();
  
  if (isAddStory) {
    return (
      <Box
        style={{
          minWidth: 80,
          height: 120,
          backgroundColor: 'var(--gray-3)',
          borderRadius: 'var(--radius-3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: '2px dashed var(--gray-6)',
          gap: 8,
        }}
      >
        <Box
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: paletteColors.steelBlue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          +
        </Box>
        <Text size="1" weight="medium" style={{ textAlign: 'center', padding: '0 4px' }}>
          {t('feed.stories.add')}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      style={{
        minWidth: 80,
        height: 120,
        backgroundImage: image ? `url(${image})` : `linear-gradient(135deg, ${paletteColors.steelBlue} 0%, ${paletteColors.lightBlue} 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 'var(--radius-3)',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        border: '2px solid white',
        boxShadow: 'var(--shadow-2)',
      }}
    >
      {/* Gradient overlay */}
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
        }}
      />
      
      {/* Avatar */}
      <Box style={{ position: 'absolute', top: 8, left: 8 }}>
        <Avatar
          fallback={name[0]}
          size="2"
          radius="full"
          style={{
            border: '2px solid white',
            backgroundColor: paletteColors.moccasin,
            color: paletteColors.darkSlateGray,
          }}
        />
      </Box>

      {/* Name */}
      <Text
        size="1"
        weight="bold"
        style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          right: 8,
          color: 'white',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          textAlign: 'center',
        }}
      >
        {name}
      </Text>
    </Box>
  );
}
