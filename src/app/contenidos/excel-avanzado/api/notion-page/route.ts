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


    // Fetch the child blocks of the page
    const blocks: ListBlockChildrenResponse = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100, // Adjust page size as needed
    });
    console.log(`Official Notion API fetch completed for child blocks for ID: ${pageId}. Fetched ${blocks.results.length} blocks.`);
    console.log("Official Notion API child blocks object type:", blocks.object);

    // Transform the array of block objects into the blockMap format for react-notion
    const blockMap = blocks.results.reduce((map: { [key: string]: any }, block: any) => {
        // Ensure the block has an ID before adding it to the map
        if ('id' in block) {
            map[block.id] = {
                value: block, // The original official API block object
                role: 'reader', // Default role, common in notion-client's recordMap
                // You might need to add other properties here if react-notion requires them,
                // based on inspecting a recordMap from notion-client.
            };
        }
        return map;
    }, {});

    console.log("Generated blockMap for react-notion:", blockMap); // Log the generated blockMap

    return NextResponse.json(blockMap);


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