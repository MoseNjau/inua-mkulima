# Inua Mkulima Subsidy Program

This is the frontend portal for the **Inua Mkulima Subsidy Program**, a dedicated dashboard for agro-dealers to manage farmer subsidies, process product deductions, and issue transaction receipts.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Design System tokens
- **Icons**: Lucide React / Custom SVGs
- **State Management**: React Hooks + `sessionStorage` (for cart persistence)

---

## Local Setup Instructions

1. **Install Dependencies**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```
   *(or `yarn install` / `pnpm install` depending on your preference)*

2. **Run the Development Server**
   Start the local server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

3. **Build for Production**
   When ready to deploy, run:
   ```bash
   npm run build
   npm start
   ```

---

## Implementation Approach

Building this interface required a strong focus on **pixel-perfect design parity** and **bulletproof state management** across a multi-step workflow. Here's a brief breakdown of my approach:

### 1. Pixel-Perfect UI & Layout
I used **Tailwind CSS** combined with targeted inline styles to exactly match the Adobe XD specifications. For instance, I structured the `Topbar` and `Sidebar` layouts using Flexbox to ensure the header spans the entire width seamlessly. I also applied exact color hexes (like `#707070`, `#272935`) and strict pixel dimensions to ensure components like the `ProductRow` match the provided brand kit.

### 2. State Management & Hydration
Instead of relying on heavy state libraries like Redux, I built a custom hook (`useProductSelection.ts`) utilizing `sessionStorage`. This keeps the application lightweight while ensuring the cart data persists across page refreshes. 

To prevent Next.js hydration errors (where server and client HTML mismatch), I implemented an `isHydrated` flag. This guarantees the application waits for the client to mount and read from `sessionStorage` before rendering the cart or performing any redirects on the Summary page.

### 3. Modal-Driven Workflows
To maintain a seamless user experience, I avoided standard routing for success messages and receipts. Instead, I architected a modal-driven flow (`SuccessModal` and `ReceiptModal`). The dashboard listens for URL query parameters (like `?payment=success`) to trigger these overlays, keeping the user grounded in the main dashboard view.
