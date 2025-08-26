// src/app/contenidos/excel-basico/[pageId]/page.tsx

import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import NotionPage from "@/components/notion/NotionPage";
import { notFound } from "next/navigation";
import { restoreNotionId } from "@/lib/utils";

// Función para obtener el recordMap de una página
async function getRecordMap(pageId: string): Promise<ExtendedRecordMap> {
  try {
    const notion = new NotionAPI();
    // Restaurar los guiones en el ID antes de usarlo
    const normalizedPageId = restoreNotionId(pageId);
    const recordMap = await notion.getPage(normalizedPageId);

    return recordMap;
  } catch (error) {
    console.error("Error al obtener el recordMap:", error);
    throw error;
  }
}

// Componente de la página - ahora es asíncrono
export default async function NotionPageRoute({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  // Await los params antes de usar sus propiedades
  const { pageId } = await params;

  console.log("PageId recibido en la ruta:", pageId);

  try {
    const recordMap = await getRecordMap(pageId);

    return (
      <main className="min-h-screen bg-gray-50 flex">
        <NotionPage
          recordMap={recordMap}
          pageId={pageId}
          basePath="/contenidos/excel-basico"
        />
      </main>
    );
  } catch (error) {
    notFound();
  }
}

// Genera los parámetros estáticos para las páginas (opcional, para SSG)
export async function generateStaticParams() {
  console.log("Generating static params...");
  return [
    { pageId: "329633e0-19de-477a-ab21-35ae3d4d2aae" },
    { pageId: "258f1269-2df4-8013-8ab2-c34bc161e404" },
    { pageId: "e066cf5f-2778-443c-920e-9996db404fd2" },
    { pageId: "95bef0fe-f8bc-48eb-9e3d-5459427f088d" },
    { pageId: "fa6718bc-32fd-42eb-8a93-63869a368923" },
    { pageId: "4e474caa-db51-4ac9-a30d-8fd2b8de4d6c" },
  ];
}
