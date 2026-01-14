'use client';

import { Box, Flex, Text, Avatar, Button, TextArea, Separator, IconButton } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, ImageIcon, VideoIcon, FaceIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { paletteColors } from '@/theme/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authorName?: string;
  authorInitials?: string;
}

export default function CreatePostModal({
  open,
  onOpenChange,
  authorName = 'You',
  authorInitials = 'U',
}: CreatePostModalProps) {
  const { t } = useLanguage();
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) return;
    
    setIsPosting(true);
    // TODO: Add actual post creation logic
    setTimeout(() => {
      setIsPosting(false);
      setContent('');
      onOpenChange(false);
    }, 1000);
  };

  const handleClose = () => {
    setContent('');
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            inset: 0,
            zIndex: 50,
          }}
        />
        <Dialog.Content
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: 'var(--radius-4)',
            padding: '24px',
            maxWidth: 600,
            width: '90vw',
            maxHeight: '90vh',
            overflow: 'auto',
            zIndex: 51,
            boxShadow: 'var(--shadow-4)',
          }}
        >
          <Flex direction="column" gap="4">
            {/* Header */}
            <Flex justify="between" align="center">
              <Text size="4" weight="bold">{t('modal.createPost.title')}</Text>
              <Dialog.Close asChild>
                <IconButton variant="ghost" color="gray" size="2">
                  <Cross2Icon />
                </IconButton>
              </Dialog.Close>
            </Flex>

            <Separator size="4" />

            {/* Author Info */}
            <Flex gap="3" align="center">
              <Avatar
                fallback={authorInitials}
                size="4"
                radius="full"
                style={{
                  backgroundColor: paletteColors.moccasin,
                  color: paletteColors.darkSlateGray,
                  border: `2px solid ${paletteColors.lightBlue}`,
                }}
              />
              <Box>
                <Text size="3" weight="bold" as="div">{authorName}</Text>
                <Text size="1" color="gray" as="div">{t('modal.createPost.shareWith')}</Text>
              </Box>
            </Flex>

            {/* Content Input */}
            <TextArea
              placeholder={t('modal.createPost.placeholder')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              size="3"
              style={{
                minHeight: 150,
                resize: 'vertical',
                fontSize: '16px',
                lineHeight: 1.5,
              }}
            />

            {/* Media Options */}
            <Flex gap="2" align="center" style={{ padding: '12px', backgroundColor: 'var(--gray-2)', borderRadius: 'var(--radius-3)' }}>
              <Text size="2" weight="medium" color="gray" style={{ marginRight: 'auto' }}>{t('modal.createPost.addToPost')}</Text>
              <Button variant="ghost" color="gray" size="2">
                <ImageIcon /> {t('feed.createPost.photo')}
              </Button>
              <Button variant="ghost" color="gray" size="2">
                <VideoIcon /> {t('feed.createPost.video')}
              </Button>
              <Button variant="ghost" color="gray" size="2">
                <FaceIcon /> {t('feed.createPost.feeling')}
              </Button>
            </Flex>

            <Separator size="4" />

            {/* Actions */}
            <Flex justify="end" gap="3">
              <Dialog.Close asChild>
                <Button variant="soft" color="gray" onClick={handleClose}>
                  {t('modal.createPost.cancel')}
                </Button>
              </Dialog.Close>
              <Button
                variant="solid"
                style={{
                  backgroundColor: paletteColors.steelBlue,
                  color: 'white',
                  cursor: content.trim() && !isPosting ? 'pointer' : 'not-allowed',
                  opacity: content.trim() && !isPosting ? 1 : 0.6,
                }}
                onClick={handlePost}
                disabled={!content.trim() || isPosting}
              >
                {isPosting ? (
                  <>{t('modal.createPost.posting')}</>
                ) : (
                  <>
                    <PaperPlaneIcon /> {t('modal.createPost.post')}
                  </>
                )}
              </Button>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
