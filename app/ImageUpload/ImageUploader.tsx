// "use client";
// import React, { useState } from "react";
// import { readAndCompressImage } from "browser-image-resizer";

// const config = {
//   quality: 0.7,
//   maxWidth: 200,
//   maxHeight: 200,
//   autoRotate: true,
//   debug: false,
// };

// export default function ImageUploader() {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [status, setStatus] = useState<string>("");
//   const [originalDims, setOriginalDims] = useState<string | null>(null);
//   const [resizedDims, setResizedDims] = useState<string | null>(null);

//   async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setStatus("Reading original image...");

//     // get original dimensions
//     const origUrl = URL.createObjectURL(file);
//     const origImg = new Image();
//     origImg.onload = () => {
//       setOriginalDims(`${origImg.naturalWidth}x${origImg.naturalHeight}`);
//       URL.revokeObjectURL(origUrl);
//     };
//     origImg.src = origUrl;

//     setStatus("Resizing...");
//     try {
//       const resizedBlob = await readAndCompressImage(file, config);

//       // show preview from resized blob
//       const resizedUrl = URL.createObjectURL(resizedBlob);
//       setPreview(resizedUrl);

//       // get resized dimensions
//       const resImg = new Image();
//       resImg.onload = () => {
//         setResizedDims(`${resImg.naturalWidth}x${resImg.naturalHeight}`);
//         URL.revokeObjectURL(resizedUrl);
//       };
//       resImg.src = resizedUrl;

//       // prepare file and upload
//       const resizedFile = new File([resizedBlob], file.name, { type: resizedBlob.type });
//       const formData = new FormData();
//       formData.append("image", resizedFile);

//       setStatus("Uploading...");
//       const res = await fetch("/api/upload", { method: "POST", body: formData });
//       const data = await res.json();
//       setStatus(`Uploaded: ${data.filename} (${data.size} bytes)`);
//     } catch (err) {
//       console.error(err);
//       setStatus("Error processing image");
//     }
//   }

//   return (
//   <div className="flex flex-col items-center w-full gap-6 p-6">

//     {/* Upload Area */}
//     <label
//       htmlFor="file-upload"
//       className="w-full max-w-md flex flex-col items-center justify-center p-6 border-2 border-dashed 
//       border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition"
//     >
//       <span className="text-gray-600 text-sm">Click to upload</span>
//       <span className="text-blue-600 font-medium mt-1">Select an Image</span>
//     </label>

//     <input
//       id="file-upload"
//       type="file"
//       accept="image/*"
//       onChange={onFileChange}
//       className="hidden"
//     />

//     {/* Preview Card */}
//     {preview && (
//       <div className="w-full max-w-md p-4 bg-white rounded-xl shadow-md">
//         <img
//           src={preview}
//           alt="preview"
//           className="w-full rounded-lg object-contain border"
//         />
//       </div>
//     )}

//     {/* Info Panel */}
//     <div className="w-full max-w-md bg-gray-100 p-4 rounded-xl shadow-sm text-gray-700 text-sm space-y-1">
//       <div><strong>Original:</strong> {originalDims ?? "-"}</div>
//       <div><strong>Resized:</strong> {resizedDims ?? "-"}</div>
//       <div className="pt-1 text-gray-500">{status}</div>
//     </div>
//   </div>
// );

// }



// "use client";
// import React, { useState } from "react";
// import { readAndCompressImage } from "browser-image-resizer";

// const config = {
//   quality: 0.7,
//   maxWidth: 200,
//   maxHeight: 200,
//   autoRotate: true,
//   debug: false,
// };

// export default function SidebarImageUploader() {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [status, setStatus] = useState<string>("");

//   async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setStatus("Resizing...");
//     try {
//       const resizedBlob = await readAndCompressImage(file, config);
//       const resizedUrl = URL.createObjectURL(resizedBlob);
//       setPreview(resizedUrl);

//       // Prepare file and upload
//       const resizedFile = new File([resizedBlob], file.name, { type: resizedBlob.type });
//       const formData = new FormData();
//       formData.append("image", resizedFile);

//       setStatus("Uploading...");
//       const res = await fetch("/api/upload", { method: "POST", body: formData });
//       const data = await res.json();
//       setStatus(`Uploaded`);
//     } catch (err) {
//       console.error(err);
//       setStatus("Error processing image");
//     }
//   }

//   return (
//     <div className="flex flex-col items-center gap-2">
//       {/* File Input */}
//       <label
//         htmlFor="sidebar-file-upload"
//         className="w-full flex flex-col items-center justify-center p-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 text-sm"
//       >
//         {preview ? "Change Image" : "Upload Image"}
//       </label>
//       <input
//         id="sidebar-file-upload"
//         type="file"
//         accept="image/*"
//         onChange={onFileChange}
//         className="hidden"
//       />

//       {/* Preview */}
//       {preview && (
//         <img
//           src={preview}
//           alt="uploaded"
//           className="mt-2 w-full rounded-md border object-contain"
//         />
//       )}

//       {/* Status */}
//       {status && <span className="text-xs text-gray-500">{status}</span>}
//     </div>
//   );
// }


"use client";
import React, { useState } from "react";
import { readAndCompressImage } from "browser-image-resizer";

const config = {
  quality: 0.7,
  maxWidth: 200,
  maxHeight: 200,
  autoRotate: true,
  debug: false,
};

export default function SidebarImageUploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [status, setStatus] = useState<string>("");

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("Resizing...");
    try {
      // 1. Compress the image
      const resizedBlob = await readAndCompressImage(file, config);
      setCompressedBlob(resizedBlob);

      // 2. Generate preview using FileReader
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) setPreview(result);
      };
      reader.readAsDataURL(resizedBlob);

      setStatus("Preview ready. Confirm to upload.");
    } catch (err) {
      console.error(err);
      setStatus("Error processing image");
    }
  }

  async function uploadImage() {
    if (!compressedBlob) return;

    setStatus("Uploading...");
    try {
      const formData = new FormData();
      const file = new File([compressedBlob], "image.jpg", { type: compressedBlob.type });
      formData.append("image", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      setStatus(`Uploaded successfully!`);
      // Optionally, clear preview after upload
      setPreview(null);
      setCompressedBlob(null);
    } catch (err) {
      console.error(err);
      setStatus("Upload failed");
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* File Input */}
      <label
        htmlFor="sidebar-file-upload"
        className="w-full flex flex-col items-center justify-center p-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 text-sm"
      >
        {preview ? "Change Image" : "Upload Image"}
      </label>
      <input
        id="sidebar-file-upload"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />

      {/* Preview */}
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="mt-2 w-full rounded-md border object-contain"
        />
      )}

      {/* Confirm button */}
      {preview && (
        <button
          onClick={uploadImage}
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Confirm Upload
        </button>
      )}

      {/* Status */}
      {status && <span className="text-xs text-gray-500">{status}</span>}
    </div>
  );
}
