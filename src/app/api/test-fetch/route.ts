// src/app/api/test-fetch/route.ts
import { NextResponse } from "next/server";
import { NotionAPI } from "notion-client";
import { restoreNotionId } from "@/lib/utils"; // Assuming restoreNotionId is in utils.ts

export async function GET() {
  console.log("--- Test Notion Client Fetch Route Triggered ---");

  // Use a problematic page ID for this test
  const testPageId = "258f1269-2df4-8013-8ab2-c34bc161e404"; // Example problematic ID

  try {
    console.log(
      `Attempting to fetch page data for ID using notion-client: ${testPageId}`
    );

    const notion = new NotionAPI();
    const normalizedPageId = restoreNotionId(testPageId);

    console.log(`Calling notion.getPage(${normalizedPageId})`);
    const recordMap = await notion.getPage(normalizedPageId);
    console.log(`notion.getPage call finished for ${normalizedPageId}`);

    // Check if recordMap is valid (similar to your page logic)
    if (!recordMap || !recordMap.block) {
      console.error(
        `Test failed: Received empty or invalid recordMap from notion-client for ID: ${testPageId}`
      );
      if (recordMap) {
        console.error("Partial recordMap:", Object.keys(recordMap));
      }
      return NextResponse.json(
        {
          status: "error",
          message: `Notion client returned invalid data for ID ${testPageId}`,
          details: recordMap ? Object.keys(recordMap) : "empty",
        },
        { status: 500 }
      );
    }

    console.log(
      `Test successful: Successfully fetched and validated recordMap for ID: ${testPageId}`
    );
    // You can log a snippet of the fetched data if needed
    // console.log("RecordMap block keys:", Object.keys(recordMap.block).substring(0, 200));

    return NextResponse.json({
      status: "success",
      message: `Notion client test fetch succeeded for ID ${testPageId}`,
    });
  } catch (error: any) {
    console.error(
      `Error during Notion client test fetch for ID ${testPageId}:`,
      error
    );
    // Log the error stack trace
    if (error instanceof Error) {
      console.error("Error stack:", error.stack);
    }
    return NextResponse.json(
      {
        status: "error",
        message: `An error occurred during Notion client test fetch for ID ${testPageId}`,
        error: error.message,
      },
      { status: 500 }
    );
  } finally {
    console.log("--- Test Notion Client Fetch Route Finished ---");
  }
}
