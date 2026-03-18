# 🧶 The Witches BD

<div align="center">

**Handcrafted Crochet E-Commerce Platform**

A modern, fully responsive e-commerce website for selling handcrafted crochet products made with love in Bangladesh.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)

</div>

---

## ✨ Features

### Storefront
- 🏠 **Homepage** — Hero section, featured products, category showcase, new arrivals
- 🛍️ **Shop** — Filter by category, search, sort by price/newest
- 📦 **Product Details** — Image gallery, descriptions, add to cart
- 🛒 **Cart** — Add/remove items, quantity management
- 💳 **Checkout** — Order placement flow
- 📍 **Order Tracking** — Track order status

### Admin Dashboard
- 📊 **Dashboard** — Overview of orders and products
- 📦 **Products Management** — Add, edit, delete products
- 📋 **Orders Management** — View and update order status

### Design
- 🎨 **Custom Color Palette** — Warm coral, beige, and brown tones
- 🌙 **Dark Mode** — Full dark mode support
- 📱 **Responsive Design** — Mobile-first approach
- ✨ **Custom SVG Icons** — Hand-drawn category icons
- 🖌️ **Handcrafted Aesthetic** — Sticky notes, floating badges, tilt effects

---

## 🚀 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Backend** | Firebase (Firestore, Auth) |
| **State** | React Context API |
| **Icons** | Material Symbols, Custom SVGs |

---

## 📁 Project Structure

```
the-witches-bd/
├── app/
│   ├── (admin)/          # Admin dashboard routes
│   │   └── admin/
│   ├── (storefront)/     # Customer-facing routes
│   │   ├── account/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── shop/
│   │   └── page.tsx      # Homepage
│   ├── globals.css       # Global styles & theme
│   └── layout.tsx        # Root layout
├── components/
│   ├── AuthProvider.tsx  # Authentication context
│   ├── CartProvider.tsx  # Cart state management
│   ├── Header.tsx        # Navigation header
│   └── Footer.tsx        # Site footer
├── hooks/
│   └── use-mobile.ts     # Mobile detection hook
├── lib/
│   ├── firebase.ts       # Firebase configuration
│   ├── mock-data.ts      # Sample product data
│   └── utils.ts         # Utility functions
├── public/
│   ├── products/         # Product images
│   └── logo.webp         # Brand logo
└── docs/
    └── DEPLOYMENT-GUIDE.md
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:nhprince/The-Witches-BD.git
   cd The-Witches-BD
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#5D3D3D` | Headings, buttons, text |
| Secondary | `#E08067` | Accents, badges, highlights |
| Accent | `#8B9D83` | Secondary accents |
| Cream | `#F8EDE3` | Light background |
| Dark | `#3D2B2B` | Dark mode background |

---

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Export as Static Site (optional)

```bash
npm run export
```

### Deploy Options

- **Vercel** (Recommended) — `npx vercel`
- **Railway** — Connect GitHub repo
- **Render** — Connect GitHub repo
- **cPanel** — See [DEPLOYMENT-GUIDE.md](docs/DEPLOYMENT-GUIDE.md)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**nhprince**
- GitHub: [@nhprince](https://github.com/nhprince)

---

<div align="center">

**Made with ❤️ in Bangladesh**

</div>
