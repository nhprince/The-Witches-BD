import Link from 'next/link';
import { mockOrders, getBestsellers } from '@/lib/mock-data';

export default function AdminDashboard() {
  const recentOrders = mockOrders.slice(0, 4);
  const topProducts = getBestsellers(3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-primary dark:text-cream mb-1">Dashboard</h1>
          <p className="font-body text-sm sm:text-base text-text-muted">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <select className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-secondary/30 bg-white dark:bg-slate-800 font-body text-xs sm:text-sm outline-none focus:border-primary min-h-[40px]">
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
          </select>
          <button className="bg-primary hover:bg-primary-light text-cream font-bold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg sm:rounded-xl shadow-sm transition-all flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm min-h-[40px]">
            <span className="material-symbols-outlined text-sm sm:text-base">download</span>
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-secondary/10">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="size-8 sm:size-10 rounded-lg sm:rounded-xl bg-secondary/20 text-primary dark:text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-lg sm:text-xl">payments</span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-green-600 bg-green-50 dark:bg-green-500/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md flex items-center gap-0.5 sm:gap-1">
              <span className="material-symbols-outlined text-[8px] sm:text-[10px]">trending_up</span>
              +12.5%
            </span>
          </div>
          <p className="text-text-muted font-body text-xs sm:text-sm mb-0.5 sm:mb-1">Total Revenue</p>
          <h3 className="font-bold text-lg sm:text-2xl text-primary dark:text-cream">৳45,200</h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-secondary/10">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="size-8 sm:size-10 rounded-lg sm:rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg sm:text-xl">shopping_bag</span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-green-600 bg-green-50 dark:bg-green-500/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md flex items-center gap-0.5 sm:gap-1">
              <span className="material-symbols-outlined text-[8px] sm:text-[10px]">trending_up</span>
              +8.2%
            </span>
          </div>
          <p className="text-text-muted font-body text-xs sm:text-sm mb-0.5 sm:mb-1">Total Orders</p>
          <h3 className="font-bold text-lg sm:text-2xl text-primary dark:text-cream">124</h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-secondary/10">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="size-8 sm:size-10 rounded-lg sm:rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg sm:text-xl">group</span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-red-500 bg-red-50 dark:bg-red-500/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md flex items-center gap-0.5 sm:gap-1">
              <span className="material-symbols-outlined text-[8px] sm:text-[10px]">trending_down</span>
              -2.4%
            </span>
          </div>
          <p className="text-text-muted font-body text-xs sm:text-sm mb-0.5 sm:mb-1">New Customers</p>
          <h3 className="font-bold text-lg sm:text-2xl text-primary dark:text-cream">32</h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-secondary/10">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="size-8 sm:size-10 rounded-lg sm:rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg sm:text-xl">inventory_2</span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-text-muted bg-secondary/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
              0.0%
            </span>
          </div>
          <p className="text-text-muted font-body text-xs sm:text-sm mb-0.5 sm:mb-1">Low Stock Items</p>
          <h3 className="font-bold text-lg sm:text-2xl text-primary dark:text-cream">5</h3>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-sm border border-secondary/10 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-secondary/10 flex justify-between items-center">
            <h3 className="font-serif text-lg sm:text-xl text-primary dark:text-cream">Recent Orders</h3>
            <Link href="/admin/orders" className="text-xs sm:text-sm font-bold text-primary dark:text-secondary hover:underline font-body">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body text-xs sm:text-sm">
              <thead className="bg-secondary/5 dark:bg-slate-900/50 text-text-muted">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Order ID</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold hidden sm:table-cell">Customer</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Date</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Total</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/10">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/5 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-primary dark:text-cream">{order.id}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">{order.customerName}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-text-muted">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-primary dark:text-cream">৳{order.total}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold capitalize ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-sm border border-secondary/10 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-secondary/10 flex justify-between items-center">
            <h3 className="font-serif text-lg sm:text-xl text-primary dark:text-cream">Top Products</h3>
          </div>
          <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-3 sm:gap-4">
                <div className="size-10 sm:size-12 rounded-lg bg-secondary/10 overflow-hidden shrink-0">
                  <img src={product.images?.[0] || '/products/gift-box.jpeg'} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold font-body text-xs sm:text-sm text-primary dark:text-cream truncate">{product.name}</h4>
                  <p className="text-[10px] sm:text-xs text-text-muted">{42 - index * 14} sales</p>
                </div>
                <div className="font-bold text-xs sm:text-sm text-primary dark:text-cream">৳{(product.price * (42 - index * 14)).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
