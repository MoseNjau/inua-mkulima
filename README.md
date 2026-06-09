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

Building this interface required a strong focus on **pixel-perfect design parity** and **bulletproof state management** across a multi-step workflow. Here's a quick breakdown of how we approached the architecture:

### 1. Pixel-Perfect UI & Layout
We combined the speed of **Tailwind CSS** with specific, targeted inline styles whenever we needed to exactly match the Adobe XD specifications. For example, the `Topbar` and `Sidebar` layouts were carefully structured using CSS Flexbox to ensure the header spans the entire width seamlessly, while components like the `ProductRow` use exact color hexes (`#707070`, `#272935`) and pixel dimensions to match the premium, branded look.

### 2. State Management & Hydration
Instead of relying on complex global stores like Redux for the cart, we used a custom hook (`useProductSelection.ts`) backed by `sessionStorage`. This keeps the app lightweight while ensuring the cart survives page refreshes. 

To prevent the dreaded Next.js hydration errors (where the server HTML doesn't match the client HTML), we implemented an `isHydrated` flag. The app waits for the client to fully mount and read from `sessionStorage` before attempting to render the cart or perform any redirects on the Summary page.

### 3. Modal-Driven Workflows
To keep the user experience seamless, we moved away from routing to dedicated pages for success messages and receipts. Instead, we architected a modal-driven flow (`SuccessModal` and `ReceiptModal`). The dashboard listens for URL query parameters (like `?payment=success`) to trigger these overlays, keeping the agro-dealer grounded in the main dashboard view.
