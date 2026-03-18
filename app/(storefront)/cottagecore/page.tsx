import Link from 'next/link';

export default function Cottagecore() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FFF5EE] dark:bg-[#1f1313] relative overflow-hidden">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-[#FFF5EE]/90 dark:bg-[#1f1313]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <Link href="/" className="size-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-slate-800 dark:text-slate-200">
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </Link>
        <h1 className="font-serif text-xl font-bold">Cottagecore</h1>
        <button className="size-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-slate-800 dark:text-slate-200">
          <span className="material-symbols-outlined text-xl">tune</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="px-6 py-6">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] mb-8 shadow-lg">
          <img alt="Cottagecore aesthetic" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLa2qXvIBNOSLG8WUrsic_U5zSY_G-tVZOBCGQutY-lk64XzCHgEknaZNd8846tTEqkdEQ4EWCWAu4BHrg5ZkfBL3pwx_losXGRFLXoVQSf4GNqOlBHvrZlLMcse1B2aD7yVLQ26rs6ExuVdhddQlgVYWmTuwnr-eG_c3oHTeLe20n-UeMseykkiIAhMxH-w75-yajyO5GuklnWQEabWN4uR_qnYzhlipsRQ0tLkHNarxgX-jEz3Qxh0CRwtygvLoJ3kYOvFmdykyp" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-2">Collection</span>
            <h2 className="font-serif text-3xl text-white mb-1">Cottagecore Essentials</h2>
            <p className="font-body text-white/80 text-sm">Embrace the slow, magical life.</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar mb-8 pb-2">
          <button className="px-5 py-2.5 bg-[#e8a1a1] text-white rounded-full font-bold text-sm shrink-0 shadow-md shadow-[#e8a1a1]/30">All Items</button>
          <button className="px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full font-bold text-sm shrink-0 border border-slate-100 dark:border-slate-700">Apparel</button>
          <button className="px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full font-bold text-sm shrink-0 border border-slate-100 dark:border-slate-700">Decor</button>
          <button className="px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full font-bold text-sm shrink-0 border border-slate-100 dark:border-slate-700">Accessories</button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 mb-24">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-sm relative group">
            <button className="absolute top-5 right-5 z-10 size-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-[#e8a1a1] transition-colors">
              <span className="material-symbols-outlined text-[16px]">favorite</span>
            </button>
            <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-slate-50">
              <img alt="Mushroom Cardigan" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuC140FQLmgt5C6w-NJ7m-qdKzYsyhBYAW-oZ-DPRZTYk7vsArstQZyzMJcroPY24OSTCwkophXVRciNyrWN5XtYDfpMjAeB2aKHr-MrMf3bhl2QBZvOpRIlnLs1oGD3M-FtH1FHBB-YjkMn5xmf7G3UV7GObrSAicizShtqG9LZFWTdDpubLjgh46F7zPZyqO60ahyoWS2S2xypvzn6CoJdccZWfBCY1cRg1V26-jJzgKQ6ftaCCZrpoDsm_PGhX3Jroi0rENar1c" />
            </div>
            <h3 className="font-serif text-sm font-bold mb-1 line-clamp-1">Mushroom Cardigan</h3>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#e8a1a1] text-sm">৳ 3,200</span>
              <button className="size-8 rounded-full bg-[#e8a1a1]/10 text-[#e8a1a1] flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-sm relative group">
            <button className="absolute top-5 right-5 z-10 size-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-[#e8a1a1] transition-colors">
              <span className="material-symbols-outlined text-[16px] font-bold">favorite</span>
            </button>
            <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-slate-50">
              <img alt="Lace Trim Socks" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBpiPGarF93fIbtDJmiZ3x0VJZ9AmGxWMl26fkInDAf54Lr7zzuHCi_kOI0PKWNiin1WOcYx8PTD7JA1Y2IekfYEXnxt-eapr9oGGeJ-BnLHB-CeN3VGFYx7eJQpJRFcfk_dA3PTPR2PTiP6AmeEr3A5QvzPGf0IEcIv5X7x6ngh1G9qfJXTvVRyyEB-i1YDNYKkgfwSc30wlasX_hcA7LFGRcS56o6ugTTNToUooXqMsTt3U-0wmBwqKdj6qd0AqI3E1RzxebmyCz" />
            </div>
            <h3 className="font-serif text-sm font-bold mb-1 line-clamp-1">Lace Trim Socks</h3>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#e8a1a1] text-sm">৳ 450</span>
              <button className="size-8 rounded-full bg-[#e8a1a1]/10 text-[#e8a1a1] flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-sm relative group">
            <button className="absolute top-5 right-5 z-10 size-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-[#e8a1a1] transition-colors">
              <span className="material-symbols-outlined text-[16px]">favorite</span>
            </button>
            <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-slate-50">
              <img alt="Picnic Basket" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcMG-ViETT6vpzUWgqI7ucplO29MQ1pbZtdPVKantQwp9oI4Y3_cLTIx7l_3o77LFvRfDSmeibqWirRgrCy21KXlXCUvdTnurMFG0g5HxP2l1PLKpbRx-RfDDS9pRQdx9rz9IwzRr5sS8jlRIy0jXzRfmITd9nLmTZ7q8kDKRvkOHP1BtEYFn_RrjEETNJU0BafpdcuR-n5jNLa81b5b7qPjXLM26pqcROs49EDQeAx_DvRVkTjj-HGmc48tVylmHdsXuul1mLJn97" />
            </div>
            <h3 className="font-serif text-sm font-bold mb-1 line-clamp-1">Woven Picnic Basket</h3>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#e8a1a1] text-sm">৳ 1,800</span>
              <button className="size-8 rounded-full bg-[#e8a1a1]/10 text-[#e8a1a1] flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-sm relative group">
            <button className="absolute top-5 right-5 z-10 size-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-[#e8a1a1] transition-colors">
              <span className="material-symbols-outlined text-[16px]">favorite</span>
            </button>
            <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-slate-50">
              <img alt="Floral Headband" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe_MMRsrBAujrHbui6MwaNSpW9eHzi6YFVFP017bXCgIqpcBewlRxIE15Q1hdXVsEl6XPHdGqQvR4Wa_63hDEk9Xm36H6pkQrm7nQegLqzLt87Opz4maK_HTSmTVeKK-Uet79ouu6FTB5TIyEfk54K8RZ8HE-x7_A_oH8XfirrMvfwDpRcCLFmnF6Ny2yPnZWoaw4PKrSt_a_EixGJ6wZYtW75tfzMJYZyq37rL5V10MrfJn3vgsr9MiG9ctuwoGbq6-m9mfDRlZ5S" />
            </div>
            <h3 className="font-serif text-sm font-bold mb-1 line-clamp-1">Floral Headband</h3>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#e8a1a1] text-sm">৳ 350</span>
              <button className="size-8 rounded-full bg-[#e8a1a1]/10 text-[#e8a1a1] flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="size-14 bg-[#e8a1a1] text-white rounded-full shadow-lg shadow-[#e8a1a1]/40 flex items-center justify-center relative">
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="absolute -top-1 -right-1 size-5 bg-[#4A2E2E] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#FFF5EE]">2</span>
        </button>
      </div>
    </div>
  );
}
