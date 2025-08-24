"use client";

import { useState, useCallback } from "react";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import { useRouter } from "next/navigation";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism.css";
import "katex/dist/katex.min.css";
import NotionSidebar from "./NotionSidebar";
import { restoreNotionId } from "@/lib/utils";

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
  pageId: string;
}

export default function NotionPage({ recordMap, pageId }: NotionPageProps) {
  const router = useRouter();
  const [currentRecordMap, setCurrentRecordMap] = useState(recordMap);
  const [currentPageId, setCurrentPageId] = useState(pageId);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Función para obtener el título de la página actual
  const getPageTitle = useCallback(() => {
    // Restaurar los guiones en el ID antes de buscarlo
    const normalizedPageId = restoreNotionId(currentPageId);
    const pageBlock = currentRecordMap.block[normalizedPageId];

    // Verificar si el bloque tiene la estructura anidada
    const blockData = pageBlock?.value || pageBlock;

    if (blockData && blockData.properties) {
      // Intentar obtener el título de la nueva estructura
      if (blockData.properties.title) {
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

      // Buscar en todas las propiedades por si acaso
      for (const [key, value] of Object.entries(blockData.properties)) {
        if (key.includes("title") || key.includes("name")) {
          if (Array.isArray(value) && value.length > 0) {
            // Nueva estructura: [["EXCEL Básico 15h"]]
            if (Array.isArray(value[0]) && value[0].length > 0) {
              return value[0][0] || "Página sin título";
            }
            // Estructura alternativa: ["EXCEL Básico 15h"]
            if (typeof value[0] === "string") {
              return value[0] || "Página sin título";
            }
          }
        }
      }
    }

    return "Página sin título";
  }, [currentRecordMap, currentPageId]);

  // Función para manejar la navegación a una subpágina
  const handleNavigateToPage = useCallback(
    async (newPageId: string) => {
      setIsLoading(true);
      setSidebarOpen(false); // Cerrar la barra lateral en móvil al navegar
      try {
        const response = await fetch(`/api/notion-page?pageId=${newPageId}`);
        const newRecordMap = await response.json();

        setCurrentRecordMap(newRecordMap);
        setCurrentPageId(newPageId);
        router.push(`/${newPageId}`);
      } catch (error) {
        console.error("Error al navegar a la página:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // Personalizamos el componente de página para manejar la navegación
  const components = {
    Page: (props: any) => {
      // Si es una subpágina, creamos un enlace para navegar a ella
      if (props.block?.type === "sub_page" || props.block?.type === "page") {
        const pageId = props.block.id;
        // Acceder a las propiedades correctamente
        const blockData = props.block.value || props.block;

        // Obtener el título usando la misma lógica que getPageTitle
        let title = "Página sin título";
        if (blockData.properties && blockData.properties.title) {
          if (
            Array.isArray(blockData.properties.title) &&
            blockData.properties.title.length > 0 &&
            Array.isArray(blockData.properties.title[0]) &&
            blockData.properties.title[0].length > 0
          ) {
            title = blockData.properties.title[0][0] || "Página sin título";
          } else if (
            Array.isArray(blockData.properties.title) &&
            blockData.properties.title.length > 0 &&
            typeof blockData.properties.title[0] === "string"
          ) {
            title = blockData.properties.title[0] || "Página sin título";
          }
        }

        return (
          <div
            className="notion-page-link"
            onClick={() => handleNavigateToPage(pageId)}
            style={{ cursor: "pointer" }}
          >
            {title}
          </div>
        );
      }

      // Para otros tipos de contenido, usamos el renderizador por defecto
      return <NotionRenderer.Components.Page {...props} />;
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-700">Cargando página...</p>
        </div>
      </div>
    );
  }

  const title = getPageTitle();

  return (
    <div className="notion-app flex h-screen">
      {/* Botón para abrir/cerrar la barra lateral en móvil */}
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

      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Barra lateral */}
      <div
        className={`
        fixed md:sticky top-0 h-screen z-10 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        <NotionSidebar
          recordMap={currentRecordMap}
          currentPageId={currentPageId}
          onNavigate={handleNavigateToPage}
        />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        <div className="notion-page-content">
          <h1 className="notion-title">{title}</h1>

          <NotionRenderer
            recordMap={currentRecordMap}
            fullPage={false}
            darkMode={false}
            components={components}
            disableHeader={true}
          />
        </div>
      </div>
    </div>
  );
}
