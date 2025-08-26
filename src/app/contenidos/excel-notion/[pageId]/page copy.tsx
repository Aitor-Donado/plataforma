// src/app/contenidos/excel-notion/[pageId]/page.tsx
import { notFound } from "next/navigation";
import NotionPage from "@/components/notion/NotionPage";
import { getRecordMap } from "../notion";

// 🚨 Generación estática, no dinámica
export const dynamic = "force-static";

export default async function NotionPageRoute({
  params,
}: {
  params: { pageId: string };
}) {
  const { pageId } = params;

  try {
    const recordMap = await getRecordMap(pageId);

    return (
      <main className="min-h-screen bg-gray-50 flex">
        <NotionPage
          recordMap={recordMap}
          pageId={pageId}
          basePath="/contenidos/excel-notion"
        />
      </main>
    );
  } catch (err) {
    console.error("❌ Error al cargar la página de Notion:", err);
    notFound();
  }
}

// ✅ Genera páginas en build
export async function generateStaticParams() {
  return [
    { pageId: "329633e019de477aab2135ae3d4d2aae" },
    { pageId: "258f1269-2df4-8013-8ab2-c34bc161e404" },
    // Agrega aquí los IDs de páginas que quieras incluir
  ];
}
