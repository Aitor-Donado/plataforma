import { NotionAPI } from "notion-client";
import NotionPage from "@/components/notion/NotionPage";

// 🚨 Esto fuerza SSR (siempre consulta Notion, sin cachear)
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { pageId: string } }) {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(params.pageId);

  return <NotionPage recordMap={recordMap} />;
}
