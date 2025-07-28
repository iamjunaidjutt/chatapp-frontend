# Chat App Frontend 💬

A modern, real-time messaging application frontend built with **Next.js 15**, **React 19**, **TypeScript**, **Redux Toolkit**, **Socket.IO Client**, and **Tailwind CSS**.

Companion repository to [chatapp-backend](https://github.com/iamjunaidjutt/chatapp-backend).

---

## 🚀 Features

### Core Functionality
- **Real-Time Messaging**: Send and receive instant messages with sub-second delivery via WebSockets (Socket.IO).
- **Room-Based Chat**: Create custom public or private rooms, join conversations, and manage participant access.
- **Active User Presence**: Real-time online/offline status indicators for active contacts.
- **Live Typing Indicators**: Broadcasts active typing state to other room participants in real time.
- **Centralized State Management**: Powered by Redux Toolkit with `redux-persist` for cached session state and fast rehydration.
- **NextAuth v5 Authentication**: Secure session handling with credentials and JWT tokens linked to the Express backend.
- **Dual-Mode Theming**: Seamless dark and light cyberpunk-inspired themes via `next-themes`.
- **Form Validation**: Type-safe forms with React Hook Form and Zod schema validation.
- **Responsive Architecture**: Mobile-first design with responsive collapsible sidebars and touch-friendly navigation.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack, Server Actions)
- **Frontend Library**: [React 19](https://react.dev/) & TypeScript 5
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & `redux-persist`
- **Real-Time Transport**: [Socket.IO Client](https://socket.io/)
- **Authentication**: [NextAuth.js v5 (Beta)](https://authjs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) & SCSS Modules (`sass`)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives & [Lucide React](https://lucide.dev/) icons
- **Form Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

---

## 📂 Project Structure

```
chatapp-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/                      # Login route & LoginForm component
│   │   └── register/                   # Register route & RegisterForm component
│   ├── chat/
│   │   ├── page.tsx                    # Active chat dashboard
│   │   └── layout.tsx                  # Split-view chat layout
│   ├── rooms/
│   │   └── page.tsx                    # Room discovery & browse rooms view
│   ├── api/                            # Next.js API route proxies
│   │   ├── auth/                       # NextAuth handlers
│   │   ├── messages/                   # Message retrieval endpoints
│   │   ├── rooms/                      # Room management endpoints
│   │   └── user-rooms/                 # User joined rooms endpoints
│   ├── layout.tsx                      # Root layout with Redux & Theme providers
│   └── page.tsx                        # Landing hero page
├── components/
│   ├── chat/                           # Chat interface components
│   │   ├── chat-window/                # Active room conversation pane
│   │   ├── message-list/               # Message feed with auto-scroll
│   │   ├── message-item/               # Individual message bubble & metadata
│   │   ├── message-input/              # Message input with typing indicator triggers
│   │   ├── online-status/              # Live presence indicators
│   │   └── sidebar/                    # Conversations and contacts sidebar
│   ├── rooms/                          # Room cards & CreateRoomModal dialog
│   ├── navbar/                         # Main navigation with theme toggle & user drawer
│   └── ui/                             # Radix UI and shadcn component primitives
├── store/
│   └── store.ts                        # Redux Toolkit store & persisted slices
├── types/                              # TypeScript types for Chat, Message, and Room
├── utils/validators/                   # Zod schemas for auth and messaging
├── config/                             # API endpoints and route configurations
└── auth.ts                             # NextAuth v5 session configuration
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: Version 18.18+ or 20+
- **Package Manager**: [pnpm](https://pnpm.io/) (recommended), npm, or yarn
- **Backend Service**: Running instance of [chatapp-backend](https://github.com/iamjunaidjutt/chatapp-backend)

### 1. Clone the Repository

```bash
git clone git@github.com:iamjunaidjutt/chatapp-frontend.git
cd chatapp-frontend
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# WebSocket Server URL
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# NextAuth Secret & URL
AUTH_SECRET=your_nextauth_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to launch the application.

---

## 🔗 Related Repositories

- **Backend**: [iamjunaidjutt/chatapp-backend](https://github.com/iamjunaidjutt/chatapp-backend) — Express, Socket.IO, and MongoDB REST API with Swagger documentation.

---

## 📄 License

This project is licensed under the MIT License.
