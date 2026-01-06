# Tonder Admin Dashboard

A modern, responsive payment metrics dashboard built with React, TypeScript, and shadcn/ui.

## Overview

This internal dashboard application provides comprehensive visualization and monitoring of payment processing performance and key business indicators. It features interactive area charts, real-time metrics, and a clean, professional interface designed for easy navigation and data analysis.

## Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **shadcn/ui** - High-quality UI components built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Powerful charting library
- **date-fns** - Modern date utility library
- **Lucide React** - Beautiful icon library

## Features

### Core Functionality

- **Overview Dashboard** - Top-level KPIs with trend indicators and area charts
- **Transaction Management** - View and search payment transactions
- **Trends Analysis** - Multiple area charts for analyzing payment patterns
- **Reports** - Generate and download payment reports in PDF and CSV formats
- **Settings** - Configure account preferences and API settings

### UI Features

- **Dark/Light Mode** - Automatic theme detection with manual toggle
- **Responsive Layout** - Works seamlessly on desktop and tablets
- **Collapsible Sidebar** - Maximize screen space when needed
- **Date Range Selector** - Filter data by 7, 30, or 90 days
- **Interactive Charts** - Area charts with tooltips, legends, and gradient fills
- **Loading States** - Smooth transitions and loading indicators

## Project Structure

```
src/
├── components/
│   ├── dashboard/          # Reusable dashboard components
│   │   ├── MetricCard.tsx
│   │   ├── AreaChartCard.tsx
│   │   └── DateRangeSelector.tsx
│   ├── layout/             # Layout components
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/                 # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── chart.tsx
│       └── ...
├── pages/                  # Page components
│   ├── Overview.tsx
│   ├── Transactions.tsx
│   ├── Trends.tsx
│   ├── Reports.tsx
│   └── Settings.tsx
├── lib/
│   ├── utils.ts           # Utility functions
│   └── mockData.ts        # Mock data layer
├── App.tsx                # Main app with routing
└── main.tsx              # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Data Layer

Currently uses mock data for demonstration purposes. The mock data layer (`src/lib/mockData.ts`) provides:

- Time-series metrics for 7, 30, and 90 day periods
- Transaction data with various payment methods
- Revenue and success rate calculations
- Period-over-period comparisons

**To connect to real APIs**: Replace the mock data imports in page components with actual API calls.

## Customization

### Theme

The theme can be customized by modifying the CSS variables in `src/index.css`. The dashboard supports both light and dark modes.

### Charts

Chart configurations are defined inline in each page component. To add new charts:

1. Create a `ChartConfig` object defining the data series
2. Use the `AreaChartCard` component with your configuration
3. Pass data in the format: `{ date: string, value: number }`

### Adding New Metrics

1. Add data to `src/lib/mockData.ts`
2. Create or update page components to display the metrics
3. Use `MetricCard` for KPIs and `AreaChartCard` for trends

## Components

### Reusable Dashboard Components

- **MetricCard** - Displays KPI with change indicator and icon
- **AreaChartCard** - Configurable area chart with shadcn/ui styling
- **DateRangeSelector** - Date range picker for filtering data

### UI Components (shadcn/ui)

All UI components follow the shadcn/ui design system and are fully customizable through Tailwind CSS.

## Future Enhancements

- Real-time data updates via WebSocket
- Advanced filtering and search capabilities
- Custom date range picker
- Export functionality for reports
- User authentication and authorization
- Multi-tenancy support
- Performance optimizations (code splitting, lazy loading)

## License

Internal use only - Tonder Admin
