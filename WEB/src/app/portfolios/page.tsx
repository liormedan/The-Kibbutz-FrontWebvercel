"use client";

import { Box, Flex, Text, Card, Heading, Grid, Button, Badge, TextField, Dialog, Tabs, IconButton, Avatar } from "@radix-ui/themes";
import { PlusIcon, HeartIcon, HeartFilledIcon, MagnifyingGlassIcon, BackpackIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

// Mock Data for Portfolios
const initialPortfolios = [
    { id: 1, title: "עיצוב מחדש לחדר האוכל", author: "נועה שחר", image: "https://images.unsplash.com/photo-1617104424032-b9bd6972d0e4?w=800&h=600&fit=crop", category: "עיצוב פנים", likes: 12, isLiked: false, description: "פרויקט הגמר שלי בלימודי העיצוב. המטרה הייתה ליצור חלל מזמין ומודרני שעדיין שומר על האופי הקיבוצי. השתמשתי בחומרים טבעיים והרבה אור." },
    { id: 2, title: "אפליקציית טרמפים לקיבוץ", author: "דניאל פרידמן", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop", category: "טכנולוגיה", likes: 45, isLiked: true, description: "אפליקציה פשוטה שמאפשרת לחברים לפרסם נסיעות ולבקש טרמפים בתוך הקיבוץ ומחוצה לו. פותחה ב-React Native." },
    { id: 3, title: "ציורי שמן - נופי העמק", author: "מיכל גולן", image: "https://images.unsplash.com/photo-1579783902614-a3fb392796a5?w=800&h=600&fit=crop", category: "אומנות", likes: 8, isLiked: false, description: "סדרה של 5 ציורים המתארים את השדות סביב הקיבוץ בעונות השונות. שמן על בד." },
    { id: 4, title: "ריהוט גן מעץ ממוחזר", author: "יוסי לוי", image: "https://images.unsplash.com/photo-1598300042247-d088f8d97036?w=800&h=600&fit=crop", category: "נגרות", likes: 23, isLiked: false, description: "ספסלים ושולחנות שבניתי ממשטחי עץ ישנים שנזרקו. הכל עבודת יד וצביעה בלכה עמידה למים." },
    { id: 5, title: "צילומים מהחג האחרון", author: "שרה כהן", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop", category: "צילום", likes: 56, isLiked: true, description: "אלבום תמונות מחגיגות השבועות. ניסיתי לתפוס את הרגעים הקטנים והשמחים של הילדים." },
];

export default function PortfoliosPage() {
    const [portfolios, setPortfolios] = useState(initialPortfolios);
    const [filter, setFilter] = useState("all");
    const [openUpload, setOpenUpload] = useState(false);

    // Detail Modal State
    const [selectedPortfolio, setSelectedPortfolio] = useState<typeof initialPortfolios[0] | null>(null);

    // Form State
    const [newTitle, setNewTitle] = useState("");
    const [newCategory, setNewCategory] = useState("");

    const handleLike = (id: number) => {
        setPortfolios(portfolios.map(p => {
            if (p.id === id) {
                const updated = { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked };
                // Also update selected if it's the one we're looking at
                if (selectedPortfolio?.id === id) {
                    setSelectedPortfolio(updated);
                }
                return updated;
            }
            return p;
        }));
    };

    const handleUpload = () => {
        if (!newTitle || !newCategory) return;
        const newPortfolio = {
            id: Date.now(),
            title: newTitle,
            author: "אני", // Placeholder for current user
            image: `https://source.unsplash.com/random/800x600?${newCategory}`,
            category: newCategory,
            likes: 0,
            isLiked: false,
            description: "פרויקט חדש שהועלה זה עתה."
        };
        setPortfolios([newPortfolio, ...portfolios]);
        setOpenUpload(false);
        setNewTitle("");
        setNewCategory("");
    };

    const filteredPortfolios = filter === "likes"
        ? portfolios.filter(p => p.isLiked)
        : portfolios;

    return (
        <Flex direction="column" gap="6">

            {/* Header Section */}
            <Flex justify="between" align="center">
                <Box>
                    <Heading size="6" mb="1">תיקי עבודות (Portfolios)</Heading>
                    <Text color="gray">היצירות והפרויקטים של חברי הקהילה</Text>
                </Box>
                <Dialog.Root open={openUpload} onOpenChange={setOpenUpload}>
                    <Dialog.Trigger>
                        <Button size="2" variant="solid">
                            <PlusIcon /> הוסף פרויקט חדש
                        </Button>
                    </Dialog.Trigger>

                    <Dialog.Content style={{ maxWidth: 450 }}>
                        <Dialog.Title>העלאת פרויקט חדש</Dialog.Title>
                        <Dialog.Description size="2" mb="4">
                            שתף את העבודה שלך עם הקהילה.
                        </Dialog.Description>

                        <Flex direction="column" gap="3">
                            <Box>
                                <Text as="div" size="2" mb="1" weight="bold">שם הפרויקט</Text>
                                <TextField.Root
                                    placeholder="לדוגמה: עיצוב הספרייה החדשה"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    style={{ textAlign: 'right', direction: 'rtl' }}
                                />
                            </Box>
                            <Box>
                                <Text as="div" size="2" mb="1" weight="bold">קטגוריה</Text>
                                <TextField.Root
                                    placeholder="לדוגמה: אדריכלות, אומנות, קוד..."
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    style={{ textAlign: 'right', direction: 'rtl' }}
                                />
                            </Box>
                            <Box>
                                <Text as="div" size="2" mb="1" weight="bold">תמונה (URL)</Text>
                                <TextField.Root placeholder="https://..." style={{ textAlign: 'right', direction: 'rtl' }} />
                                <Text size="1" color="gray">כרגע נבחר תמונה אקראית אם לא תזין</Text>
                            </Box>
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close asChild>
                                <Button variant="soft" color="gray">ביטול</Button>
                            </Dialog.Close>
                            <Button onClick={handleUpload}>שמור ופרסם</Button>
                        </Flex>
                    </Dialog.Content>
                </Dialog.Root>
            </Flex>

            {/* Filter Tabs */}
            {/* The Tabs.Root and Tabs.List components were removed as per instruction. */}
            {/* The individual Tabs.Trigger components are no longer functional without the Tabs.Root context. */}
            {/* If filtering functionality is still desired, it would need to be re-implemented with different components. */}
            <Flex gap="2" mb="4">
                <Button variant="soft" value="all">כל העבודות</Button>
                <Button variant="soft" value="likes">מועדפים שלי ❤️</Button>
                <Button variant="soft" value="my_work">העבודות שלי</Button>
            </Flex>

            {/* Grid */}
            <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
                {filteredPortfolios.map((item) => (
                    <Card key={item.id} style={{ padding: 0, overflow: 'hidden' }}>
                        <Box
                            style={{ position: 'relative', height: '180px', cursor: 'pointer' }}
                            onClick={() => setSelectedPortfolio(item)}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <Badge color="gray" variant="solid" style={{ position: 'absolute', top: 10, right: 10 }}>
                                {item.category}
                            </Badge>
                        </Box>
                        <Box p="3">
                            <Flex justify="between" align="start" mb="2">
                                <Box>
                                    <Text weight="bold" size="3" as="div" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                                        {item.title}
                                    </Text>
                                    <Flex align="center" gap="2" mt="1">
                                        <Avatar size="1" radius="full" fallback={item.author[0]} />
                                        <Text size="1" color="gray">{item.author}</Text>
                                    </Flex>
                                </Box>
                            </Flex>

                            <Flex justify="between" align="center" mt="3">
                                <Button variant="ghost" size="1" onClick={() => setSelectedPortfolio(item)}>עוד פרטים</Button>
                                <Flex align="center" gap="1">
                                    <Text size="1" color="gray">{item.likes}</Text>
                                    <IconButton
                                        variant="ghost"
                                        color={item.isLiked ? "red" : "gray"}
                                        onClick={() => handleLike(item.id)}
                                    >
                                        {item.isLiked ? <HeartFilledIcon /> : <HeartIcon />}
                                    </IconButton>
                                </Flex>
                            </Flex>
                        </Box>
                    </Card>
                ))}
            </Grid>

            {/* Project Detail Modal */}
            <Dialog.Root open={!!selectedPortfolio} onOpenChange={(open) => !open && setSelectedPortfolio(null)}>
                <Dialog.Content style={{ maxWidth: 800 }}>
                    {selectedPortfolio && (
                        <Flex direction={{ initial: 'column', sm: 'row' }} gap="5">
                            {/* Image Side */}
                            <Box style={{ flex: 1.5 }}>
                                <img
                                    src={selectedPortfolio.image}
                                    alt={selectedPortfolio.title}
                                    style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', maxHeight: '400px' }}
                                />
                            </Box>

                            {/* Info Side */}
                            <Flex direction="column" style={{ flex: 1 }} justify="between">
                                <Box>
                                    <Flex justify="between" align="start" mb="2">
                                        <Dialog.Title size="6" mb="0">{selectedPortfolio.title}</Dialog.Title>
                                        <Dialog.Close asChild>
                                            <IconButton variant="ghost" color="gray">
                                                <Cross2Icon />
                                            </IconButton>
                                        </Dialog.Close>
                                    </Flex>

                                    <Badge color="indigo" mb="3">{selectedPortfolio.category}</Badge>

                                    <Flex gap="2" align="center" mb="4">
                                        <Avatar size="2" radius="full" fallback={selectedPortfolio.author[0]} />
                                        <Text weight="medium">{selectedPortfolio.author}</Text>
                                    </Flex>

                                    <Dialog.Description size="2" color="gray" style={{ lineHeight: '1.6' }}>
                                        {selectedPortfolio.description}
                                    </Dialog.Description>
                                </Box>

                                <Flex gap="3" mt="6" justify="end">
                                    <Button
                                        variant={selectedPortfolio.isLiked ? "soft" : "outline"}
                                        color="red"
                                        onClick={() => handleLike(selectedPortfolio.id)}
                                    >
                                        {selectedPortfolio.isLiked ? <HeartFilledIcon /> : <HeartIcon />}
                                        {selectedPortfolio.isLiked ? "אהבתי" : "לייק"} ({selectedPortfolio.likes})
                                    </Button>
                                    <Button variant="solid">צור קשר</Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    )}
                </Dialog.Content>
            </Dialog.Root>

        </Flex>
    );
}
