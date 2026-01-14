'use client';

import { Card, Box, Flex, Text, Button, Heading, Separator } from '@radix-ui/themes';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { paletteColors } from '@/theme/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function DesktopLanding() {
    const { t } = useLanguage();
    
    return (
        <Card size="4" style={{ height: 600, padding: 0, overflow: 'hidden' }}>
            <Flex style={{ height: '100%' }}>
                {/* Left Side - Content */}
                <Box style={{ width: '40%', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'var(--color-background)' }}>
                    <Box mb="6">
                        <Heading size="8" style={{ color: paletteColors.darkSlateGray }}>{t('landing.welcome')} <br /> The Kibbutz</Heading>
                        <Text size="3" color="gray" mt="2">{t('landing.tagline')}</Text>
                    </Box>

                    <Flex direction="column" gap="3" style={{ maxWidth: 300 }}>
                        <Button size="3" variant="outline" highContrast color="gray">
                            <GitHubLogoIcon /> {t('landing.continueGoogle')}
                        </Button>
                        <Button size="3" variant="outline" color="blue">
                            {t('landing.continueMicrosoft')}
                        </Button>

                        <Flex align="center" gap="2" my="2">
                            <Separator style={{ flex: 1 }} />
                            <Text size="1" color="gray">{t('landing.or')}</Text>
                            <Separator style={{ flex: 1 }} />
                        </Flex>

                        <Link href="/login" style={{ textDecoration: 'none' }}>
                            <Button size="3" variant="solid" style={{ backgroundColor: paletteColors.steelBlue, cursor: 'pointer', width: '100%' }}>
                                {t('landing.loginWithEmail')}
                            </Button>
                        </Link>
                    </Flex>

                    <Box mt="auto">
                        <Text size="1" color="gray">{t('landing.agreeTerms')}</Text>
                    </Box>
                </Box>

                {/* Right Side - Hero Graphic */}
                <Box style={{ width: '60%', backgroundColor: paletteColors.moccasin, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box style={{
                        width: 300,
                        height: 300,
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Flex direction="column" align="center">
                            <Text size="9">🌾</Text>
                            <Text size="5" weight="bold" style={{ color: paletteColors.darkSlateGray }}>Barn Illustration</Text>
                        </Flex>
                    </Box>

                    {/* Decorative circles */}
                    <Box style={{ position: 'absolute', top: 40, right: 40, width: 60, height: 60, borderRadius: '50%', backgroundColor: paletteColors.lightBlue, opacity: 0.8 }} />
                    <Box style={{ position: 'absolute', bottom: 60, left: 60, width: 100, height: 100, borderRadius: '50%', backgroundColor: paletteColors.lavenderBlush, opacity: 0.8 }} />
                </Box>
            </Flex>
        </Card>
    );
}
