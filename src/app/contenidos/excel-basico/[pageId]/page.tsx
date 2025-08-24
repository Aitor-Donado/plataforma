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
  // Aquí podrías predefinir las páginas que quieres generar estáticamente
  // Por ejemplo:
  return [
    { pageId: "329633e019de477aab2135ae3d4d2aae" },
    // Agrega aquí los IDs de otras páginas que quieras pregenerar
  ];
}
