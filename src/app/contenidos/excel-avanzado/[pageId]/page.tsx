// src/app/contenidos/excel-avanzado/[pageId]/page.tsx
import { notFound } from "next/navigation";
// Import the client wrapper component
import NotionRendererClient from "@/components/notion/NotionRendererClient";

interface PageProps {
  params: {
    pageId: string;
  };
}

export default async function ExcelAvanzadoNotionPage({ params }: PageProps) {
  const pageId = params.pageId;

  console.log("--- Excel Avanzado Page Execution Start ---");
  console.log("PageId recibido en la ruta:", pageId);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
  const internalApiUrl = `${baseUrl}/contenidos/excel-avanzado/api/notion-page?pageId=${pageId}`;

  let notionDataForRenderer;

  try {
    console.log(
      "Attempting to fetch Notion data from internal API:",
      internalApiUrl
    );

    const response = await fetch(internalApiUrl);

    console.log(`Internal API Fetch completed. Status: ${response.status}`);

    if (!response.ok) {
      console.error(`Internal API returned non-ok status: ${response.status}`);
      const errorBody = await response.text();
      console.error("Internal API Error Body:", errorBody.substring(0, 200));
      if (response.status === 404) {
        return notFound();
      }
      throw new Error(
        `Failed to fetch from internal API, status: ${response.status}`
      );
    }

    notionDataForRenderer = await response.json();
    console.log(
      "Successfully fetched Notion data from internal API for renderer"
    );

    // Check if data is valid (basic check based on expected structure from API route)
    if (
      !notionDataForRenderer ||
      !notionDataForRenderer.page ||
      !notionDataForRenderer.blocks
    ) {
      console.error(
        "Received empty or invalid data structure from internal API for ID:",
        pageId
      );
      console.error("--- Ending execution due to invalid data structure ---");
      return notFound();
    }

    console.log(
      "Successfully validated data structure from internal API for ID:",
      pageId
    );
    console.log("Starting to render NotionRenderer for ID:", pageId);
  } catch (error: any) {
    console.error(
      `--- Error during Excel Avanzado Page Execution (Fetching from internal API) for ID: ${pageId} ---`
    );
    console.error("Error details:", error);
    if (error instanceof Error) {
      console.error("Error stack:", error.stack);
    }
    console.error(
      "--- Ending execution due to caught error during internal API fetch ---"
    );
    console.error("--- End of Error Log ---");
    return notFound(); // Or render a custom error page
  }

  console.log(
    "--- Excel Avanzado Page Execution Successfully Completed Try/Catch (Internal API) ---"
  );
  console.log("--- Rendering Page with NotionRenderer ---");

  return (
    <main className="min-h-screen bg-gray-50 flex">
      <NotionRendererClient
        recordMap={notionDataForRenderer as any} // Cast to any for now, or create a matching type
        fullPage={true}
        darkMode={false}
        // Add any other props required by NotionRenderer
      />
    </main>
  );
}
