import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // IMPORTANT: make sure frontend uses "image" as the key
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // determine extension safely (prefer original extension, fallback to mime type)
    const originalName = (file as any).name ?? "upload";
    let ext = path.extname(originalName).toLowerCase();
    if (!ext) {
      const mime = (file as any).type || "";
      if (mime === "image/png") ext = ".png";
      else if (mime === "image/webp") ext = ".webp";
      else if (mime === "image/gif") ext = ".gif";
      else ext = ".jpg"; // default
    }

    // generate server-side unique filename (do not trust client name)
    const filename = `${Date.now()}-${randomUUID()}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
      originalName,
      size: buffer.length,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
