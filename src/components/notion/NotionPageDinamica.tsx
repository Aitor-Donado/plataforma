"use client";

import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
}

export default function NotionPage({ recordMap }: NotionPageProps) {
  return (
    <div className="prose mx-auto p-6">
      <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
    </div>
  );
}
