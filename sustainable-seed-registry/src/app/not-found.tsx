import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <span aria-hidden className="text-5xl">🌱</span>
      <h1 className="mt-6 text-3xl font-bold text-brand-900">Page not found</h1>
      <p className="mt-2 text-brand-700">
        We couldn&apos;t find what you were looking for.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
