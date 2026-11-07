import type { Metadata } from "next";
import { AdminGate } from "@/components/AdminGate";
import { AdminPanel } from "@/components/AdminPanel";

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="page_body admin-page" id="main">
      <div className="centered">
        <AdminGate>
          <AdminPanel />
        </AdminGate>
      </div>
    </main>
  );
}
