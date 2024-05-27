"use client";
import { Button } from "@/components/ui/button"
import React from "react" // Import the xlsx library

export function Renew() {
  const [working, setWorking] = React.useState(false)

  const handleStart = async () => {
    if (working) return;

    fetch("/api/renew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
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
          <div className="mt-6 flex justify-end">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleStart}
              disabled={working}
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
