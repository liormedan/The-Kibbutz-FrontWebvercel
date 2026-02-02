"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface PortfolioComment {
    id: number;
    text: string;
    createdAt: number;
}

export interface PortfolioRating {
    id: number;
    value: number; // 1-5
    createdAt: number;
}

export interface PortfolioItem {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;         // Main image
    images: string[];      // Gallery images
    link?: string;         // External project link
    date: string;          // Project date (ISO string or YYYY-MM-DD)
    comments: PortfolioComment[];
    ratings: PortfolioRating[];
    createdAt: number;
}

interface PortfolioContextType {
    items: PortfolioItem[];
    addProject: (item: Omit<PortfolioItem, 'id' | 'createdAt' | 'comments' | 'ratings'>) => void;
    updateProject: (id: number, item: Partial<PortfolioItem>) => void;
    deleteProject: (id: number) => void;
    addComment: (projectId: number, text: string) => void;
    addRating: (projectId: number, value: number) => void;
    getProject: (id: number) => PortfolioItem | undefined;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = 'kibbutz_portfolios_v2';

// Initial Mock Data for V2
const initialMockData: PortfolioItem[] = [
    {
        id: 1,
        title: "עיצוב מחדש לחדר האוכל",
        description: "פרויקט הגמר שלי בלימודי העיצוב. המטרה הייתה ליצור חלל מזמין ומודרני שעדיין שומר על האופי הקיבוצי. השתמשתי בחומרים טבעיים והרבה אור.",
        category: "עיצוב פנים",
        image: "https://images.unsplash.com/photo-1617104424032-b9bd6972d0e4?w=800&h=600&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?w=800&h=600&fit=crop"
        ],
        date: "2023-06-15",
        comments: [],
        ratings: [{ id: 101, value: 5, createdAt: Date.now() }],
        createdAt: Date.now()
    },
    {
        id: 2,
        title: "אפליקציית טרמפים לקיבוץ",
        description: "אפליקציה פשוטה שמאפשרת לחברים לפרסם נסיעות ולבקש טרמפים בתוך הקיבוץ ומחוצה לו. פותחה ב-React Native.",
        category: "טכנולוגיה",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        images: [],
        link: "https://github.com/demo/ride-share",
        date: "2023-11-20",
        comments: [
            { id: 201, text: "רעיון מעולה! משתמש בזה כל יום.", createdAt: Date.now() }
        ],
        ratings: [
            { id: 202, value: 5, createdAt: Date.now() },
            { id: 203, value: 4, createdAt: Date.now() }
        ],
        createdAt: Date.now()
    }
];

export function PortfolioProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setItems(parsed);
            } catch (e) {
                console.error("Failed to parse portfolio data", e);
                setItems(initialMockData);
            }
        } else {
            setItems(initialMockData);
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage whenever items change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addProject = (newItem: Omit<PortfolioItem, 'id' | 'createdAt' | 'comments' | 'ratings'>) => {
        const item: PortfolioItem = {
            ...newItem,
            id: Date.now(),
            comments: [],
            ratings: [],
            createdAt: Date.now(),
        };
        setItems(prev => [item, ...prev]);
    };

    const updateProject = (id: number, updatedFields: Partial<PortfolioItem>) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, ...updatedFields } : item
        ));
    };

    const deleteProject = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const addComment = (projectId: number, text: string) => {
        setItems(prev => prev.map(item => {
            if (item.id === projectId) {
                return {
                    ...item,
                    comments: [
                        ...item.comments,
                        { id: Date.now(), text, createdAt: Date.now() }
                    ]
                };
            }
            return item;
        }));
    };

    const addRating = (projectId: number, value: number) => {
        setItems(prev => prev.map(item => {
            if (item.id === projectId) {
                // Determine if user (mock) already rated? For now, we allow multiple or just append.
                // Simple append for this context-only mock
                return {
                    ...item,
                    ratings: [
                        ...item.ratings,
                        { id: Date.now(), value, createdAt: Date.now() }
                    ]
                };
            }
            return item;
        }));
    };

    const getProject = (id: number) => {
        return items.find(item => item.id === id);
    };

    return (
        <PortfolioContext.Provider value={{
            items,
            addProject,
            updateProject,
            deleteProject,
            addComment,
            addRating,
            getProject
        }}>
            {children}
        </PortfolioContext.Provider>
    );
}

export function usePortfolio() {
    const context = useContext(PortfolioContext);
    if (context === undefined) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
}
