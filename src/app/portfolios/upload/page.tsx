"use client";

import { Box, Flex, Text, Card, Heading, Button, TextField, TextArea, Select, Separator } from "@radix-ui/themes";
import { ArrowLeftIcon, UploadIcon, ImageIcon } from "@radix-ui/react-icons";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";

// קטגוריות מוגדרות מראש
const categories = [
    "עיצוב פנים",
    "אדריכלות",
    "אומנות",
    "צילום",
    "טכנולוגיה/קוד",
    "נגרות",
    "גינון",
    "בישול",
    "אחר"
];

function PortfolioForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('id');
    const { addItem, updateItem, getItem } = usePortfolio();

    // State management
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Load data if editing
    useEffect(() => {
        if (editId) {
            const item = getItem(Number(editId));
            if (item) {
                setTitle(item.title);
                setDescription(item.description);
                setCategory(item.category);
                setImageUrl(item.image);
            }
        }
    }, [editId, getItem]);

    // Validation
    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!title.trim()) {
            newErrors.title = "שם הפרויקט הוא שדה חובה";
        }

        if (!description.trim()) {
            newErrors.description = "תיאור הפרויקט הוא שדה חובה";
        }

        if (!category) {
            newErrors.category = "יש לבחור קטגוריה";
        }

        if (!imageUrl.trim()) {
            newErrors.imageUrl = "יש להעלות תמונה ראשית";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsUploading(true);

        try {
            const portfolioData = {
                title,
                description,
                category,
                image: imageUrl || `https://source.unsplash.com/random/800x600?${category}`,
            };

            // Simulate slight delay
            await new Promise(resolve => setTimeout(resolve, 500));

            if (editId) {
                updateItem(Number(editId), portfolioData);
                console.log("Portfolio updated:", editId);
            } else {
                addItem(portfolioData);
                console.log("Portfolio created");
            }

            router.push("/portfolios");
        } catch (error) {
            console.error("Error uploading portfolio:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Flex direction="column" gap="6" style={{ maxWidth: '900px', margin: '0 auto', width: '100%', padding: '20px' }}>
            {/* Header */}
            <Flex align="center" gap="4">
                <Link href="/portfolios">
                    <Button variant="ghost" size="2">
                        <ArrowLeftIcon /> חזרה
                    </Button>
                </Link>
                <Heading size="7">{editId ? "עריכת פרויקט" : "העלאת פרויקט חדש"}</Heading>
            </Flex>

            <Separator size="4" />

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <Card size="3" style={{ padding: '24px' }}>
                    <Flex direction="column" gap="5">

                        {/* שלב 1: מידע בסיסי */}
                        <Box>
                            <Heading size="4" mb="4">מידע בסיסי</Heading>

                            {/* שם הפרויקט */}
                            <Box mb="4">
                                <Text as="div" size="2" mb="1" weight="bold">
                                    שם הפרויקט <Text color="red">*</Text>
                                </Text>
                                <TextField.Root
                                    placeholder="לדוגמה: עיצוב הספרייה החדשה"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{ textAlign: 'right', direction: 'rtl' }}
                                    size="3"
                                    color={errors.title ? "red" : undefined}
                                />
                                {errors.title && (
                                    <Text size="1" color="red" mt="1">{errors.title}</Text>
                                )}
                            </Box>

                            {/* תיאור */}
                            <Box mb="4">
                                <Text as="div" size="2" mb="1" weight="bold">
                                    תיאור הפרויקט <Text color="red">*</Text>
                                </Text>
                                <TextArea
                                    placeholder="ספר על הפרויקט שלך... מה המטרה? מה האתגרים? מה התוצאה?"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    style={{ textAlign: 'right', direction: 'rtl', minHeight: '120px' }}
                                    size="3"
                                    color={errors.description ? "red" : undefined}
                                />
                                {errors.description && (
                                    <Text size="1" color="red" mt="1">{errors.description}</Text>
                                )}
                            </Box>

                            {/* קטגוריה */}
                            <Box mb="4">
                                <Text as="div" size="2" mb="1" weight="bold">
                                    קטגוריה <Text color="red">*</Text>
                                </Text>
                                <Select.Root
                                    value={category}
                                    onValueChange={setCategory}
                                    size="3"
                                >
                                    <Select.Trigger
                                        placeholder="בחר קטגוריה"
                                        style={{ textAlign: 'right', direction: 'rtl', width: '100%' }}
                                        color={errors.category ? "red" : undefined}
                                    />
                                    <Select.Content position="popper" style={{ direction: 'rtl' }}>
                                        {categories.map((cat) => (
                                            <Select.Item key={cat} value={cat}>
                                                {cat}
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Root>
                                {errors.category && (
                                    <Text size="1" color="red" mt="1">{errors.category}</Text>
                                )}
                            </Box>
                        </Box>

                        <Separator size="4" />

                        {/* שלב 2: מדיה */}
                        <Box>
                            <Heading size="4" mb="4">מדיה</Heading>

                            {/* תמונה ראשית */}
                            <Box mb="4">
                                <Text as="div" size="2" mb="1" weight="bold">
                                    תמונה ראשית <Text color="red">*</Text>
                                </Text>
                                <Text size="1" color="gray" mb="2" as="div">
                                    העלה תמונה או הזן קישור לתמונה
                                </Text>

                                <Flex gap="3" direction="column">
                                    <TextField.Root
                                        placeholder="https://..."
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        style={{ textAlign: 'right', direction: 'rtl' }}
                                        size="3"
                                        color={errors.imageUrl ? "red" : undefined}
                                    >
                                        <TextField.Slot side="left">
                                            <ImageIcon />
                                        </TextField.Slot>
                                    </TextField.Root>

                                    {/* TODO: Add drag & drop upload component */}
                                    <Button
                                        type="button"
                                        variant="soft"
                                        size="2"
                                        style={{ alignSelf: 'flex-start' }}
                                        onClick={() => setImageUrl(`https://source.unsplash.com/random/800x600?${category || 'art'}`)}
                                    >
                                        <UploadIcon /> צור תמונה אקראית
                                    </Button>

                                    {errors.imageUrl && (
                                        <Text size="1" color="red">{errors.imageUrl}</Text>
                                    )}

                                    {/* תצוגה מקדימה */}
                                    {imageUrl && (
                                        <Box
                                            mt="3"
                                            style={{
                                                width: '100%',
                                                maxWidth: '400px',
                                                aspectRatio: '16/9',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                border: '2px solid var(--gray-5)'
                                            }}
                                        >
                                            <img
                                                src={imageUrl}
                                                alt="תצוגה מקדימה"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Flex>
                            </Box>
                        </Box>

                        <Separator size="4" />

                        {/* Actions */}
                        <Flex gap="3" justify="end" mt="4">
                            <Link href="/portfolios">
                                <Button variant="soft" color="gray" size="3">
                                    ביטול
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                variant="solid"
                                size="3"
                                disabled={isUploading}
                                style={{
                                    backgroundColor: '#2b868a',
                                    color: 'var(--color-white)',
                                    fontWeight: 500
                                }}
                            >
                                {isUploading ? "שומר..." : (editId ? "עדכן פרויקט" : "פרסם פרויקט")}
                            </Button>
                        </Flex>
                    </Flex>
                </Card>
            </form>
        </Flex>
    );
}

export default function PortfolioUploadPage() {
    return (
        <Suspense fallback={<Text>טוען...</Text>}>
            <PortfolioForm />
        </Suspense>
    );
}

