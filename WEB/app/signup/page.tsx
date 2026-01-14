import { Box } from '@radix-ui/themes';
import SignupCard from '@/components/SignupCard';

export default function SignupPage() {
  return (
    <Box style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <SignupCard />
    </Box>
  );
}
