import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export default function verifyEmailForm({
  activationUrl,
  userEmail,
  userName,
}) {
  return (
    <Html>
      <Head />
      <Preview>Textrade.store Email Verification</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                Textrade.store Email Verification
              </Heading>
              <Hr />
              <Text>Email: {userEmail}</Text>
              <Text>Username: {userName}</Text>
              <Text>Click the link to activate your account: {activationUrl}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}