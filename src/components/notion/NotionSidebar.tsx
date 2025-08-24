"use client";

import { ExtendedRecordMap } from "notion-types";

interface NotionSidebarProps {
  recordMap: ExtendedRecordMap;
  currentPageId: string;
  onNavigate: (pageId: string) => void;
}

export default function NotionSidebar({
  recordMap,
  currentPageId,
  onNavigate,
}: NotionSidebarProps) {
  // Función para obtener el título de una página
  const getPageTitle = (pageId: string) => {
    const pageBlock = recordMap.block[pageId];

    if (!pageBlock) return "Página sin título";

    // Verificar si el bloque tiene la estructura anidada
    const blockData = pageBlock.value || pageBlock;

    if (blockData && blockData.properties && blockData.properties.title) {
      // La nueva estructura: [["EXCEL Básico 15h"]]
      if (
        Array.isArray(blockData.properties.title) &&
        blockData.properties.title.length > 0 &&
        Array.isArray(blockData.properties.title[0]) &&
        blockData.properties.title[0].length > 0
      ) {
        return blockData.properties.title[0][0] || "Página sin título";
      }

      // Estructura alternativa: ["EXCEL Básico 15h"]
      if (
        Array.isArray(blockData.properties.title) &&
        blockData.properties.title.length > 0 &&
        typeof blockData.properties.title[0] === "string"
      ) {
        return blockData.properties.title[0] || "Página sin título";
      }
    }

    return "Página sin título";
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Navegación</h2>
          {/* Botón para cerrar en móvil */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => {
              // Este botón se manejará desde el componente padre
              const closeButton = document.querySelector(".notion-app button");
              if (closeButton) {
                (closeButton as HTMLButtonElement).click();
              }
            }}
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

        <nav>
          <ul className="space-y-1">
            {recordMap?.block &&
              Object.entries(recordMap.block).map(([id, block]) => {
                // Solo mostrar páginas que tengan título
                const blockData = block.value || block;

                if (
                  blockData.type === "page" ||
                  blockData.type === "sub_page"
                ) {
                  const title = getPageTitle(id);

                  // Solo mostrar si tiene título
                  if (title !== "Página sin título") {
                    const isActive =
                      id === currentPageId ||
                      id.replace(/-/g, "") === currentPageId.replace(/-/g, "");

                    return (
                      <li key={id}>
                        <button
                          onClick={() => onNavigate(id)}
                          className={`
                          w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors
                          flex items-center
                          ${
                            isActive
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-700 hover:bg-gray-100"
                          }
                        `}
                        >
                          {/* Icono de página */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
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

                          {/* Texto del título con truncamiento para títulos largos */}
                          <span className="truncate" title={title}>
                            {title}
                          </span>
                        </button>
                      </li>
                    );
                  }
                }

                return null;
              })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
