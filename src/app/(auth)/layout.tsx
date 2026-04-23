import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#290042]/4 px-4 py-12">
      <Link href="/" className="mb-8 inline-flex items-center">
        <span className="text-2xl font-bold tracking-tight text-[#290042]">
          Kyrios <span className="text-[#F4C430]">CRM</span>
        </span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
