import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["files.edgestore.dev"],
  },
};

export default withNextVideo(nextConfig, {
  provider: "vercel-blob",
  providerConfig: {
    "vercel-blob": {},
  },
});
