// src/app/contenidos/excel-avanzado/[pageId]/page.tsx
import { notFound } from "next/navigation";
// Remove NotionRenderer from @notion-render/client import
// import { NotionRenderer } from '@notion-render/client';
// Remove HtmlRenderer import
// import HtmlRenderer from "@/components/notion/HtmlRenderer";
import OfficialNotionRenderer from "@/components/notion/OfficialNotionRenderer"; // Import the react-notion wrapper

// Import react-notion styles (needed on the client where OfficialNotionRenderer is used)
import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css'; // For code highlighting if you use code blocks


interface PageProps {
  params: {
    pageId: string;
  };
}

export default async function ExcelAvanzadoNotionPage({ params }: PageProps) {
  const pageId = params.pageId;

  console.log("--- Excel Avanzado Page Execution Start ---");
  console.log("PageId recibido en la ruta:", pageId);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const internalApiUrl = `${baseUrl}/contenidos/excel-avanzado/api/notion-page?pageId=${pageId}`;

  let blockMapData; // Variable to hold the fetched blockMap

  try {
    console.log("Attempting to fetch Notion data (blockMap) from internal API:", internalApiUrl);

    const response = await fetch(internalApiUrl);

    console.log(`Internal API Fetch completed. Status: ${response.status}`);

    if (!response.ok) {
        console.error(`Internal API returned non-ok status: ${response.status}`);
        const errorBody = await response.text();
        console.error("Internal API Error Body:", errorBody.substring(0, 200));
        if (response.status === 404) {
            return notFound();
        }
        throw new Error(`Failed to fetch from internal API, status: ${response.status}`);
    }

    blockMapData = await response.json(); // This should be the blockMap object
    console.log("Successfully fetched blockMap data from internal API");

    // Check if data is valid (expecting a blockMap object)
    if (!blockMapData || typeof blockMapData !== 'object') {
        console.error("Received empty or invalid data format (not a blockMap object) from internal API for ID:", pageId);
        console.error("--- Ending execution due to invalid data format ---");
        return notFound();
     }

    console.log(`Successfully validated data format (blockMap object) from internal API for ID: ${pageId}. Received keys: ${Object.keys(blockMapData).length}`);

    console.log("--- Data Fetching and BlockMap Generation Successful ---");


  } catch (error: any) {
     console.error(`--- Error during Excel Avanzado Page Execution (Fetching from internal API) for ID: ${pageId} ---`);
     console.error("Error details:", error);
     if (error instanceof Error) {
        console.error("Error stack:", error.stack);
    }
    console.error("--- Ending execution due to caught error ---");
    console.error("--- End of Error Log ---");
    return notFound(); // Handle error by returning 404
  }

  // If execution reaches here, blockMapData is populated
  console.log("--- Rendering Page with OfficialNotionRenderer (react-notion) ---");

  return (
    <main className="min-h-screen bg-gray-50 flex">
       {/* Use the OfficialNotionRenderer client component with the blockMap prop */}
       <OfficialNotionRenderer blockMap={blockMapData} />
    </main>
  );
}
