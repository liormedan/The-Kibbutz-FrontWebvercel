"use client";

import { useState, useEffect } from 'react';
import { Dialog, Flex, Button, TextField, TextArea, Text, Box, Grid } from '@radix-ui/themes';

export interface UserProfile {
    name: string;
    handle: string;
    bio: string;
    avatar: string; // URL
    cover: string; // URL
    followers: number;
    following: number;
}

interface ProfileEditDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData: UserProfile;
    onSave: (data: UserProfile) => void;
}

export const ProfileEditDialog = ({ open, onOpenChange, initialData, onSave }: ProfileEditDialogProps) => {
    // Form State
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");
    const [cover, setCover] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Load data when opening
    useEffect(() => {
        if (open && initialData) {
            setName(initialData.name);
            setBio(initialData.bio);
            setAvatar(initialData.avatar);
            setCover(initialData.cover);
            setErrors({});
        }
    }, [open, initialData]);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!name.trim()) newErrors.name = "שם המשתמש הוא שדה חובה";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const updatedProfile: UserProfile = {
            ...initialData,
            name,
            bio,
            avatar,
            cover
        };

        onSave(updatedProfile);
        onOpenChange(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content style={{ maxWidth: 600 }}>
                <Dialog.Title>עריכת פרופיל</Dialog.Title>
                <Dialog.Description size="2" mb="4" color="gray">
                    עדכן את פרטי הפרופיל שלך. השינויים יישמרו באופן מקומי.
                </Dialog.Description>

                <Flex direction="column" gap="4">

                    {/* Name */}
                    <Box>
                        <Text as="div" size="2" mb="1" weight="bold">שם מלא *</Text>
                        <TextField.Root
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="השם שלך"
                        />
                        {errors.name && <Text color="red" size="1">{errors.name}</Text>}
                    </Box>

                    {/* Bio */}
                    <Box>
                        <Text as="div" size="2" mb="1" weight="bold">אודות (Bio)</Text>
                        <TextArea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="ספר קצת על עצמך..."
                            rows={3}
                        />
                    </Box>

                    <Grid columns="2" gap="4">
                        {/* Avatar */}
                        <Box>
                            <Text as="div" size="2" mb="1" weight="bold">תמונת פרופיל (URL)</Text>
                            <TextField.Root
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                                placeholder="https://..."
                            />
                            {avatar && (
                                <Box mt="2" style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--gray-4)' }}>
                                    <img src={avatar} alt="Avatar Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => (e.currentTarget.style.display = 'none')} />
                                </Box>
                            )}
                        </Box>

                        {/* Cover */}
                        <Box>
                            <Text as="div" size="2" mb="1" weight="bold">תמונת נושא (URL)</Text>
                            <TextField.Root
                                value={cover}
                                onChange={(e) => setCover(e.target.value)}
                                placeholder="https://..."
                            />
                            {cover && (
                                <Box mt="2" style={{ width: '100%', height: '50px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--gray-4)' }}>
                                    <img src={cover} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => (e.currentTarget.style.display = 'none')} />
                                </Box>
                            )}
                        </Box>
                    </Grid>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">ביטול</Button>
                        </Dialog.Close>
                        <Button
                            onClick={handleSave}
                            style={{ backgroundColor: '#2b868a', color: 'white' }} // Using the specific Teal from user request/image
                        >
                            שמור שינויים
                        </Button>
                    </Flex>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};
