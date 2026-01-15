import { Flex } from "@radix-ui/themes";
import { AppLayout } from "../components/AppLayout";
import { NavigationSidebar } from "../components/MainMenuRight";
import { FeedComposer, PostCard } from "../components/Feed";

export default function Home() {
  return (
    <AppLayout
      navigation={<NavigationSidebar />}
    >
      <Flex direction="column" gap="4">
        <FeedComposer />
        <PostCard />
        <PostCard />
      </Flex>
    </AppLayout>
  );
}
