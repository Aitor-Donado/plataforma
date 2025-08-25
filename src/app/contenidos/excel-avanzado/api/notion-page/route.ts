// src/app/contenidos/excel-avanzado/api/notion-page/route.ts
import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

import { GetPageResponse, ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');

  if (!pageId) {
    console.error("Missing pageId query parameter for Excel Avanzado API route.");
    return NextResponse.json({ status: 'error', message: 'Missing pageId parameter' }, { status: 400 });
  }

  const notionApiKey = process.env.NOTION_API_KEY;

  if (!notionApiKey) {
    console.error("Notion API Key environment variable NOTION_API_KEY is not set.");
    return NextResponse.json({ status: 'error', message: 'Notion API Key not configured on the server.' }, { status: 500 });
  }

  const notion = new Client({ auth: notionApiKey });

  try {
    console.log(`--- Excel Avanzado Notion API Route Triggered (Official API) ---`);
    console.log(`Attempting to fetch page and block data for ID using official Notion client: ${pageId}`);
    
    // Fetch the page object
    const page: GetPageResponse = await notion.pages.retrieve({ page_id: pageId });
    console.log(`Official Notion API fetch completed for page object for ID: ${pageId}`);    
    console.log("Official Notion API page object type:", page.object);


    // Fetch the child blocks of the page
    const blocks: ListBlockChildrenResponse = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100, // Adjust page size as needed
    });
    console.log(`Official Notion API fetch completed for child blocks for ID: ${pageId}. Fetched ${blocks.results.length} blocks.`);
    console.log("Official Notion API child blocks object type:", blocks.object);

    return NextResponse.json(blocks.results);

  } catch (error: any) {
    console.error(`--- Error during official Notion client fetch in API route for ID ${pageId} ---`);
    console.error("Error details:", error);

    if (error instanceof Error) {
        console.error("Error stack:", error.stack);
         return NextResponse.json({ status: 'error', message: `An error occurred fetching ID ${pageId} from official API: ${error.message}` }, { status: 500 });
    } else {
          return NextResponse.json({ status: 'error', message: `An unknown error occurred fetching ID ${pageId} from official API` }, { status: 500 });
    }
  }
 finally {
      console.log("--- Excel Avanzado Notion API Route Finished ---");
  }
}