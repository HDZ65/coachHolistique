// Configuration principale de Next.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Permettre dangereusement aux builds de production de se terminer avec succès
    // même si votre projet a des erreurs de type.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;