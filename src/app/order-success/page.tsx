import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function OrderSuccessPage() {
  return (
    <Section>
      <Container>
        <h1 className="text-4xl font-medium">Order success</h1>
        <p className="mt-3 text-[var(--color-muted)]">Placeholder success route for future mock checkout.</p>
      </Container>
    </Section>
  );
}
