import createMDX from '@next/mdx';
const withMDX = createMDX({ extension: /\.mdx?$/ });
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: { mdxRs: true, legacyBrowsers: false },
};
export default withMDX(nextConfig);
