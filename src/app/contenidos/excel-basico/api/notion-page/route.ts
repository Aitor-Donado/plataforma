import { NextRequest, NextResponse } from "next/server";
import { NotionAPI } from "notion-client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");

  if (!pageId) {
    return NextResponse.json(
      { error: "Missing pageId parameter" },
      { status: 400 }
    );
  }

  try {
    const notion = new NotionAPI();
    const recordMap = await notion.getPage(pageId);

    // Imprimir el recordMap en la consola del servidor
    console.log("=== RECORDMAP COMPLETO ===");
    console.log(JSON.stringify(recordMap, null, 2));
    console.log("=== FIN RECORDMAP ===");

    return NextResponse.json(recordMap);
  } catch (error) {
    console.error("Error fetching Notion page:", error);
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
}
