// src/app/contenidos/excel-notion/notion.ts
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { restoreNotionId } from "@/lib/utils";

export async function getRecordMap(pageId: string): Promise<ExtendedRecordMap> {
  const notion = new NotionAPI();
  const normalizedId = restoreNotionId(pageId);

  return await notion.getPage(normalizedId);
}
