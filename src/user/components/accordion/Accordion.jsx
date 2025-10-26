import { Accordion, Span } from "@chakra-ui/react";

export const Accordions = () => {
  return (
    <Accordion.Root multiple defaultValue={["b"]}>
      {items.map((item, index) => (
        <Accordion.Item
          shadow={"sm"}
          shadowColor={"#00000012"}
          rounded={10}
          my={4}
          px={3}
          bg={"#fff"}
          key={index}
          value={item.value}
        >
          <Accordion.ItemTrigger>
            <Span
              flex="1"
              py={{ base: -4, md: 2 }}
              fontFamily="InterBold"
              fontSize={{ base: "11px", md: 18 }}
              fontWeight={"semibold"}
              lineHeight={"24px"}
              color={"#333333"}
            >
              {item.title}
            </Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody
              fontFamily="InterRegular"
              fontWeight={"normal"}
              fontSize={{ base: "9px", md: 14 }}
              color={"#333333CC"}
              py={{ base: 1, md: 3 }}
              whiteSpace={"pre-line"}
            >
              {item.text}
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

const items = [
  {
    value: "a",
    title: "How do I become a mentor?",
    text: `Go to your dashboard and toggle on the "Become a Mentor" button in the right panel.

To qualify, you should have at least 3 years of experience in a specific field.

Once your request is reviewed and approved by an admin, you can:

• Click your profile picture (top right corner)

• Go to the "Mentorship" tab

• Click "Create new listing"

You can then define your mentoring topics, set availability, and decide whether sessions are free or paid.
Once published, others can discover and request your offer.`,
  },

  {
    value: "b",
    title: " How can I get a mentor?",
    text: "You can search for mentors by name or filter by specific topics using the dropdown in the Mentoring section. Once you find a suitable mentor, click on the listing to learn more and request a session.",
  },
  {
    value: "c",
    title: "How do I collect points?",
    text: `You earn community points by being active:
+2 for logging in
+5 for creating a post
+3 for commenting
+2 for liking posts
+20 offering mentoring
+5 receiving mentoring


Your total points are displayed in your profile and may be used for rewards.


`,
  },
  {
    value: "d",
    title: "What can I get with the points?",
    text: ` Points can be redeemed for exclusive rewards such as:
LinkedIn Premium access


• Personal AiDiA coaching sessions


• Merchandise like Snipes T-Shirts or other special offers

• Visit the Rewards section for the latest benefits.
`,
  },
  {
    value: "e",
    title: "How do I contact someone?",
    text: `Direct messaging is currently not available on the platform.
 However, you can view someone’s profile and connect with them via their social media links (e.g., LinkedIn), which are listed in their profile.


`,
  },
  {
    value: "f",
    title: "Can everyone see what I post?",
    text: `Yes. All platform members can view public posts.
 Please post responsibly and respectfully — your contributions represent you.
`,
  },
  {
    value: "g",
    title: "How can I share my own learning content on the Learning Hub?",
    text: ` Currently, only the admin team can upload content to the Learning Hub.
 If you would like to contribute, send your content idea to:
 📧 admin-thelounge@aidia-pitch.de

`,
  },
];
