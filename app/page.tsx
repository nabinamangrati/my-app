import React from "react";
import ImageUploader from "./ImageUpload/ImageUploader";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Upload an image</h1>
        <ImageUploader />
      </div>
    </main>
  );
}
