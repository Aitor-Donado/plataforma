// src/app/contenidos/excel-basico/api/notion-page/route.ts

import { NextRequest, NextResponse } from "next/server";
import { NotionAPI } from "notion-client";

export async function GET(request: NextRequest) {
  console.log("--- Internal Notion API Route Triggered ---");
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");

  if (!pageId) {
    return NextResponse.json(
      { error: "Missing pageId parameter" },
      { status: 400 }
    );
  }

  try {
    console.log(
      `Attempting to fetch Notion page data for ID using notion-client (in API route): ${pageId}`
    );
    const notion = new NotionAPI();
    // Assuming restoreNotionId is not needed here, as pageId from searchParams
    // should already be in a format usable by notion-client after page.tsx processing.
    // If restoreNotionId is needed, you would import it and use it here:
    // import { restoreNotionId } from "@/lib/utils";
    // const normalizedPageId = restoreNotionId(pageId);
    // console.log(`Calling notion.getPage(${normalizedPageId})`);
    // const recordMap = await notion.getPage(normalizedPageId);
    console.log(`Calling notion.getPage(${pageId})`);
    const recordMap = await notion.getPage(pageId);
    console.log(`notion.getPage call finished for ${pageId} (in API route)`);

    // Check if recordMap is valid (similar to your page logic)
    if (!recordMap || !recordMap.block) {
      console.error(
        `Test failed: Received empty or invalid recordMap from notion-client for ID (in API route): ${pageId}`
      );
      if (recordMap) {
        console.error(
          "Partial recordMap (in API route):",
          Object.keys(recordMap)
        );
      }
      return NextResponse.json(
        {
          status: "error",
          message: `Notion client returned invalid data for ID ${pageId} (in API route)`,
          details: recordMap ? Object.keys(recordMap) : "empty",
        },
        { status: 500 }
      );
    }

    console.log(
      `Successfully fetched and validated recordMap for ID (in API route): ${pageId}`
    );

    return NextResponse.json(recordMap);
  } catch (error) {
    console.error(
      `Error during Notion client fetch for ID ${pageId} (in API route):`,
      error
    );
    console.error("Error details (in API route):", error);
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
}
