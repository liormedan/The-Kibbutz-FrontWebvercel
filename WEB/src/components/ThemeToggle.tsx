import * as React from "react";
import { useTheme } from "next-themes";
import { Button, Flex, Text, IconButton } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export const ThemeToggle = ({ showLabel = true }: { showLabel?: boolean }) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
    const icon = theme === 'dark' ? <SunIcon width="16" height="16" /> : <MoonIcon width="16" height="16" />;

    if (!showLabel) {
        return (
            <IconButton
                variant="ghost"
                color="gray"
                onClick={toggleTheme}
                style={{ color: 'var(--gray-12)' }}
            >
                {icon}
            </IconButton>
        );
    }

    return (
        <Button
            variant="ghost"
            color="gray"
            onClick={toggleTheme}
            style={{ justifyContent: 'flex-start', color: 'var(--gray-11)', marginTop: '8px' }}
        >
            <Flex gap="2" align="center">
                {icon}
                <Text>{theme === 'dark' ? 'מצב בהיר' : 'מצב כהה'}</Text>
            </Flex>
        </Button>
    );
};
