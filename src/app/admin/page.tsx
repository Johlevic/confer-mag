import AdminDashboard from "@/components/AdminDashboard"
import Breadcrumbs from "@/components/Breadcrumbs"

export const metadata = { title: "Admin - Conferencia Magistral UNT" }

export default function AdminPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <Breadcrumbs items={[{ label: 'Admin' }]} />
        <AdminDashboard />
      </div>
    </section>
  )
}
