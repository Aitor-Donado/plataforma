"use client";

import { useRouter } from "next/navigation";
import { ExtendedRecordMap } from "notion-types";

interface NotionHeaderProps {
  recordMap: ExtendedRecordMap;
  pageId: string;
}

export default function NotionHeader({ recordMap, pageId }: NotionHeaderProps) {
  const router = useRouter();

  // Función para obtener el título de la página actual
  const getPageTitle = () => {
    const pageBlock = recordMap.block[pageId];
    console.log("Header - Buscando título en el bloque:", pageBlock);

    // Verificar si el bloque tiene la estructura anidada
    const blockData = pageBlock?.value || pageBlock;
    console.log("Header - Datos del bloque:", blockData);

    if (blockData && blockData.properties) {
      console.log("Header - Propiedades del bloque:", blockData.properties);

      // Intentar obtener el título de la nueva estructura
      if (blockData.properties.title) {
        console.log(
          "Header - Propiedad title encontrada:",
          blockData.properties.title
        );

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
        console.log(`Header - Propiedad ${key}:`, value);
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
  };

  // Función para navegar a una página
  const navigateToPage = (pageId: string) => {
    router.push(`/${pageId}`);
  };

  const title = getPageTitle();

  return (
    <header className="notion-header">
      <div className="notion-nav-header">
        <div className="notion-nav-header-title">
          <h1>{title}</h1>
        </div>
        <div className="notion-nav-header-rhs breadcrumbs">
          {recordMap?.block &&
            Object.entries(recordMap.block).map(([id, block]) => {
              // Solo mostrar páginas que tengan título y que no sean la página actual
              // Acceder a las propiedades correctamente
              const blockData = block.value || block;

              // Comprobar si es una página o subpágina
              if (blockData.type === "page" || blockData.type === "sub_page") {
                // Obtener el título usando la misma lógica que getPageTitle
                let title = "Página sin título";
                if (blockData.properties && blockData.properties.title) {
                  if (
                    Array.isArray(blockData.properties.title) &&
                    blockData.properties.title.length > 0 &&
                    Array.isArray(blockData.properties.title[0]) &&
                    blockData.properties.title[0].length > 0
                  ) {
                    title =
                      blockData.properties.title[0][0] || "Página sin título";
                  } else if (
                    Array.isArray(blockData.properties.title) &&
                    blockData.properties.title.length > 0 &&
                    typeof blockData.properties.title[0] === "string"
                  ) {
                    title =
                      blockData.properties.title[0] || "Página sin título";
                  }
                }

                // Solo mostrar si tiene título y no es la página actual
                if (title !== "Página sin título" && id !== pageId) {
                  return (
                    <button
                      key={id}
                      onClick={() => navigateToPage(id)}
                      className="notion-nav-item"
                    >
                      {title}
                    </button>
                  );
                }
              }

              return null;
            })}
        </div>
      </div>
    </header>
  );
}
