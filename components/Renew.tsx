"use client";
import { Button } from "@/components/ui/button"
import React from "react"
import * as XLSX from "xlsx"; // Import the xlsx library

export function Renew() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [working, setWorking] = React.useState(false)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleStart = () => {
    if (!selectedFile) return;
    if (working) return;
    setWorking(true)

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const sheets = workbook.SheetNames;

      for (let i = 0; i < sheets.length; i++) {
        const temp = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]]) as any[];
        for (let j = 0; j < temp.length; j++) {
          const id = temp[j].Id;
          console.log(id)
          // call backend api
          fetch("/api/renew", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          })
        }
      }
    };
    reader.readAsArrayBuffer(selectedFile);

    setTimeout(() => {
      setWorking(false)
    }, 3000);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MountainIcon className="h-6 w-6" />
          <h1 className="text-xl font-bold">Renovar Anunucios</h1>
        </div>
      </header>
      <main className="flex-1 bg-gray-100 dark:bg-gray-800 py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Subir Excel de Publicaciones</h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex items-center justify-center border-dashed border-2 border-gray-400 dark:border-gray-600 cursor-pointer hover:border-gray-500 dark:hover:border-gray-500 transition-colors">
            <div className="text-center">
              <UploadIcon className="h-12 w-12 text-gray-500 dark:text-gray-400 mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                <label htmlFor="file-upload" className="text-blue-500 dark:text-blue-400 underline cursor-pointer">
                  seleccionar el archivo de publicaciones
                </label>
              </p>
              <input
                id="file-upload"
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
          {selectedFile && (
            <div className="mt-4">
              <p className="text-gray-500 dark:text-gray-400">Archivo Seleccionado: {selectedFile.name}</p>
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleStart}
              disabled={!selectedFile || working}
            >
              Comenzar la Renovación
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

function MountainIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function UploadIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
