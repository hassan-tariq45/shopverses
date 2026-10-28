# ShopVerse – React E-Commerce Website

A responsive e-commerce web app built with **React.js** (Vite).

**Live demo:** _add your Vercel link here_
**Student:** _your name / roll no._

## Features
- Product listing from the Fake Store API with search, category filter and price sorting
- Product detail page (dynamic route `/product/:id`)
- Shopping cart: add, remove, change quantity, live total, saved in localStorage
- Checkout form with validation and order confirmation
- Loading, error and empty states; responsive layout

## Tech stack
React 18, React Router v6, Context API, custom hook (`useFetch`), Vite, plain CSS

## Structure
```
src/
  CartContext.jsx   global cart state (Context API)
  useFetch.js       data-fetching hook
  components/       Navbar, Loader/ErrorBox
  pages/            Home, Product, Cart, Checkout
```

## Run locally
```
npm install
npm run dev
```

## Deploy
Push to GitHub, then import the repo on vercel.com (framework: Vite). `vercel.json` handles page refresh on routes.
