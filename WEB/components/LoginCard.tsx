'use client';

import { Card, Box, Flex, Text, Button, TextField, Link, Separator, Heading } from '@radix-ui/themes';
import { EnvelopeClosedIcon, LockClosedIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { paletteColors } from '@/theme/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';

export default function LoginCard() {
    const { t } = useLanguage();
    const router = useRouter();

    const handleLogin = () => {
        // TODO: Add authentication logic here
        router.push('/feed');
    };

    return (
        <Card size="3" style={{ maxWidth: 400, width: '100%', margin: '0 auto', backgroundColor: paletteColors.lavenderBlush }}>
            <Flex direction="column" gap="4">
                {/* Header */}
                <Box style={{ backgroundColor: '#2196f3', padding: '24px', borderRadius: 'var(--radius-3)', color: 'white', textAlign: 'center', marginTop: '-12px', marginLeft: '-12px', marginRight: '-12px' }}>
                    <Heading size="6">{t('auth.welcomeBack')}</Heading>
                    <Text size="2" style={{ opacity: 0.9 }}>{t('auth.loginToAccount')}</Text>
                </Box>

                {/* Social Buttons */}
                <Flex direction="column" gap="3">
                    <Button variant="outline" size="3" color="gray" highContrast>
                        <GitHubLogoIcon width="20" height="20" /> {t('auth.continueGitHub')}
                    </Button>
                    <Button variant="outline" size="3" color="blue">
                        {t('auth.continueMicrosoft')}
                    </Button>
                </Flex>

                <Separator size="4" />

                <Text align="center" size="2" color="gray">{t('auth.loginWithEmail')}</Text>

                {/* Form */}
                <Flex direction="column" gap="3">
                    <Box>
                        <Text as="label" size="2" weight="bold">{t('auth.email')}</Text>
                        <TextField.Root placeholder="example@email.com" size="3">
                            <TextField.Slot>
                                <EnvelopeClosedIcon height="16" width="16" />
                            </TextField.Slot>
                        </TextField.Root>
                    </Box>

                    <Box>
                        <Flex justify="between" align="baseline">
                            <Text as="label" size="2" weight="bold">{t('auth.password')}</Text>
                            <Link href="#" size="2">{t('auth.forgotPassword')}</Link>
                        </Flex>
                        <TextField.Root placeholder="********" type="password" size="3">
                            <TextField.Slot>
                                <LockClosedIcon height="16" width="16" />
                            </TextField.Slot>
                        </TextField.Root>
                    </Box>

                    <Button size="3" variant="solid" style={{ backgroundColor: paletteColors.steelBlue, cursor: 'pointer' }} onClick={handleLogin}>
                        {t('auth.login')}
                    </Button>
                </Flex>

                <Flex justify="center" mt="2">
                    <Text size="2">{t('auth.noAccount')} <Link href="/signup" size="2" weight="bold">{t('auth.signup')}</Link></Text>
                </Flex>
            </Flex>
        </Card>
    );
}
