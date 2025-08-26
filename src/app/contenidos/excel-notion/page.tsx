// src/app/contenidos/excel-notion/page.tsx
import Link from "next/link";

export default function ExcelNotionIndex() {
  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">Contenido Excel Notion</h1>
      <ul className="space-y-3">
        <li>
          <Link
            href="/contenidos/excel-notion/329633e019de477aab2135ae3d4d2aae"
            className="text-blue-600 hover:underline"
          >
            Página 1
          </Link>
        </li>
        <li>
          <Link
            href="/contenidos/excel-notion/258f1269-2df4-8013-8ab2-c34bc161e404"
            className="text-blue-600 hover:underline"
          >
            Página 2
          </Link>
        </li>
      </ul>
    </main>
  );
}
