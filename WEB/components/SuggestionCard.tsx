'use client';

import { Box, Flex, Text, Avatar, Button } from '@radix-ui/themes';
import { paletteColors } from '@/theme/theme';
import { useLanguage } from '@/contexts/LanguageContext';

interface SuggestionCardProps {
  name: string;
  mutualFriend?: string;
  status?: string;
  avatar?: string;
}

export default function SuggestionCard({ name, mutualFriend, status, avatar }: SuggestionCardProps) {
  const { t } = useLanguage();
  const displayStatus = status || t('feed.suggestions.newMember');
  
  return (
    <Flex
      gap="3"
      align="center"
      p="2"
      style={{
        borderRadius: 'var(--radius-2)',
        transition: 'background-color 0.2s',
        cursor: 'pointer',
      }}
      className="hover:bg-gray-2"
    >
      <Avatar
        fallback={name[0]}
        size="3"
        radius="full"
        style={{
          backgroundColor: paletteColors.moccasin,
          color: paletteColors.darkSlateGray,
          flexShrink: 0,
        }}
      />
      <Box style={{ flex: 1, minWidth: 0 }}>
        <Text
          size="2"
          weight="bold"
          as="div"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: 'var(--gray-12)',
          }}
        >
          {name}
        </Text>
        <Text
          size="1"
          color="gray"
          as="div"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: 2,
          }}
        >
          {mutualFriend ? `${t('feed.suggestions.mutual')}: ${mutualFriend}` : displayStatus}
        </Text>
      </Box>
      <Button
        size="1"
        variant="soft"
        style={{
          backgroundColor: paletteColors.steelBlue,
          color: 'white',
          flexShrink: 0,
          padding: '4px 12px',
        }}
      >
        {t('feed.suggestions.add')}
      </Button>
    </Flex>
  );
}
