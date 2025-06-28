# Ceramics Shop Website Design Document

## 1. Overview

This document outlines the design and architectural decisions for the "Only Girl In Town" ceramics e-commerce website. The primary goal is to provide a simple, mobile-friendly platform for selling ceramic products, managing inventory, and accepting payments, without requiring user sign-in for a streamlined shopping experience.

## 2. Architecture

The website is implemented as a Single Page Application (SPA) using React. All rendering occurs client-side, with data managed in React's component state and context. There is no dedicated backend server for product data or cart management; these are handled directly within the client-side application.

## 3. Technologies Used

*   **Frontend Framework:** React (JavaScript)
*   **Routing:** React Router (HashRouter for GitHub Pages compatibility)
*   **Styling:** Bootstrap (for responsive design and UI components)
*   **State Management:** React Context API (for shopping cart)
*   **Payment Processing:** Stripe (client-side integration using `@stripe/react-stripe-js` and `@stripe/stripe-js`)
*   **Local Storage:** For persisting the shopping cart across sessions.
*   **Deployment:** GitHub Pages

## 4. Key Design Decisions & Features

### 4.1. User Experience (UX)

*   **No User Accounts Required:** To simplify the purchase process and reduce friction, users are not required to create accounts or sign in. The shopping cart persists locally on the user's device.
*   **Persistent Shopping Cart:** The shopping cart state is stored in the browser's `localStorage`. This allows users to close the browser or navigate away and return to find their cart contents intact on the same device.
*   **Mobile-First Responsive Design:** Utilizes Bootstrap's grid system and components to ensure the site is fully functional and visually appealing on various screen sizes, from mobile phones to desktop monitors.

### 4.2. Product & Inventory Management

*   **Client-Side Product Data:** Product information (name, price, inventory, image) is currently hardcoded within the `Home.js` component. For a production application, this would typically be fetched from an API or a content management system.
*   **Simple Inventory Tracking:** Inventory is managed client-side. When an item is added to the cart, the available inventory for that product is decremented. Users cannot add more items than available inventory.

### 4.3. Payment Integration

*   **Stripe Elements:** The checkout process integrates with Stripe using their React components (`CardElement`). This provides a secure and PCI-compliant way to collect credit card information directly from the user's browser without sensitive data touching the application's server (as there isn't one).
*   **Simulated Payment Processing:** For this prototype, the payment processing is simulated client-side. In a real-world scenario, the `paymentMethod.id` obtained from Stripe would be sent to a secure backend server to create a charge and complete the transaction.

### 4.4. Routing & Deployment

*   **HashRouter for GitHub Pages:** Due to the static hosting nature of GitHub Pages, `HashRouter` is used instead of `BrowserRouter`. This ensures that client-side routes (e.g., `/checkout`) work correctly without requiring server-side configuration for routing, as all paths resolve to `index.html` and the hash (`#/checkout`) is then interpreted by React Router.
*   **`homepage` Configuration:** The `homepage` field in `package.json` is set to `/ceramics-shop` to correctly resolve asset paths when deployed to a GitHub Project Page.

## 5. Future Considerations (Not Implemented)

*   **Backend API:** For dynamic product data, order management, and secure payment processing.
*   **User Authentication:** If features like order history, wishlists, or personalized experiences are desired.
*   **Database:** To store product information, orders, and user data.
*   **Admin Panel:** For managing products, inventory, and viewing orders.
*   **Advanced Search/Filtering:** For larger product catalogs.
*   **SEO Optimization:** Server-side rendering (SSR) or static site generation (SSG) would be beneficial for better search engine indexing.
