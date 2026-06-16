import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SuccessPage() {
  const cookieStore = await cookies();

  const paidUser = cookieStore.get("paid_user");
  const downloadToken =
    cookieStore.get("download_token");

  if (!paidUser || !downloadToken) {
    redirect("/");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Payment Successful 🎉
        </h1>

        <a
          href="/api/download"
          className="mt-6 inline-block bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          Download PDF
        </a>
      </div>
    </main>
  );
}