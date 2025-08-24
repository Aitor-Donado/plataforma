"use client";

import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useCallback, useState } from "react";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism.css";
import "katex/dist/katex.min.css";

import NotionSidebar from "./NotionSidebar";
import { restoreNotionId } from "@/lib/utils";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
  pageId: string;
  basePath: string;
}

export default function NotionPage({
  recordMap,
  pageId,
  basePath,
}: NotionPageProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigateToPage = (newPageId: string) => {
    setSidebarOpen(false);
    router.push(`${basePath}/${newPageId}`);
  };

  const getPageTitle = useCallback(() => {
    const normalizedPageId = restoreNotionId(pageId);
    const pageBlock = recordMap.block[normalizedPageId];
    const blockData = pageBlock?.value || pageBlock;

    const title = blockData?.properties?.title;
    if (Array.isArray(title)) {
      if (Array.isArray(title[0]) && title[0][0]) return title[0][0];
      if (typeof title[0] === "string") return title[0];
    }

    return "Página sin título";
  }, [recordMap, pageId]);

  const mapPageUrl = useCallback(
    (id: string) => `${basePath}/${id}`,
    [basePath]
  );

  const components = useMemo(
    () => ({
      a: ({
        href,
        children,
        ...rest
      }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
        if (!href) return <a {...rest}>{children}</a>;

        const isInternal =
          href.startsWith("/") && href.replace(/\//g, "").length >= 32;
        const targetHref = isInternal ? `${basePath}${href}` : href;

        if (isInternal) {
          return (
            <a
              {...rest}
              href={targetHref}
              onClick={(e) => {
                e.preventDefault();
                router.push(targetHref);
              }}
            >
              {children}
            </a>
          );
        }

        return (
          <a
            {...rest}
            href={targetHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
      Code,
      Collection,
    }),
    [router, basePath]
  );

  const title = getPageTitle();

  return (
    <div className="notion-app flex h-screen">
      {/* Botón abrir/cerrar sidebar en móvil */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 bg-white p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <NotionSidebar
        recordMap={recordMap}
        currentPageId={pageId}
        onNavigate={handleNavigateToPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto">
        <div className="notion-page-content">
          <h1 className="notion-title">{title}</h1>
          <NotionRenderer
            recordMap={recordMap}
            fullPage={false}
            darkMode={false}
            mapPageUrl={mapPageUrl}
            components={components}
            disableHeader
          />
        </div>
      </div>
    </div>
  );
}
