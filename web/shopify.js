import dotenv from 'dotenv';
import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { MongoDBSessionStorage } from "@shopify/shopify-app-session-storage-mongodb";
import mongoose from "mongoose";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-10";

dotenv.config();

// Optional: If you want to enable billing
const billingConfig = {
  "My Shopify One-Time Charge": {
    amount: 5.0,
    currencyCode: "USD",
    interval: BillingInterval.OneTime,
  },
};

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables");
}

// Connect Mongoose only once
if (!mongoose.connection.readyState) {
  await mongoose.connect(MONGODB_URI);
}

// Use MongoDB session storage
const sessionStorage = new MongoDBSessionStorage(
  process.env.MONGODB_URI,
  "shopify_sessions"
);

const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    future: {
      customerAddressDefaultFix: true,
      lineItemBilling: true,
      unstable_managedPricingSupport: true,
    },
    billing: undefined, // Or use billingConfig
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  sessionStorage, // <-- this is the new MongoDB storage
});

export default shopify;
