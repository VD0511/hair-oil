import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function GET() {
  // ✅ IMPORTANT: await is REQUIRED in your setup
  const cookieStore = await cookies();

  const paidUser = cookieStore.get("paid_user");
  const downloadToken = cookieStore.get("download_token");

  if (!paidUser || !downloadToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const filePath = path.join(process.cwd(), "private", "ebook.pdf");

  try {
    const file = fs.readFileSync(filePath);

    return new Response(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="ebook.pdf"',
      },
    });
  } catch (err) {
    return new Response("File not found", { status: 404 });
  }
}