import Link from 'next/link';

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const orderId = resolvedSearchParams.orderId as string || 'ORD-001';

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-cream dark:bg-background-dark">
      <div className="max-w-md w-full text-center">
        <div className="size-16 sm:size-20 lg:size-24 bg-secondary/20 text-primary dark:text-secondary rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
          <span className="material-symbols-outlined text-3xl sm:text-4xl lg:text-5xl">check_circle</span>
        </div>
        
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary dark:text-cream mb-3 sm:mb-4">Order Placed!</h1>
        <p className="font-body text-base sm:text-lg text-text-secondary dark:text-slate-400 mb-1 sm:mb-2">
          Thank you for your purchase.
        </p>
        <p className="font-body text-sm sm:text-base text-text-muted mb-6 sm:mb-8">
          Your order number is <span className="font-bold text-primary dark:text-cream">#{orderId}</span>. We've sent a confirmation email to your inbox.
        </p>

        <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-secondary/10 mb-6 sm:mb-8 text-left">
          <h3 className="font-bold font-body text-sm sm:text-base text-primary dark:text-cream mb-3 sm:mb-4 border-b border-secondary/20 pb-2">What happens next?</h3>
          <ul className="space-y-3 sm:space-y-4 font-body text-xs sm:text-sm">
            <li className="flex gap-2 sm:gap-3">
              <span className="material-symbols-outlined text-secondary text-lg sm:text-xl">inventory_2</span>
              <div>
                <span className="font-bold block text-primary dark:text-cream">We prepare your items</span>
                <span className="text-text-muted">Handmade items take 2-3 days to craft.</span>
              </div>
            </li>
            <li className="flex gap-2 sm:gap-3">
              <span className="material-symbols-outlined text-secondary text-lg sm:text-xl">local_shipping</span>
              <div>
                <span className="font-bold block text-primary dark:text-cream">It gets shipped</span>
                <span className="text-text-muted">You'll receive a tracking link via SMS.</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <Link 
            href={`/track?id=${orderId}`} 
            className="w-full bg-primary hover:bg-primary-light text-cream font-bold py-3 sm:py-4 rounded-full shadow-lg shadow-primary/20 transition-all text-sm sm:text-base min-h-[48px]"
          >
            Track Order
          </Link>
          <Link 
            href="/shop" 
            className="w-full border-2 border-primary text-primary dark:text-secondary font-bold py-3 sm:py-4 rounded-full hover:bg-primary/5 dark:hover:bg-secondary/10 transition-all text-sm sm:text-base min-h-[48px]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
