import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The internship study used to live at /study.
  async redirects() {
    return [{ source: "/study", destination: "/studies/voxomos-internship", permanent: true }];
  },
};

export default nextConfig;
