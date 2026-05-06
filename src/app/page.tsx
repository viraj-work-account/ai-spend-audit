import SpendForm from "@/components/SpendForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          AI Spend Audit
        </h1>

        <p className="text-gray-700 mb-6">
          Find out if you're overspending on AI tools and discover savings
          instantly.
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <SpendForm />
        </div>
      </div>
    </main>
  );
}
