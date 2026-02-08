import { Box, Heading, Text, Flex, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function SearchPage() {
    return (
        <Box p="4">
            <Heading mb="4">חיפוש</Heading>
            <TextField.Root placeholder="חפש חברים, פוסטים או קהילות..." size="3">
                <TextField.Slot side="right">
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
            <Flex align="center" justify="center" direction="column" gap="2" mt="8" style={{ opacity: 0.5 }}>
                <MagnifyingGlassIcon width="48" height="48" />
                <Text>התחל לחפש כדי לראות תוצאות</Text>
            </Flex>
        </Box>
    );
}
