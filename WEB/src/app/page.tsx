import { Flex } from "@radix-ui/themes";
import { FeedComposer, PostCard, FeedHeader } from "../components/Feed";

export default function Home() {
  return (
    <Flex direction="column" gap="4">
      <FeedHeader />
      <FeedComposer />
      <PostCard />
      <PostCard />
    </Flex>
  );
}
