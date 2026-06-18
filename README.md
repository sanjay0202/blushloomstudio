# Blushloom Studio - E-commerce Website

A modern, elegant e-commerce website for Blushloom Studio, featuring handcrafted gifts, bouquets, keychains, and hair accessories.

## 🌸 Features

- **Modern Design**: Beautiful UI with custom color palette (Blush Pink, Lavender, Peach, Sage Green, Rose Gold)
- **Product Categories**: Flowers & Bouquets, Custom Keychains, Ribbons & Clips
- **Shopping Cart**: Persistent cart with Zustand state management
- **Custom Orders**: WhatsApp integration for custom order requests
- **Responsive**: Mobile-first design with smooth animations
- **Performance**: Optimized images and Core Web Vitals focused

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── ui/               # UI components
│   └── features/         # Feature components
├── lib/                   # Utility functions
├── store/                 # Zustand stores
├── types/                 # TypeScript types
├── public/               # Static assets
└── assets/               # Product images
```

## 🎨 Design System

### Colors
- **Blush Pink**: Primary brand color (#FFB6C1, #FFC0CB)
- **Lavender**: Secondary color (#E6E6FA, #D8BFD8)
- **Ivory White**: Background (#FFFFF0)
- **Peach**: Accent (#FFDAB9, #FFE5B4)
- **Sage Green**: Nature accent (#9DC183, #B2C9AB)
- **Rose Gold**: Luxury accent (#B76E79, #E0BFB8)

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with one click

## 📄 License

Private project for Blushloom Studio.

## 🤝 Contact

For inquiries, please contact via WhatsApp or Instagram.