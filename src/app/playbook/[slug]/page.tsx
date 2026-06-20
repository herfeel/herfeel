import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { playbookArticles } from "@/data/mock/playbook";

type PlaybookArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return playbookArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PlaybookArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = playbookArticles.find((item) => item.slug === slug);

  return {
    title: article?.title ?? "PlayBook",
    description: article?.excerpt,
  };
}

export default async function Page({ params }: PlaybookArticlePageProps) {
  const { slug } = await params;
  redirect(`/playbook#${slug}`);
}
