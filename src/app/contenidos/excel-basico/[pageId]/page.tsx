import NotionPage from "@/components/notion/NotionPage";
import { notFound } from "next/navigation";

import { ExtendedRecordMap } from "notion-types"; // Keep this type import

// Componente de la página - ahora es asíncrono
export default async function NotionPageRoute({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  // Await los params antes de usar sus propiedades
  const { pageId } = await params; // Original pageId with hyphens from route
  console.log(
    "--- Dynamic Route Execution Start (Fetching from internal API) ---"
  );
  // Normalize pageId by removing hyphens for consistent logging and usage
  const normalizedPageId = pageId.replace(/-/g, "");
  console.log("PageId recibido en la ruta:", pageId);

  let recordMap; // Declare recordMap outside the try block

  try {
    // Construct the URL for your internal API route
    // Use an absolute URL when fetching from server components/API routes
    // In production, get the base URL from environment variables or headers
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"); // Example base URL logic
    const internalApiUrl = `${baseUrl}/contenidos/excel-basico/api/notion-page?pageId=${pageId}`; // Pass original pageId with hyphens if your API expects it

    console.log(
      "Attempting to fetch Notion page data from internal API:",
      internalApiUrl
    );

    const response = await fetch(internalApiUrl);

    console.log(`Internal API Fetch completed. Status: ${response.status}`);

    if (!response.ok) {
      console.error(`Internal API returned non-ok status: ${response.status}`);
      // Attempt to read error body from API
      const errorBody = await response.text(); // Assuming your API route returns text/JSON error bodies
      console.error("Internal API Error Body:", errorBody.substring(0, 200));
      // If internal API returns 404, propagate it
      if (response.status === 404) {
        return notFound();
      }
      // For other errors, throw to be caught below
      throw new Error(
        `Failed to fetch from internal API, status: ${
          response.status
        }. Body: ${errorBody.substring(0, 100)}...`
      );
    }

    recordMap = await response.json(); // Assuming your API route returns JSON { recordMap: ... } or just the recordMap
    console.log("Successfully fetched recordMap from internal API");

    // Check if recordMap is valid and contains expected data
    if (!recordMap || !recordMap.block) {
      console.error(
        `Received empty or invalid recordMap from getRecordMap for ID: ${pageId}`
      );
      // Log more details if recordMap is partially available
      if (recordMap) {
        console.error("Partial recordMap:", Object.keys(recordMap));
      }
      // Indicate a client error or not found
      console.error(
        "--- Ending execution due to invalid recordMap from internal API ---"
      );
      return notFound(); // Use return with notFound() to exit the function gracefully
    }

    // If your API returns { recordMap: ... }, unwrap it here
    // const unwrappedRecordMap: ExtendedRecordMap = recordMap.recordMap;

    console.log(
      "Successfully validated Notion recordMap from internal API for ID:",
      pageId
    );
    console.log("Starting to render NotionPage component for ID:", pageId);
  } catch (error) {
    console.error(
      "--- Error during Dynamic Route Execution for ID:",
      pageId,
      "---"
    );
    console.error("Error details:", error);
    // Log the error stack trace
    if (error instanceof Error) {
      console.error("Error stack:", error.stack);
    }
    console.error(
      "--- Ending execution due to caught error during internal API fetch ---"
    );
    console.error("--- End of Error Log ---");
    return notFound(); // Use return with notFound() to exit the function gracefully
  }

  // If execution reaches here, recordMap is valid and we can render
  console.log(
    "--- Dynamic Route Execution Successfully Completed Try/Catch (Internal API) ---"
  );
  console.log("--- Rendering Page ---");

  return (
    <main className="min-h-screen bg-gray-50 flex">
      <NotionPage
        recordMap={recordMap as ExtendedRecordMap} // Cast to ExtendedRecordMap type
        pageId={pageId} // Pass original pageId to component if needed
        basePath="/contenidos/excel-basico"
      />
    </main>
  );
}
/* 
// Genera los parámetros estáticos para las páginas (opcional, para SSG)
export async function generateStaticParams() {
  console.log("Generating static params...");
  return [
    { pageId: "329633e0-19de-477a-ab21-35ae3d4d2aae" },
    { pageId: "258f1269-2df4-8013-8ab2-c34bc161e404" },
    { pageId: "e066cf5f-2778-443c-920e-9996db404fd2" },
    { pageId: "95bef0fe-f8bc-48eb-9e3d-5459427f088d" },
  ];
}
 */
