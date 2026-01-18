"use client";

import { Card, Text, Flex, Heading } from "@radix-ui/themes";

export default function HelpPage() {
    return (
        <Flex direction="column" gap="4">
            <Card size="3">
                <Heading size="6" mb="4">מרכז עזרה ותמיכה</Heading>
                <Text size="3" mb="4">איך אפשר לעזור לך היום?</Text>

                <Flex direction="column" gap="3">
                    <details style={{ cursor: 'pointer' }}>
                        <summary style={{ fontWeight: 'bold', marginBottom: '8px' }}>איך משנים סיסמה?</summary>
                        <Text size="2">ניתן לשנות סיסמה דרך דף ההגדרות &gt; פרטיות ואבטחה.</Text>
                    </details>

                    <details style={{ cursor: 'pointer' }}>
                        <summary style={{ fontWeight: 'bold', marginBottom: '8px' }}>איך מוסיפים חברים?</summary>
                        <Text size="2">נכנסים לדף "חברים" בתפריט הצד, מחפשים את לוחצים על "הוסף חבר".</Text>
                    </details>

                    <details style={{ cursor: 'pointer' }}>
                        <summary style={{ fontWeight: 'bold', marginBottom: '8px' }}>למי פונים במקרה של תקלה?</summary>
                        <Text size="2">ניתן לפנות למזכירות הקיבוץ או למנהל המערכת דרך דף "צור קשר".</Text>
                    </details>
                </Flex>
            </Card>
        </Flex>
    );
}
