# Investment System - Frontend Dashboard

An interactive wealth management and investment platform built with **Vanilla TypeScript** and **Vite**. This application allows users to view their portfolio status, current active holdings, available market assets catalog, and register financial transactions in real time with strict client-side validation.

## Technologies Used

- **TypeScript** (Vanilla, strictly typed with zero `any` usage)
- **Vite** (Build tool and hot-reloading development server)
- **HTML5 & CSS3** (Responsive design with dark mode support)
- **Native DOM API** (Safe node-based manipulation with explicit null type guards)

## Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18 or higher).

## Installation and Setup

1. **Clone the repository:**
   git clone https://github.com/fcovergarac/investment-system-frontend.git
   cd investment-system-frontend

2. **Install dependencies:**
   npm install

3. **Run the development server:**
   npm run dev
   Open http://localhost:5173 in your browser.

4. **Type Verification and Build:**
   npm run build

## Project Structure

investment-system-frontend/
├── public/                  # Static assets (Logos and corporate imagery)
├── src/
│   ├── components/          # Functional DOM node generator components
│   │   ├── AssetCard.ts
│   │   ├── PortfolioSummary.ts
│   │   ├── PositionCard.ts
│   │   └── TransactionItem.ts
│   ├── models/              # Models, data contracts, and interfaces
│   │   ├── asset.model.ts
│   │   ├── portfolio.model.ts
│   │   ├── transaction.model.ts
│   │   └── index.ts
│   ├── services/            # Asynchronous service layer & API handling
│   │   └── portfolio.service.ts
│   ├── main.ts              # Main UI and event orchestrator
│   └── style.css            # Global stylesheet
├── index.html               # Entry point HTML
├── package.json
├── tsconfig.json
└── README.md