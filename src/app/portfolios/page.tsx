"use client";

import { Box, Flex, Text, Card, Heading, Grid, Button, Badge, IconButton } from "@radix-ui/themes";
import { PlusIcon, Pencil1Icon, TrashIcon, StarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { usePortfolio, PortfolioItem } from "@/context/PortfolioContext";
import { PortfolioUploadDialog } from "@/components/portfolio/PortfolioUploadDialog";
import { PortfolioDetailsDialog } from "@/components/portfolio/PortfolioDetailsDialog";

export default function MyPortfolioPage() {
    const { items, deleteProject } = usePortfolio();

    // Dialog States
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [uploadEditId, setUploadEditId] = useState<number | null>(null);

    const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

    const handleDelete = (id: number) => {
        if (confirm("האם אתה בטוח שברצונך למחוק פרויקט זה?")) {
            deleteProject(id);
            if (selectedProject?.id === id) setSelectedProject(null);
        }
    };

    const handleEdit = (id: number) => {
        setSelectedProject(null); // Close details if open
        setUploadEditId(id);
        setIsUploadOpen(true);
    };

    const handleCreate = () => {
        setUploadEditId(null);
        setIsUploadOpen(true);
    };

    const handleView = (item: PortfolioItem) => {
        setSelectedProject(item);
    };

    // Calculate rating helper
    const getAvgRating = (ratings: any[]) => {
        if (!ratings || ratings.length === 0) return 0;
        return (ratings.reduce((acc, curr) => acc + curr.value, 0) / ratings.length);
    };

    return (
        <Flex direction="column" gap="6">

            {/* Header Section */}
            <Flex justify="between" align="center">
                <Button
                    size="2"
                    variant="solid"
                    style={{
                        backgroundColor: '#2b868a',
                        color: 'var(--color-white)',
                        fontWeight: 500,
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                    onClick={handleCreate}
                >
                    <PlusIcon /> הוסף פרויקט חדש
                </Button>

                <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <Heading size="6" mb="1">תיק העבודות שלי</Heading>
                    <Text color="gray">ניהול הפרויקטים והיצירות שלי</Text>
                </Box>
                <Box style={{ width: '150px' }}></Box> {/* Spacer for centering */}
            </Flex>

            {/* Grid */}
            <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
                {items.length === 0 ? (
                    <Box style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                        <Text color="gray">עדיין לא הוספת פרויקטים. לחץ על "הוסף פרויקט חדש" כדי להתחיל.</Text>
                    </Box>
                ) : (
                    items.map((item) => {
                        const rating = getAvgRating(item.ratings);
                        return (
                            <Card key={item.id} style={{ padding: 0, overflow: 'hidden' }}>
                                <Box
                                    style={{ position: 'relative', height: '180px', cursor: 'pointer', backgroundColor: '#eee' }}
                                    onClick={() => handleView(item)}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                    />
                                    <Badge color="gray" variant="solid" style={{ position: 'absolute', top: 10, right: 10 }}>
                                        {item.category}
                                    </Badge>
                                </Box>
                                <Box p="3">
                                    <Flex justify="between" align="start" mb="2">
                                        <Box style={{ width: '100%' }}>
                                            <Flex justify="between" align="center">
                                                <Text weight="bold" size="3" as="div" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }}>
                                                    {item.title}
                                                </Text>
                                                {rating > 0 && (
                                                    <Flex align="center" gap="1">
                                                        <Text size="1" weight="bold">{rating.toFixed(1)}</Text>
                                                        <StarFilledIcon color="gold" width="12" height="12" />
                                                    </Flex>
                                                )}
                                            </Flex>

                                            <Flex justify="between" mt="1">
                                                <Text size="1" color="gray">{item.date}</Text>
                                                <Text size="1" color="gray">{item.comments?.length || 0} תגובות</Text>
                                            </Flex>
                                        </Box>
                                    </Flex>

                                    <Flex justify="between" align="center" mt="3" style={{ borderTop: '1px solid var(--gray-4)', paddingTop: '8px' }}>
                                        <Button variant="ghost" size="1" onClick={() => handleView(item)}>צפה</Button>
                                        <Flex gap="3">
                                            <IconButton
                                                variant="ghost"
                                                color="blue"
                                                onClick={(e) => { e.stopPropagation(); handleEdit(item.id); }}
                                                title="ערוך"
                                            >
                                                <Pencil1Icon />
                                            </IconButton>
                                            <IconButton
                                                variant="ghost"
                                                color="red"
                                                onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                                                title="מחק"
                                            >
                                                <TrashIcon />
                                            </IconButton>
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Card>
                        );
                    })
                )}
            </Grid>

            {/* Dialogs */}
            <PortfolioUploadDialog
                open={isUploadOpen}
                onOpenChange={setIsUploadOpen}
                editId={uploadEditId}
            />

            <PortfolioDetailsDialog
                project={selectedProject}
                open={!!selectedProject}
                onOpenChange={(open) => !open && setSelectedProject(null)}
                onEdit={handleEdit}
            />

        </Flex>
    );
}
