// components/SanityImage.tsx (or utils/SanityImage.tsx)

import Image, { ImageProps as NextImageProps } from "next/image";
import { urlFor } from "../sanity"; // Adjust this path if your sanity.js/client.ts is located elsewhere

// Define the props for your SanityImage component
interface SanityImageProps extends Omit<NextImageProps, 'src' | 'loader'> {
  asset: any; // Sanity image asset object or reference string
  alt: string; // Alt text is required for accessibility
  imgClassName?: string; // Optional: For styling the actual Next.js <Image> component directly
  // width and height can be passed directly if known, otherwise layout="fill" will be used
  // For layout="fill", the parent element must have position: relative and dimensions.
}

// Custom loader function for Sanity images
const sanityImageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  // 'src' will be the Sanity image asset ID string (e.g., "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg")
  // We construct the full image URL using Sanity's urlFor builder
  return urlFor(src)
    .width(width) // Set the desired width
    .format("webp") // Request WebP format for modern browsers
    .quality(quality || 75) // Default quality to 75 if not specified
    .auto("format") // Sanity specific: ensures WebP if browser supports, otherwise falls back to original
    .url(); // Get the image URL string
};

export default function SanityImage({
  asset,
  alt,
  className, // This className will be applied to the Next.js <Image> component's wrapper or the image itself depending on layout
  imgClassName, // Kept for clarity, but Next.js Image applies className to the img tag when not using layout="fill"
  width,
  height,
  quality,
  priority = false, // Default priority to false (LCP images should have this true)
  layout, // "intrinsic", "fixed", "responsive", "fill"
  objectFit, // "cover", "contain", etc. (useful with layout="fill" or "responsive")
  ...rest // Spread any other valid NextImageProps
}: SanityImageProps) {
  if (!asset) {
    // Optional: Render a placeholder or null if the asset is missing
    // For a consistent layout, a placeholder with dimensions is good.
    if (width && height && layout !== "fill") {
      return <div style={{ width, height, backgroundColor: '#e0e0e0' }} aria-label={alt || "Image placeholder"} />;
    }
    if (layout === "fill" && className) {
       return <div className={className} style={{ backgroundColor: '#e0e0e0' }} aria-label={alt || "Image placeholder"} />;
    }
    // Fallback simple placeholder
    return <div style={{ display: 'inline-block', width: '50px', height: '50px', backgroundColor: '#e0e0e0' }} aria-label={alt || "Image placeholder"} />;
  }

  // Sanity assets can be passed as the full object or just the _ref string.
  // The urlFor builder can typically handle either.
  // We need to pass the asset's string identifier (like 'image-xxxx-format') to the loader's 'src'.
  const imageAssetRef = asset?._ref || (typeof asset === 'string' ? asset : asset?.asset?._ref);

  if (!imageAssetRef) {
    console.warn("SanityImage: Valid asset reference (_ref or string ID) could not be determined from the provided asset prop.", asset);
    // Similar placeholder logic as above
    if (width && height && layout !== "fill") {
      return <div style={{ width, height, backgroundColor: '#e0e0e0' }} aria-label={alt || "Image placeholder (ref missing)"} />;
    }
    return <div className={layout === "fill" && className ? className : ""} style={{ backgroundColor: '#e0e0e0' }} aria-label={alt || "Image placeholder (ref missing)"} />;
  }

  const effectiveLayout = layout || (width && height ? "intrinsic" : "fill");

  return (
    <Image
      loader={sanityImageLoader}
      src={imageAssetRef} // Pass the Sanity asset reference string here
      alt={alt}
      width={effectiveLayout !== "fill" ? width : undefined}
      height={effectiveLayout !== "fill" ? height : undefined}
      layout={effectiveLayout}
      objectFit={objectFit}
      quality={quality}
      priority={priority}
      className={imgClassName || className} // Apply className to the img tag (or wrapper for 'fill')
      {...rest}
    />
  );
}