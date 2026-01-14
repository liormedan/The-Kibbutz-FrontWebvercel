import { Box } from '@radix-ui/themes';
import LoginCard from '@/components/LoginCard';

export default function LoginPage() {
  return (
    <Box style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <LoginCard />
    </Box>
  );
}
