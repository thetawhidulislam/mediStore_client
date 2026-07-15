# 🏥 MediStore — Full Stack Medicine E-commerce Platform (Client)

MediStore is a full-stack medicine e-commerce web application where users can browse medicines, add them to a cart, place orders, and track their order history — while admins manage products, categories, stock, and orders from a secure dashboard. This repository contains the **frontend (client)** application, built with Next.js.

---

## 📸 Screenshot

<p align="center">
  <a href="https://medistoreup.vercel.app/" target="_blank">
    <img src="https://api.microlink.io/?url=https://medistoreup.vercel.app/&screenshot=true&meta=false&embed=screenshot.url" alt="MediStore Screenshot" width="100%" />
  </a>
</p>

---

## 🚀 Live & Repository Links

| Type | Link |
|---|---|
| 🔴 Live Site | [medistoreup.vercel.app](https://medistoreup.vercel.app/) |
| 💻 Client Repo (this repo) | [mediStore_client](https://github.com/thetawhidulislam/mediStore_client) |
| ⚙️ Server Repo | [mediStore_server](https://github.com/thetawhidulislam/mediStore_server) |

---

## 🛠️ Main Technologies Used

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui** (built on Radix UI primitives)
- **better-auth** — authentication
- **TanStack Form** — form state management
- **Zod** — schema validation
- **Lucide React** — icon set
- **pnpm** — package manager

---

## ✨ Main Features

### 👤 User Features
- User authentication (Login / Register) via better-auth
- Browse medicines by category
- View detailed medicine information
- Add medicines to cart
- Place orders and complete checkout
- View order history
- Fully responsive design across all devices

### 🛠️ Admin Features
- Secure, role-protected admin dashboard
- Create, update, and delete medicines
- Manage categories
- Manage medicine stock
- View and manage customer orders

---

## 📦 Dependencies

**Core Dependencies**
```
next               16.1.6
react              19.2.3
react-dom          19.2.3
typescript         ^5
```

**UI & Styling**
```
tailwindcss                 ^4
@tailwindcss/postcss        ^4
tw-animate-css               ^1.4.0
class-variance-authority     ^0.7.1
clsx                         ^2.1.1
tailwind-merge                ^3.4.0
lucide-react                  ^0.563.0
react-icons                   ^5.5.0
```

**Radix UI Primitives (shadcn/ui base)**
```
@radix-ui/react-accordion
@radix-ui/react-dialog
@radix-ui/react-dropdown-menu
@radix-ui/react-label
@radix-ui/react-navigation-menu
@radix-ui/react-primitive
@radix-ui/react-select
@radix-ui/react-separator
@radix-ui/react-slot
@radix-ui/react-tabs
@radix-ui/react-tooltip
radix-ui                     ^1.4.3
```

**Auth, Forms & Validation**
```
better-auth              ^1.4.18
@tanstack/react-form      ^1.28.0
zod                        ^4.3.6
```

**Utilities**
```
sonner                    ^2.0.7
@t3-oss/env-nextjs         ^0.13.10
```

**Dev Dependencies**
```
eslint               ^9
eslint-config-next    16.1.6
@types/node           ^20
@types/react           ^19
@types/react-dom        ^19
```

---

## ▶️ Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/thetawhidulislam/mediStore_client.git
cd mediStore_client
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory and add the required variables, e.g.:
```env
NEXT_PUBLIC_API_URL=your_backend_api_url
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Run the development server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

> ⚠️ Note: The client depends on the [MediStore backend](https://github.com/thetawhidulislam/mediStore_server) for full functionality. Make sure the server is running (locally or the deployed live API) and correctly referenced in your environment variables.

---

## 🎯 Project Purpose

This project was built to:
- Practice real-world full-stack development with Next.js
- Implement role-based authentication and protected routes
- Work with modern Next.js App Router architecture
- Build a scalable, production-style e-commerce system

---

## 🧑‍💻 Author

**Tawhidul Islam** — Full Stack Developer

- GitHub: [@thetawhidulislam](https://github.com/thetawhidulislam)
- LinkedIn: [thetawhidulislam](https://www.linkedin.com/in/thetawhidulislam/)
- Portfolio: [tawhidulislam.vercel.app](https://tawhidulislam.vercel.app/)

---

## ⭐ Feedback

If you like this project, feel free to ⭐ the repository and share your feedback!