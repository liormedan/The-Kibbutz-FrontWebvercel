"use client";

import { Box, Flex, Text } from "@radix-ui/themes";
import { ReactNode } from "react";

interface NotificationItemProps {
    text: string;
    time: string;
    icon: ReactNode;
}

export const NotificationItem = ({ text, time, icon }: NotificationItemProps) => {
    return (
        <div
            dir="rtl"
            style={{
                direction: 'rtl',
                padding: '12px',
                borderBottom: '1px solid var(--gray-alpha-3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                textAlign: 'right'
            }}
            className="hover:bg-gray-100"
        >
            <div style={{ paddingTop: '4px' }}>
                {icon}
            </div>
            <div>
                <Text size="2" style={{ lineHeight: '1.4', display: 'block' }}>{text}</Text>
                <Text size="1" color="gray" style={{ marginTop: '4px', display: 'block' }}>{time}</Text>
            </div>
        </div>
    );
};
