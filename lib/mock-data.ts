// Mock Data for The Witches BD
// Handcrafted crochet products - NO herbal items

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  category: string;
  tags: string[];
  images: string[];
  status: 'active' | 'draft';
  createdAt: Date;
  featured?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerUid: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  transactionId?: string;
  shippingAddress: ShippingAddress;
  notes?: string;
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface Customer {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  photoURL?: string;
  createdAt: Date;
  ordersCount: number;
  totalSpent: number;
}

// Product Categories
export const categories = [
  { id: 'bags', name: 'Bags & Purses', slug: 'bags-purses' },
  { id: 'apparel', name: 'Apparel', slug: 'apparel' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories' },
  { id: 'decor', name: 'Home Decor', slug: 'home-decor' },
  { id: 'gifts', name: 'Gifts', slug: 'gifts' },
];

// 34 Products
export const mockProducts: Product[] = [
  // Bags & Purses (5 products)
  {
    id: 'prod_001',
    name: 'Boho Bucket Bag',
    description: 'Handwoven bucket bag with drawstring closure. Perfect for everyday essentials. Made with premium cotton yarn in a beautiful bohemian style.',
    price: 1850,
    compareAtPrice: 2200,
    sku: 'BAG-001',
    stock: 12,
    category: 'Bags & Purses',
    tags: ['Bestseller', 'Handmade'],
    images: ['/products/bag-bucket.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-15'),
    featured: true,
  },
  {
    id: 'prod_002',
    name: 'Crochet Crossbody Purse',
    description: 'Compact crossbody bag with adjustable strap. Features a secure button closure and intricate crochet pattern. Ideal for casual outings.',
    price: 1450,
    sku: 'BAG-002',
    stock: 8,
    category: 'Bags & Purses',
    tags: ['New', 'Handmade'],
    images: ['/products/bag-crossbody.jpeg'],
    status: 'active',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'prod_003',
    name: 'Mini Pouch Bag',
    description: 'Adorable mini pouch perfect for storing small items like jewelry, coins, or makeup. Makes a great gift addition.',
    price: 650,
    sku: 'BAG-003',
    stock: 25,
    category: 'Bags & Purses',
    tags: ['Gift Idea', 'Handmade'],
    images: ['/products/bag-pouch.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'prod_004',
    name: 'Woven Tote Bag',
    description: 'Spacious tote bag handwoven with durable cotton. Perfect for market trips, beach days, or everyday use. Strong handles for heavy items.',
    price: 2400,
    sku: 'BAG-004',
    stock: 6,
    category: 'Bags & Purses',
    tags: ['Bestseller'],
    images: ['/products/bag-tote.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-10'),
    featured: true,
  },
  {
    id: 'prod_005',
    name: 'Round Raffia Bag',
    description: 'Elegant round bag with a natural raffia look. Features a secure zipper closure and inner pocket. Perfect for summer events.',
    price: 1950,
    compareAtPrice: 2400,
    sku: 'BAG-005',
    stock: 4,
    category: 'Bags & Purses',
    tags: ['Sale', 'Summer'],
    images: ['/products/bag-round.jpeg'],
    status: 'active',
    createdAt: new Date('2024-02-05'),
  },

  // Apparel (4 products)
  {
    id: 'prod_006',
    name: 'Crochet Cardigan',
    description: 'Cozy oversized cardigan hand-crocheted with soft wool blend. Features beautiful openwork pattern. Perfect for layering in any season.',
    price: 4200,
    sku: 'APR-001',
    stock: 3,
    category: 'Apparel',
    tags: ['Bestseller', 'Made to Order'],
    images: ['/products/apparel-cardigan.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-05'),
    featured: true,
  },
  {
    id: 'prod_007',
    name: 'Open-Front Shrug',
    description: 'Lightweight cropped shrug with delicate crochet details. Perfect for adding a handmade touch to any outfit. One size fits most.',
    price: 1800,
    sku: 'APR-002',
    stock: 7,
    category: 'Apparel',
    tags: ['New', 'Handmade'],
    images: ['/products/apparel-shrug.jpeg'],
    status: 'active',
    createdAt: new Date('2024-02-10'),
  },
  {
    id: 'prod_008',
    name: 'Crochet Crop Top',
    description: 'Stylish crop top with beautiful granny square pattern. Lined for comfort. Perfect for summer festivals and beach days.',
    price: 2200,
    sku: 'APR-003',
    stock: 5,
    category: 'Apparel',
    tags: ['Summer', 'Handmade'],
    images: ['/products/apparel-croptop.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-25'),
  },
  {
    id: 'prod_009',
    name: 'Summer Cardigan',
    description: 'Breathable cotton cardigan perfect for air-conditioned spaces. Lightweight design with beautiful stitch pattern. Versatile layer piece.',
    price: 3500,
    sku: 'APR-004',
    stock: 4,
    category: 'Apparel',
    tags: ['New'],
    images: ['/products/apparel-summer-cardigan.jpeg'],
    status: 'active',
    createdAt: new Date('2024-02-15'),
  },

  // Accessories (6 products)
  {
    id: 'prod_010',
    name: 'Lace Trim Socks (Pair)',
    description: 'Delicate ankle socks with pretty lace trim. Soft cotton blend for all-day comfort. Available in multiple colors.',
    price: 450,
    sku: 'ACC-001',
    stock: 30,
    category: 'Accessories',
    tags: ['Bestseller', 'Gift Idea'],
    images: ['/products/socks-lace.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-08'),
    featured: true,
  },
  {
    id: 'prod_011',
    name: 'Cozy Ankle Socks',
    description: 'Thick cozy socks perfect for lounging at home. Hand-crocheted with soft wool blend. Keep your feet warm in style.',
    price: 550,
    sku: 'ACC-002',
    stock: 20,
    category: 'Accessories',
    tags: ['Winter', 'Handmade'],
    images: ['/products/socks-ankle.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-12'),
  },
  {
    id: 'prod_012',
    name: 'Ruffle Edge Socks',
    description: 'Sweet socks with adorable ruffle detail. Perfect for adding a feminine touch to any outfit. Great for gifting.',
    price: 500,
    sku: 'ACC-003',
    stock: 18,
    category: 'Accessories',
    tags: ['Gift Idea'],
    images: ['/products/socks-ruffle.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-18'),
  },
  {
    id: 'prod_013',
    name: 'Floral Headband',
    description: 'Beautiful headband adorned with hand-crocheted flowers. Perfect for special occasions or everyday boho style.',
    price: 750,
    sku: 'ACC-004',
    stock: 15,
    category: 'Accessories',
    tags: ['Bestseller', 'Handmade'],
    images: ['/products/headband-floral.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-22'),
  },
  {
    id: 'prod_014',
    name: 'Boho Head Wrap',
    description: 'Versatile head wrap with intricate crochet pattern. Can be styled multiple ways. Perfect for bad hair days or festival looks.',
    price: 650,
    sku: 'ACC-005',
    stock: 12,
    category: 'Accessories',
    tags: ['New', 'Boho'],
    images: ['/products/headband-boho.jpeg'],
    status: 'active',
    createdAt: new Date('2024-02-08'),
  },
  {
    id: 'prod_015',
    name: 'Crochet Scrunchie Set',
    description: 'Set of 3 hand-crocheted scrunchies in complementary colors. Gentle on hair, perfect for everyday wear.',
    price: 400,
    compareAtPrice: 550,
    sku: 'ACC-006',
    stock: 35,
    category: 'Accessories',
    tags: ['Sale', 'Gift Idea'],
    images: ['/products/scrunchie-set.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-30'),
  },
  {
    id: 'prod_016',
    name: 'Winter Scarf',
    description: 'Long cozy scarf hand-crocheted with premium wool. Features beautiful texture pattern. Keeps you warm in style.',
    price: 2800,
    sku: 'ACC-007',
    stock: 5,
    category: 'Accessories',
    tags: ['Winter', 'Handmade'],
    images: ['/products/scarf-winter.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-03'),
  },

  // Home Decor (6 products)
  {
    id: 'prod_017',
    name: 'Crochet Flower Bouquet',
    description: 'Stunning bouquet of hand-crocheted flowers that never wilt. Perfect for home decor or as a lasting gift. 7 flowers included.',
    price: 2200,
    sku: 'DCR-001',
    stock: 8,
    category: 'Home Decor',
    tags: ['Bestseller', 'Gift Idea'],
    images: ['/products/decor-bouquet.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-28'),
    featured: true,
  },
  {
    id: 'prod_018',
    name: 'Single Crochet Rose',
    description: 'Beautiful hand-crocheted rose with stem. Perfect for gifting or decorating. Available in various colors.',
    price: 350,
    sku: 'DCR-002',
    stock: 50,
    category: 'Home Decor',
    tags: ['Gift Idea', 'Handmade'],
    images: ['/products/decor-rose.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-14'),
  },
  {
    id: 'prod_019',
    name: 'Coaster Set (6 pcs)',
    description: 'Set of 6 beautiful crochet coasters. Protect your furniture in style. Various patterns in each set.',
    price: 900,
    sku: 'DCR-003',
    stock: 20,
    category: 'Home Decor',
    tags: ['Home', 'Gift Idea'],
    images: ['/products/decor-coasters.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-16'),
  },
  {
    id: 'prod_020',
    name: 'Dream Catcher',
    description: 'Handmade dream catcher with intricate crochet web and feather accents. Beautiful wall art for any room.',
    price: 1600,
    sku: 'DCR-004',
    stock: 6,
    category: 'Home Decor',
    tags: ['Bestseller', 'Boho'],
    images: ['/products/decor-dreamcatcher.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'prod_021',
    name: 'Wall Hanging',
    description: 'Macrame-style wall hanging with crochet accents. Adds bohemian charm to any space. Ready to hang.',
    price: 2400,
    sku: 'DCR-005',
    stock: 4,
    category: 'Home Decor',
    tags: ['New', 'Handmade'],
    images: ['/products/decor-wallhanging.jpeg'],
    status: 'active',
    createdAt: new Date('2024-02-12'),
  },
  {
    id: 'prod_022',
    name: 'Plant Hanger',
    description: 'Beautiful crochet plant hanger fits pots up to 6 inches. Add handmade charm to your indoor garden.',
    price: 850,
    sku: 'DCR-006',
    stock: 14,
    category: 'Home Decor',
    tags: ['Home', 'Plants'],
    images: ['/products/decor-planter.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-24'),
  },

  // Gifts (12 products)
  {
    id: 'prod_023',
    name: 'Gift Box Set',
    description: 'Curated gift box with 3 handmade items. Perfect for birthdays or special occasions. Beautifully packaged.',
    price: 3500,
    sku: 'GFT-001',
    stock: 10,
    category: 'Gifts',
    tags: ['Gift Idea', 'Bestseller'],
    images: ['/products/gift-box.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-06'),
    featured: true,
  },
  {
    id: 'prod_024',
    name: 'Bridal Gift Set',
    description: 'Special gift set for brides. Includes handmade accessories perfect for the big day. Elegant packaging.',
    price: 5500,
    sku: 'GFT-002',
    stock: 3,
    category: 'Gifts',
    tags: ['Wedding', 'Premium'],
    images: ['/products/gift-bridal.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'prod_025',
    name: 'Birthday Combo',
    description: 'Perfect birthday gift with assorted handmade items. Customizable based on preferences. Gift wrapped.',
    price: 2800,
    sku: 'GFT-003',
    stock: 8,
    category: 'Gifts',
    tags: ['Gift Idea', 'Birthday'],
    images: ['/products/gift-birthday.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-18'),
  },
  {
    id: 'prod_026',
    name: 'Starter Pack',
    description: 'Great introduction to handmade crochet items. Includes 2 accessories and 1 home decor piece.',
    price: 1800,
    compareAtPrice: 2200,
    sku: 'GFT-004',
    stock: 12,
    category: 'Gifts',
    tags: ['Sale', 'Gift Idea'],
    images: ['/products/gift-starter.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-22'),
  },
  {
    id: 'prod_027',
    name: 'Premium Collection',
    description: 'Luxury gift set with 5 premium handmade items. Highest quality materials. Perfect for special recipients.',
    price: 7500,
    sku: 'GFT-005',
    stock: 2,
    category: 'Gifts',
    tags: ['Premium', 'Luxury'],
    images: ['/products/gift-premium.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-26'),
  },
  {
    id: 'prod_028',
    name: 'Summer Essentials',
    description: 'Summer-ready gift set with lightweight accessories. Perfect for the warm season. Beach-ready items.',
    price: 2400,
    sku: 'GFT-006',
    stock: 7,
    category: 'Gifts',
    tags: ['Summer', 'New'],
    images: ['/products/gift-summer.jpeg'],
    status: 'active',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'prod_029',
    name: 'Winter Warmth Set',
    description: 'Cozy winter gift set with warm accessories. Includes scarf, socks, and headband. Perfect for cold days.',
    price: 3800,
    sku: 'GFT-007',
    stock: 5,
    category: 'Gifts',
    tags: ['Winter', 'Cozy'],
    images: ['/products/gift-winter.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-02'),
  },
  {
    id: 'prod_030',
    name: 'Cozy Night Kit',
    description: 'Self-care gift set for relaxing evenings. Includes cozy accessories and home items. Perfect for me-time.',
    price: 2600,
    sku: 'GFT-008',
    stock: 9,
    category: 'Gifts',
    tags: ['Self Care', 'Gift Idea'],
    images: ['/products/gift-cozy.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-12'),
  },
  {
    id: 'prod_031',
    name: 'Mini Gift Pouch',
    description: 'Small gift pouch with 1-2 handmade items. Perfect for small gestures. Budget-friendly option.',
    price: 800,
    sku: 'GFT-009',
    stock: 25,
    category: 'Gifts',
    tags: ['Budget', 'Gift Idea'],
    images: ['/products/gift-mini.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'prod_032',
    name: 'Deluxe Hamper',
    description: 'Large gift hamper with 6+ handmade items. Impressive presentation. Perfect for corporate or family gifts.',
    price: 6500,
    sku: 'GFT-010',
    stock: 4,
    category: 'Gifts',
    tags: ['Premium', 'Corporate'],
    images: ['/products/gift-deluxe.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-28'),
  },
  {
    id: 'prod_033',
    name: 'Special Edition Box',
    description: 'Limited edition gift box with exclusive items. Unique designs not available separately. Collector\'s choice.',
    price: 4800,
    sku: 'GFT-011',
    stock: 3,
    category: 'Gifts',
    tags: ['Limited', 'Exclusive'],
    images: ['/products/gift-special.jpeg'],
    status: 'active',
    createdAt: new Date('2024-02-05'),
  },
  {
    id: 'prod_034',
    name: 'Custom Gift Box',
    description: 'Build your own gift box! Choose items from our collection. We\'ll package it beautifully. Minimum 3 items.',
    price: 0,
    sku: 'GFT-012',
    stock: 999,
    category: 'Gifts',
    tags: ['Custom', 'Build Your Own'],
    images: ['/products/gift-custom.jpeg'],
    status: 'active',
    createdAt: new Date('2024-02-10'),
  },
];

// 15 Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'ord_001',
    orderNumber: 'WBD-2401',
    customerUid: 'cust_001',
    customerEmail: 'fatima.rahman@gmail.com',
    customerName: 'Fatima Rahman',
    customerPhone: '+880171234567',
    items: [
      { productId: 'prod_001', name: 'Boho Bucket Bag', price: 1850, quantity: 1, image: '/products/bag-bucket.jpeg' },
      { productId: 'prod_010', name: 'Lace Trim Socks (Pair)', price: 450, quantity: 2, image: '/products/socks-lace.jpeg' },
    ],
    subtotal: 2750,
    deliveryFee: 60,
    total: 2810,
    status: 'delivered',
    paymentMethod: 'bkash',
    transactionId: 'BK123456789',
    shippingAddress: {
      firstName: 'Fatima',
      lastName: 'Rahman',
      email: 'fatima.rahman@gmail.com',
      phone: '+880171234567',
      address: '123 Gulshan Avenue, Apt 4B',
      city: 'Dhaka',
      postalCode: '1212',
    },
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'ord_002',
    orderNumber: 'WBD-2402',
    customerUid: 'cust_002',
    customerEmail: 'nadia.islam@yahoo.com',
    customerName: 'Nadia Islam',
    customerPhone: '+880181234567',
    items: [
      { productId: 'prod_006', name: 'Crochet Cardigan', price: 4200, quantity: 1, image: '/products/apparel-cardigan.jpeg' },
    ],
    subtotal: 4200,
    deliveryFee: 60,
    total: 4260,
    status: 'shipped',
    paymentMethod: 'nagad',
    transactionId: 'NG987654321',
    shippingAddress: {
      firstName: 'Nadia',
      lastName: 'Islam',
      email: 'nadia.islam@yahoo.com',
      phone: '+880181234567',
      address: '45 Banani Road, House 12',
      city: 'Dhaka',
      postalCode: '1213',
    },
    createdAt: new Date('2024-01-18'),
  },
  {
    id: 'ord_003',
    orderNumber: 'WBD-2403',
    customerUid: 'cust_003',
    customerEmail: 'tahsin.ahmed@gmail.com',
    customerName: 'Tahsin Ahmed',
    customerPhone: '+880191234567',
    items: [
      { productId: 'prod_017', name: 'Crochet Flower Bouquet', price: 2200, quantity: 1, image: '/products/decor-bouquet.jpeg' },
      { productId: 'prod_018', name: 'Single Crochet Rose', price: 350, quantity: 3, image: '/products/decor-rose.jpeg' },
    ],
    subtotal: 3250,
    deliveryFee: 120,
    total: 3370,
    status: 'processing',
    paymentMethod: 'cod',
    shippingAddress: {
      firstName: 'Tahsin',
      lastName: 'Ahmed',
      email: 'tahsin.ahmed@gmail.com',
      phone: '+880191234567',
      address: '78 Station Road',
      city: 'Chattogram',
      postalCode: '4000',
    },
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'ord_004',
    orderNumber: 'WBD-2404',
    customerUid: 'cust_004',
    customerEmail: 'rumana.khan@hotmail.com',
    customerName: 'Rumana Khan',
    customerPhone: '+880161234567',
    items: [
      { productId: 'prod_023', name: 'Gift Box Set', price: 3500, quantity: 1, image: '/products/gift-box.jpeg' },
    ],
    subtotal: 3500,
    deliveryFee: 60,
    total: 3560,
    status: 'pending',
    paymentMethod: 'bkash',
    transactionId: 'BK456789123',
    shippingAddress: {
      firstName: 'Rumana',
      lastName: 'Khan',
      email: 'rumana.khan@hotmail.com',
      phone: '+880161234567',
      address: '56 Dhanmondi R/A, House 8',
      city: 'Dhaka',
      postalCode: '1205',
    },
    createdAt: new Date('2024-01-22'),
  },
  {
    id: 'ord_005',
    orderNumber: 'WBD-2405',
    customerUid: 'cust_005',
    customerEmail: 'farhan.hossain@gmail.com',
    customerName: 'Farhan Hossain',
    customerPhone: '+880151234567',
    items: [
      { productId: 'prod_004', name: 'Woven Tote Bag', price: 2400, quantity: 1, image: '/products/bag-tote.jpeg' },
      { productId: 'prod_019', name: 'Coaster Set (6 pcs)', price: 900, quantity: 1, image: '/products/decor-coasters.jpeg' },
    ],
    subtotal: 3300,
    deliveryFee: 60,
    total: 3360,
    status: 'delivered',
    paymentMethod: 'nagad',
    transactionId: 'NG741852963',
    shippingAddress: {
      firstName: 'Farhan',
      lastName: 'Hossain',
      email: 'farhan.hossain@gmail.com',
      phone: '+880151234567',
      address: '12 Mirpur DOHS, Sector 7',
      city: 'Dhaka',
      postalCode: '1216',
    },
    createdAt: new Date('2024-01-25'),
  },
  {
    id: 'ord_006',
    orderNumber: 'WBD-2406',
    customerUid: 'cust_001',
    customerEmail: 'fatima.rahman@gmail.com',
    customerName: 'Fatima Rahman',
    customerPhone: '+880171234567',
    items: [
      { productId: 'prod_013', name: 'Floral Headband', price: 750, quantity: 1, image: '/products/headband-floral.jpeg' },
      { productId: 'prod_015', name: 'Crochet Scrunchie Set', price: 400, quantity: 1, image: '/products/scrunchie-set.jpeg' },
    ],
    subtotal: 1150,
    deliveryFee: 60,
    total: 1210,
    status: 'delivered',
    paymentMethod: 'cod',
    shippingAddress: {
      firstName: 'Fatima',
      lastName: 'Rahman',
      email: 'fatima.rahman@gmail.com',
      phone: '+880171234567',
      address: '123 Gulshan Avenue, Apt 4B',
      city: 'Dhaka',
      postalCode: '1212',
    },
    createdAt: new Date('2024-01-28'),
  },
  {
    id: 'ord_007',
    orderNumber: 'WBD-2407',
    customerUid: 'cust_006',
    customerEmail: 'afsana.mimi@yahoo.com',
    customerName: 'Afsana Mimi',
    customerPhone: '+880141234567',
    items: [
      { productId: 'prod_024', name: 'Bridal Gift Set', price: 5500, quantity: 1, image: '/products/gift-bridal.jpeg' },
    ],
    subtotal: 5500,
    deliveryFee: 60,
    total: 5560,
    status: 'shipped',
    paymentMethod: 'bkash',
    transactionId: 'BK789123456',
    shippingAddress: {
      firstName: 'Afsana',
      lastName: 'Mimi',
      email: 'afsana.mimi@yahoo.com',
      phone: '+880141234567',
      address: '89 Uttara Sector 4',
      city: 'Dhaka',
      postalCode: '1230',
    },
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'ord_008',
    orderNumber: 'WBD-2408',
    customerUid: 'cust_007',
    customerEmail: 'rakibul.hasan@gmail.com',
    customerName: 'Rakibul Hasan',
    customerPhone: '+880131234567',
    items: [
      { productId: 'prod_020', name: 'Dream Catcher', price: 1600, quantity: 2, image: '/products/decor-dreamcatcher.jpeg' },
    ],
    subtotal: 3200,
    deliveryFee: 120,
    total: 3320,
    status: 'processing',
    paymentMethod: 'nagad',
    transactionId: 'NG369258147',
    shippingAddress: {
      firstName: 'Rakibul',
      lastName: 'Hasan',
      email: 'rakibul.hasan@gmail.com',
      phone: '+880131234567',
      address: '34 Zindabazar',
      city: 'Sylhet',
      postalCode: '3100',
    },
    createdAt: new Date('2024-02-03'),
  },
  {
    id: 'ord_009',
    orderNumber: 'WBD-2409',
    customerUid: 'cust_008',
    customerEmail: 'tanjila.akter@gmail.com',
    customerName: 'Tanjila Akter',
    customerPhone: '+880111234567',
    items: [
      { productId: 'prod_008', name: 'Crochet Crop Top', price: 2200, quantity: 1, image: '/products/apparel-croptop.jpeg' },
      { productId: 'prod_002', name: 'Crochet Crossbody Purse', price: 1450, quantity: 1, image: '/products/bag-crossbody.jpeg' },
    ],
    subtotal: 3650,
    deliveryFee: 60,
    total: 3710,
    status: 'pending',
    paymentMethod: 'cod',
    shippingAddress: {
      firstName: 'Tanjila',
      lastName: 'Akter',
      email: 'tanjila.akter@gmail.com',
      phone: '+880111234567',
      address: '23 Wari, Lane 5',
      city: 'Dhaka',
      postalCode: '1100',
    },
    createdAt: new Date('2024-02-05'),
  },
  {
    id: 'ord_010',
    orderNumber: 'WBD-2410',
    customerUid: 'cust_009',
    customerEmail: 'maruf.hossain@yahoo.com',
    customerName: 'Maruf Hossain',
    customerPhone: '+880181112222',
    items: [
      { productId: 'prod_029', name: 'Winter Warmth Set', price: 3800, quantity: 1, image: '/products/gift-winter.jpeg' },
    ],
    subtotal: 3800,
    deliveryFee: 60,
    total: 3860,
    status: 'delivered',
    paymentMethod: 'bkash',
    transactionId: 'BK321654987',
    shippingAddress: {
      firstName: 'Maruf',
      lastName: 'Hossain',
      email: 'maruf.hossain@yahoo.com',
      phone: '+880181112222',
      address: '67 Mohammadpur, Housing Estate',
      city: 'Dhaka',
      postalCode: '1207',
    },
    createdAt: new Date('2024-02-08'),
  },
  {
    id: 'ord_011',
    orderNumber: 'WBD-2411',
    customerUid: 'cust_010',
    customerEmail: 'sabrina.chowdhury@gmail.com',
    customerName: 'Sabrina Chowdhury',
    customerPhone: '+880191122233',
    items: [
      { productId: 'prod_011', name: 'Cozy Ankle Socks', price: 550, quantity: 2, image: '/products/socks-ankle.jpeg' },
      { productId: 'prod_012', name: 'Ruffle Edge Socks', price: 500, quantity: 1, image: '/products/socks-ruffle.jpeg' },
      { productId: 'prod_003', name: 'Mini Pouch Bag', price: 650, quantity: 1, image: '/products/bag-pouch.jpeg' },
    ],
    subtotal: 2250,
    deliveryFee: 60,
    total: 2310,
    status: 'shipped',
    paymentMethod: 'nagad',
    transactionId: 'NG159753456',
    shippingAddress: {
      firstName: 'Sabrina',
      lastName: 'Chowdhury',
      email: 'sabrina.chowdhury@gmail.com',
      phone: '+880191122233',
      address: '45 Bailey Road',
      city: 'Dhaka',
      postalCode: '1000',
    },
    createdAt: new Date('2024-02-10'),
  },
  {
    id: 'ord_012',
    orderNumber: 'WBD-2412',
    customerUid: 'cust_002',
    customerEmail: 'nadia.islam@yahoo.com',
    customerName: 'Nadia Islam',
    customerPhone: '+880181234567',
    items: [
      { productId: 'prod_027', name: 'Premium Collection', price: 7500, quantity: 1, image: '/products/gift-premium.jpeg' },
    ],
    subtotal: 7500,
    deliveryFee: 60,
    total: 7560,
    status: 'processing',
    paymentMethod: 'bkash',
    transactionId: 'BK852963741',
    shippingAddress: {
      firstName: 'Nadia',
      lastName: 'Islam',
      email: 'nadia.islam@yahoo.com',
      phone: '+880181234567',
      address: '45 Banani Road, House 12',
      city: 'Dhaka',
      postalCode: '1213',
    },
    createdAt: new Date('2024-02-12'),
  },
  {
    id: 'ord_013',
    orderNumber: 'WBD-2413',
    customerUid: 'cust_003',
    customerEmail: 'tahsin.ahmed@gmail.com',
    customerName: 'Tahsin Ahmed',
    customerPhone: '+880191234567',
    items: [
      { productId: 'prod_021', name: 'Wall Hanging', price: 2400, quantity: 1, image: '/products/decor-wallhanging.jpeg' },
      { productId: 'prod_022', name: 'Plant Hanger', price: 850, quantity: 2, image: '/products/decor-planter.jpeg' },
    ],
    subtotal: 4100,
    deliveryFee: 120,
    total: 4220,
    status: 'pending',
    paymentMethod: 'cod',
    shippingAddress: {
      firstName: 'Tahsin',
      lastName: 'Ahmed',
      email: 'tahsin.ahmed@gmail.com',
      phone: '+880191234567',
      address: '78 Station Road',
      city: 'Chattogram',
      postalCode: '4000',
    },
    createdAt: new Date('2024-02-14'),
  },
  {
    id: 'ord_014',
    orderNumber: 'WBD-2414',
    customerUid: 'cust_004',
    customerEmail: 'rumana.khan@hotmail.com',
    customerName: 'Rumana Khan',
    customerPhone: '+880161234567',
    items: [
      { productId: 'prod_007', name: 'Open-Front Shrug', price: 1800, quantity: 1, image: '/products/apparel-shrug.jpeg' },
    ],
    subtotal: 1800,
    deliveryFee: 60,
    total: 1860,
    status: 'cancelled',
    paymentMethod: 'cod',
    shippingAddress: {
      firstName: 'Rumana',
      lastName: 'Khan',
      email: 'rumana.khan@hotmail.com',
      phone: '+880161234567',
      address: '56 Dhanmondi R/A, House 8',
      city: 'Dhaka',
      postalCode: '1205',
    },
    createdAt: new Date('2024-02-15'),
    notes: 'Customer requested cancellation',
  },
  {
    id: 'ord_015',
    orderNumber: 'WBD-2415',
    customerUid: 'cust_005',
    customerEmail: 'farhan.hossain@gmail.com',
    customerName: 'Farhan Hossain',
    customerPhone: '+880151234567',
    items: [
      { productId: 'prod_032', name: 'Deluxe Hamper', price: 6500, quantity: 1, image: '/products/gift-deluxe.jpeg' },
    ],
    subtotal: 6500,
    deliveryFee: 60,
    total: 6560,
    status: 'pending',
    paymentMethod: 'bkash',
    transactionId: 'BK741852963',
    shippingAddress: {
      firstName: 'Farhan',
      lastName: 'Hossain',
      email: 'farhan.hossain@gmail.com',
      phone: '+880151234567',
      address: '12 Mirpur DOHS, Sector 7',
      city: 'Dhaka',
      postalCode: '1216',
    },
    createdAt: new Date('2024-02-18'),
  },
];

// 10 Mock Customers
export const mockCustomers: Customer[] = [
  {
    uid: 'cust_001',
    email: 'fatima.rahman@gmail.com',
    displayName: 'Fatima Rahman',
    phone: '+880171234567',
    createdAt: new Date('2024-01-10'),
    ordersCount: 2,
    totalSpent: 4020,
  },
  {
    uid: 'cust_002',
    email: 'nadia.islam@yahoo.com',
    displayName: 'Nadia Islam',
    phone: '+880181234567',
    createdAt: new Date('2024-01-12'),
    ordersCount: 2,
    totalSpent: 11820,
  },
  {
    uid: 'cust_003',
    email: 'tahsin.ahmed@gmail.com',
    displayName: 'Tahsin Ahmed',
    phone: '+880191234567',
    createdAt: new Date('2024-01-15'),
    ordersCount: 2,
    totalSpent: 7590,
  },
  {
    uid: 'cust_004',
    email: 'rumana.khan@hotmail.com',
    displayName: 'Rumana Khan',
    phone: '+880161234567',
    createdAt: new Date('2024-01-18'),
    ordersCount: 2,
    totalSpent: 3560,
  },
  {
    uid: 'cust_005',
    email: 'farhan.hossain@gmail.com',
    displayName: 'Farhan Hossain',
    phone: '+880151234567',
    createdAt: new Date('2024-01-20'),
    ordersCount: 2,
    totalSpent: 9920,
  },
  {
    uid: 'cust_006',
    email: 'afsana.mimi@yahoo.com',
    displayName: 'Afsana Mimi',
    phone: '+880141234567',
    createdAt: new Date('2024-01-25'),
    ordersCount: 1,
    totalSpent: 5560,
  },
  {
    uid: 'cust_007',
    email: 'rakibul.hasan@gmail.com',
    displayName: 'Rakibul Hasan',
    phone: '+880131234567',
    createdAt: new Date('2024-01-28'),
    ordersCount: 1,
    totalSpent: 3320,
  },
  {
    uid: 'cust_008',
    email: 'tanjila.akter@gmail.com',
    displayName: 'Tanjila Akter',
    phone: '+880111234567',
    createdAt: new Date('2024-02-01'),
    ordersCount: 1,
    totalSpent: 3710,
  },
  {
    uid: 'cust_009',
    email: 'maruf.hossain@yahoo.com',
    displayName: 'Maruf Hossain',
    phone: '+880181112222',
    createdAt: new Date('2024-02-05'),
    ordersCount: 1,
    totalSpent: 3860,
  },
  {
    uid: 'cust_010',
    email: 'sabrina.chowdhury@gmail.com',
    displayName: 'Sabrina Chowdhury',
    phone: '+880191122233',
    createdAt: new Date('2024-02-08'),
    ordersCount: 1,
    totalSpent: 2310,
  },
];

// Helper functions
export function getFeaturedProducts(): Product[] {
  return mockProducts.filter(p => p.featured && p.status === 'active');
}

export function getProductsByCategory(category: string): Product[] {
  return mockProducts.filter(p => p.category === category && p.status === 'active');
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(p => p.id === id);
}

export function getNewArrivals(limit: number = 8): Product[] {
  return mockProducts
    .filter(p => p.status === 'active')
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

export function getBestsellers(limit: number = 8): Product[] {
  return mockProducts
    .filter(p => p.tags.includes('Bestseller') && p.status === 'active')
    .slice(0, limit);
}

export function getOnSaleProducts(limit: number = 8): Product[] {
  return mockProducts
    .filter(p => p.compareAtPrice && p.compareAtPrice > p.price && p.status === 'active')
    .slice(0, limit);
}

export function getOrdersByCustomer(customerUid: string): Order[] {
  return mockOrders.filter(o => o.customerUid === customerUid);
}

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find(o => o.id === id);
}

export function getCustomerByUid(uid: string): Customer | undefined {
  return mockCustomers.find(c => c.uid === uid);
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  
  return mockProducts
    .filter(p => p.id !== productId && p.category === product.category && p.status === 'active')
    .slice(0, limit);
}

// Dashboard Stats
export function getDashboardStats() {
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = mockOrders.length;
  const totalCustomers = mockCustomers.length;
  const lowStockProducts = mockProducts.filter(p => p.stock > 0 && p.stock <= 5).length;
  
  const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;
  const processingOrders = mockOrders.filter(o => o.status === 'processing').length;
  const shippedOrders = mockOrders.filter(o => o.status === 'shipped').length;
  const deliveredOrders = mockOrders.filter(o => o.status === 'delivered').length;
  
  return {
    totalRevenue,
    totalOrders,
    totalCustomers,
    lowStockProducts,
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
  };
}
