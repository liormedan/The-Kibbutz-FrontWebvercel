'use client';

import { Card, Box, Flex, Text, Avatar, Button, Inset, Badge } from '@radix-ui/themes';
import { HeartIcon, ChatBubbleIcon, Share1Icon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { paletteColors } from '@/theme/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

interface PostCardProps {
  author?: string;
  authorInitials?: string;
  content?: string;
  image?: string;
  timeAgo?: string;
  likes?: number;
  comments?: number;
  showImage?: boolean;
}

export default function PostCard({
  author = 'Radix Design',
  authorInitials = 'RD',
  content = 'Exploring the new Radix UI themes! It aligns perfectly with our premium design goals. #DesignSystem #UI',
  image,
  timeAgo = '2 hours ago',
  likes = 0,
  comments = 0,
  showImage = true,
}: PostCardProps) {
  const { t, dir } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <Card size="2" style={{ width: '100%', maxWidth: '100%' }}>
      {/* Header */}
      <Flex gap="3" align="center" mb="3" style={{ direction: dir }}>
        <Avatar
          fallback={authorInitials}
          radius="full"
          size="3"
          style={{
            backgroundColor: paletteColors.moccasin,
            color: paletteColors.darkSlateGray,
            border: `2px solid ${paletteColors.lightBlue}`,
            order: dir === 'rtl' ? 3 : 1,
          }}
        />
        <Box style={{ flex: 1, minWidth: 0, order: dir === 'rtl' ? 2 : 2, textAlign: dir === 'rtl' ? 'right' : 'left' }}>
          <Flex align="center" gap="2" style={{ direction: dir, justifyContent: dir === 'rtl' ? 'flex-end' : 'flex-start' }}>
            <Text as="div" size="2" weight="bold" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: dir === 'rtl' ? 'right' : 'left', width: '100%' }}>
              {author}
            </Text>
            {timeAgo && (
              <Badge size="1" variant="soft" color="gray" style={{ flexShrink: 0 }}>
                {timeAgo}
              </Badge>
            )}
          </Flex>
          <Text as="div" size="1" color="gray" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>
            {t('post.communityMember')}
          </Text>
        </Box>
        <Button variant="ghost" color="gray" size="1" style={{ order: dir === 'rtl' ? 1 : 3 }}>
          <DotsHorizontalIcon />
        </Button>
      </Flex>

      {/* Content */}
      <Box mb={showImage ? "3" : "0"} style={{ textAlign: dir === 'rtl' ? 'right' : 'left', direction: dir }}>
        <Text size="3" style={{ lineHeight: 1.6, color: 'var(--gray-12)', textAlign: dir === 'rtl' ? 'right' : 'left', direction: dir, display: 'block', width: '100%' }}>
          {content}
        </Text>
      </Box>

      {/* Image */}
      {showImage && (
        <Inset side="x" mb="3" clip="padding-box">
          <Box
            style={{
              height: 300,
              backgroundColor: image ? 'transparent' : paletteColors.lightBlue,
              backgroundImage: image ? `url(${image})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-3)',
              overflow: 'hidden',
            }}
          >
            {!image && (
              <Text size="5" style={{ color: paletteColors.darkSlateGray, opacity: 0.4, fontWeight: 'bold' }}>
                Post Image
              </Text>
            )}
          </Box>
        </Inset>
      )}

      {/* Stats */}
      {(likeCount > 0 || comments > 0) && (
        <Flex gap="4" align="center" mb="2" style={{ padding: '0 4px', direction: dir, justifyContent: dir === 'rtl' ? 'flex-end' : 'flex-start' }}>
          {likeCount > 0 && (
            <Text size="1" color="gray" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>
              {likeCount} {t('post.likes')}
            </Text>
          )}
          {comments > 0 && (
            <Text size="1" color="gray" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>
              {comments} {t('post.comments')}
            </Text>
          )}
        </Flex>
      )}

      {/* Actions */}
      <Flex gap="2" align="center" style={{ borderTop: '1px solid var(--gray-4)', paddingTop: 12 }}>
        <Button
          variant="ghost"
          color={isLiked ? 'red' : 'gray'}
          size="2"
          onClick={handleLike}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <HeartIcon style={{ fill: isLiked ? 'currentColor' : 'none' }} /> {t('post.like')}
        </Button>
        <Button
          variant="ghost"
          color="gray"
          size="2"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <ChatBubbleIcon /> {t('post.comment')}
        </Button>
        <Button
          variant="ghost"
          color="gray"
          size="2"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <Share1Icon /> {t('post.share')}
        </Button>
      </Flex>
    </Card>
  );
}
