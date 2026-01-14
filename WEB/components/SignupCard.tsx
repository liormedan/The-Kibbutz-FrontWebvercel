'use client';

import { Card, Box, Flex, Text, Button, TextField, Select, Checkbox, Heading, Link } from '@radix-ui/themes';
import { paletteColors } from '@/theme/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';

export default function SignupCard() {
    const { t } = useLanguage();
    const router = useRouter();

    const handleSignup = () => {
        // TODO: Add signup logic here
        router.push('/feed');
    };

    return (
        <Card size="3" style={{ maxWidth: 500, width: '100%', margin: '0 auto', backgroundColor: paletteColors.lavenderBlush }}>
            <Box style={{ backgroundColor: paletteColors.moccasin, padding: '24px', borderRadius: 'var(--radius-3)', marginTop: '-12px', marginLeft: '-12px', marginRight: '-12px', textAlign: 'center' }}>
                <Heading size="6" style={{ color: paletteColors.darkSlateGray }}>{t('auth.join')}</Heading>
                <Text size="2" style={{ color: paletteColors.darkSlateGray }}>{t('auth.startJourney')}</Text>
            </Box>

            <Flex direction="column" gap="4" mt="4">
                <Flex gap="3">
                    <Box flexGrow="1">
                        <Text as="label" size="2" weight="bold">{t('auth.firstName')}</Text>
                        <TextField.Root placeholder={t('auth.firstName')} size="3" />
                    </Box>
                    <Box flexGrow="1">
                        <Text as="label" size="2" weight="bold">{t('auth.lastName')}</Text>
                        <TextField.Root placeholder={t('auth.lastName')} size="3" />
                    </Box>
                </Flex>

                <Box>
                    <Text as="label" size="2" weight="bold" mb="1" style={{ display: 'block' }}>{t('auth.dateOfBirth')}</Text>
                    <Flex gap="2">
                        <Select.Root defaultValue="1">
                            <Select.Trigger placeholder={t('auth.day')} />
                            <Select.Content>
                                <Select.Item value="1">1</Select.Item>
                                <Select.Item value="2">2</Select.Item>
                            </Select.Content>
                        </Select.Root>
                        <Select.Root defaultValue="jan">
                            <Select.Trigger placeholder={t('auth.month')} />
                            <Select.Content>
                                <Select.Item value="jan">January</Select.Item>
                                <Select.Item value="feb">February</Select.Item>
                            </Select.Content>
                        </Select.Root>
                        <Select.Root defaultValue="2000">
                            <Select.Trigger placeholder={t('auth.year')} />
                            <Select.Content>
                                <Select.Item value="2000">2000</Select.Item>
                                <Select.Item value="1999">1999</Select.Item>
                            </Select.Content>
                        </Select.Root>
                    </Flex>
                </Box>

                <Box>
                    <Text as="label" size="2" weight="bold">{t('auth.email')}</Text>
                    <TextField.Root placeholder="example@email.com" size="3" />
                </Box>

                <Box>
                    <Text as="label" size="2" weight="bold">{t('auth.password')}</Text>
                    <TextField.Root placeholder={t('auth.password')} type="password" size="3" />
                </Box>

                <Flex align="center" gap="2">
                    <Checkbox />
                    <Text size="2">{t('auth.agreeTerms')}</Text>
                </Flex>

                <Button size="3" variant="solid" style={{ backgroundColor: paletteColors.darkSlateGray, cursor: 'pointer' }} onClick={handleSignup}>
                    {t('auth.signupButton')}
                </Button>
            </Flex>

            <Flex justify="center" mt="2">
                <Text size="2">{t('auth.haveAccount')} <Link href="/login" size="2" weight="bold">{t('auth.login')}</Link></Text>
            </Flex>
        </Card>
    );
}
