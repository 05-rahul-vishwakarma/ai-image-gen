# AI Image Generator

A premium, startup-grade AI Image Generator SaaS application built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Authentication System**: Beautiful login/signup with form validation
- **Real-time Image Generation**: Generate images with AI (mock implementation, backend-ready)
- **Theme System**: 4 premium themes (Dark, Light, Neon, Glass) with instant switching
- **Prompt History**: Keep track of all your generations
- **Settings Panel**: Customize image size, quality, and AI model
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Powered by Framer Motion
- **Glassmorphism UI**: Modern, polished interface

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
ai-image-gen/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Auth route group
│   ├── (dashboard)/         # Dashboard route group
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page (redirects)
│   └── providers.tsx        # Client providers
├── components/
│   ├── auth/               # Authentication components
│   ├── dashboard/          # Dashboard components
│   ├── ui/                 # Reusable UI components
│   └── animations/         # Animation wrappers
├── lib/
│   ├── stores/            # Zustand stores
│   ├── utils/             # Utility functions
│   └── validations/       # Zod schemas
├── types/                 # TypeScript types
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features in Detail

### Authentication
- Mock login/signup (ready for backend integration)
- Form validation with Zod
- Persistent sessions with Zustand
- Animated form transitions

### Dashboard
- Top navigation bar with user menu
- Collapsible history sidebar
- Responsive layout
- Protected routes

### Image Generation
- Large prompt input area
- Character counter
- Keyboard shortcuts (⌘ + Enter)
- Prompt suggestions
- Loading states

### Settings
- Theme switcher (4 themes)
- Image size selection
- Quality settings (Standard/HD)
- AI model selection

### Theme System
- **Dark**: Classic dark theme (default)
- **Light**: Clean light theme
- **Neon**: Vibrant neon colors with glow effects
- **Glass**: Glassmorphism with blur effects

## Backend Integration

The app is ready for backend integration. Key integration points:

1. **Authentication** (`lib/stores/authStore.ts`):
   - Replace mock login/signup with real API calls
   - Implement JWT token handling
   - Add OAuth providers

2. **Image Generation** (`components/dashboard/PromptInput.tsx`):
   - Connect to AI API (OpenAI, Stability AI, etc.)
   - Handle image upload to cloud storage
   - Implement rate limiting

3. **Database**:
   - Store user data
   - Save generation history
   - Persist user settings

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
OPENAI_API_KEY=your_key_here
# Add other API keys as needed
```

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

### Other Platforms

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm run start
   ```

## License

MIT

## Author

Built with Claude Code
# ai-image-gen
