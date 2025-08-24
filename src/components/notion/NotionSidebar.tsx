"use client";

import { ExtendedRecordMap } from "notion-types";

interface NotionSidebarProps {
  recordMap: ExtendedRecordMap;
  currentPageId: string;
  onNavigate: (pageId: string) => void;
  isOpen: boolean; // controlado desde el padre
  onClose: () => void; // función para cerrar el sidebar en móvil
}

export default function NotionSidebar({
  recordMap,
  currentPageId,
  onNavigate,
  isOpen,
  onClose,
}: NotionSidebarProps) {
  const getPageTitle = (pageId: string) => {
    const pageBlock = recordMap.block[pageId];
    if (!pageBlock) return "Página sin título";

    const blockData = pageBlock.value || pageBlock;
    const title = blockData?.properties?.title;

    if (Array.isArray(title)) {
      if (Array.isArray(title[0]) && title[0][0]) return title[0][0];
      if (typeof title[0] === "string") return title[0];
    }

    return "Página sin título";
  };

  return (
    <>
      {/* Overlay móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:sticky top-0 left-0 z-30 w-64 h-screen bg-white border-r border-gray-200 shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-4 space-y-6">
          {/* Header sidebar */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Navegación</h2>
            {/* Botón cerrar en móvil */}
            <button
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={onClose}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Lista de páginas */}
          <nav>
            <ul className="space-y-1">
              {Object.entries(recordMap.block).map(([id, block]) => {
                const blockData = block.value || block;
                if (
                  blockData.type !== "page" &&
                  blockData.type !== "sub_page"
                ) {
                  return null;
                }

                const title = getPageTitle(id);
                if (title === "Página sin título") return null;

                const isActive =
                  id.replace(/-/g, "") === currentPageId.replace(/-/g, "");
                const isMainPage = blockData.type === "page";

                return (
                  <li key={id}>
                    <button
                      onClick={() => onNavigate(id)}
                      className={`
                        w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center
                        ${
                          isActive
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                        ${isMainPage ? "font-bold" : ""}
                      `}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="truncate" title={title}>
                        {title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
