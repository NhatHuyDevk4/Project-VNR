import { notFound } from "next/navigation";
import Content1Page from "@/features/content1/Content1Page";
import Content2Page from "@/features/content2/Content2Page";
import FoodArticlePage from "../../../components/content/FoodArticlePage";
import { FOOD_ARTICLES, type FoodArticleSlug } from "../../../features/contents/foodArticles";

const foodPage = (slug: FoodArticleSlug) => () => <FoodArticlePage data={FOOD_ARTICLES[slug]} />;

const CONTENT_PAGES = {
  "bo-bo": Content1Page,
  "com-don-khoai": Content2Page,
  "dau-phu-tam-hanh": foodPage("dau-phu-tam-hanh"),
  "rau-muong-nuoc-sau": foodPage("rau-muong-nuoc-sau"),
  "dua-cai-ca-phao": foodPage("dua-cai-ca-phao"),
  "ca-ro-ron-chien-gion": foodPage("ca-ro-ron-chien-gion"),
  "hat-mit-luoc": foodPage("hat-mit-luoc"),
  "mam-kho-quet-com-chay": foodPage("mam-kho-quet-com-chay"),
  "cu-san-xao": foodPage("cu-san-xao"),
  "muoi-dau-phong": foodPage("muoi-dau-phong"),
} as const;

type ContentSlug = keyof typeof CONTENT_PAGES;

export function generateStaticParams() {
  return Object.keys(CONTENT_PAGES).map((slug) => ({ slug }));
}

export default async function ContentSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const Page = CONTENT_PAGES[slug as ContentSlug];

  if (!Page) {
    notFound();
  }

  return <Page />;
}
