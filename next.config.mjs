/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "**",
      },
    ],
  },

  env: {
    NEXTAUTH_SECRET: "musarridevelopment",
    NEXTAUTH_URL: "https://next-ecommerce-ebon.vercel.app",
    DOMAIN: "https://next-ecommerce-ebon.vercel.app",
    DATABASE_URL:
      "mongodb+srv://msaricicek99:BA4B62dm7eJezjU0@cluster0.gyuydbk.mongodb.net/ecommerce",
    API_URL: "https://next-ecommerce-ebon.vercel.app",
    NEXT_PUBLIC_API_URL: "https://next-ecommerce-ebon.vercel.app",

    NEXTAUTH_URL_INTERNAL: "http://127.0.0.1:3000",
    STRIPE_PK:
      "pk_test_51PiaWvGZrqp2CxIHJqIoyccvgwqKdQLXtjchkj0qNqvczXHjQcoRViijiab9RknlGBo05ZCR6vvOyrLTcZNsGjBA00QiS3SeSC",
    STRIPE_SECRET:
      "sk_test_51PiaWvGZrqp2CxIHcVp0yixj5IGAGYZZs4grq3omqdfOgnI9IkUlbOtn549GlrcP1CUKl0Amvu4tFZUNoWBFNHp500ZAE7hXV3",
    STRIPE_WEBHOOK_SECRET:
      "whsec_0020e2c2d1921e98bc67f568899f0680b5e53b31be851e1bb84e2b411b2e4f92",
  },
};

export default nextConfig;
