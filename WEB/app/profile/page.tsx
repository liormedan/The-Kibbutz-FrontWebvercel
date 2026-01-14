'use client';

import { Box, Card, Flex, Text, Avatar, Heading, Button, TabNav } from '@radix-ui/themes';
import { Pencil1Icon, CheckCircledIcon } from '@radix-ui/react-icons';
import { paletteColors } from '@/theme/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { t } = useLanguage();
  
  return (
    <Box style={{ minHeight: '100vh', padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <Card size="3">
        {/* Header */}
        <Box style={{ backgroundColor: 'var(--accent-9)', padding: '24px 16px', color: 'white', position: 'relative', borderRadius: 'var(--radius-3) var(--radius-3) 0 0' }}>
          <Flex direction="column" align="center">
            <Avatar fallback="JD" size="6" radius="full" style={{ marginBottom: 12, border: '4px solid white', backgroundColor: paletteColors.moccasin, color: paletteColors.darkSlateGray }} />
            <Heading size="4">John Doe</Heading>
            <Text size="2" style={{ opacity: 0.8 }}>@johndoe_dev</Text>

            <Flex gap="4" mt="3">
              <Box style={{ textAlign: 'center' }}>
                <Text weight="bold" size="3" as="div">245</Text>
                <Text size="1" style={{ opacity: 0.8 }}>{t('profile.followers')}</Text>
              </Box>
              <Box style={{ textAlign: 'center' }}>
                <Text weight="bold" size="3" as="div">120</Text>
                <Text size="1" style={{ opacity: 0.8 }}>{t('profile.following')}</Text>
              </Box>
            </Flex>

            <Button variant="outline" size="1" style={{ position: 'absolute', top: 16, right: 16, color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
              <Pencil1Icon /> {t('profile.edit')}
            </Button>
          </Flex>
        </Box>

        {/* Banner */}
        <Box style={{ backgroundColor: paletteColors.lightBlue, padding: '12px 16px' }}>
          <Flex gap="3" align="center">
            <CheckCircledIcon width="24" height="24" color="orange" />
            <Box>
              <Text size="2" weight="bold" as="div">{t('profile.improve')}</Text>
              <Text size="1">{t('profile.improveBio')}</Text>
            </Box>
          </Flex>
        </Box>

        {/* Tabs */}
        <TabNav.Root>
          <TabNav.Link href="#" active>{t('profile.activities')}</TabNav.Link>
          <TabNav.Link href="#">{t('profile.saved')}</TabNav.Link>
        </TabNav.Root>

        {/* Empty State */}
        <Box p="6">
          <Flex direction="column" align="center" gap="2" style={{ opacity: 0.5, marginTop: 40 }}>
            <Text size="2">{t('profile.noPosts')}</Text>
            <Button variant="soft" size="2">{t('profile.createPost')}</Button>
          </Flex>
        </Box>
      </Card>
    </Box>
  );
}
