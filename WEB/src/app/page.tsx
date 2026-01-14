import { Flex } from "@radix-ui/themes";
import { AppLayout } from "../components/AppLayout";
import { NavigationSidebar, WidgetsSidebar } from "../components/Sidebars";
import { FeedComposer, PostCard } from "../components/Feed";

export default function Home() {
  return (
    <AppLayout
      navigation={<NavigationSidebar />}
      widgets={<WidgetsSidebar />}
    >
      <Flex direction="column" gap="4">
        <FeedComposer />
        <PostCard />
        <PostCard />
      </Flex>
    </AppLayout>
  );
}
