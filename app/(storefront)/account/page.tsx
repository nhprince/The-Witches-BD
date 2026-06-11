import Link from 'next/link';

export default function AccountPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-background-dark">
      <div className="max-w-md w-full mx-auto p-8 text-center">
        <h1 className="font-serif text-3xl text-primary dark:text-cream mb-4">My Account</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Account features coming soon.</p>
        < Link href="/" className="inline-block px-6 py-3 bg-primary text-cream rounded-full hover:opacity-90 transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
