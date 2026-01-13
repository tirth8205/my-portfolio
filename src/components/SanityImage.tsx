// components/SanityImage.tsx
import React from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { urlFor } from "../lib/sanity"; // Adjust path if needed

// Custom loader function for Sanity images (remains the same)
const sanityImageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return urlFor(src)
    .width(width)
    .format("webp")
    .quality(quality || 75)
    .auto("format")
    .url();
};

// Define the props for your SanityImage component
// Note: 'layout', 'objectFit', 'objectPosition' are handled differently now
interface SanityImageProps extends Omit<NextImageProps, 'src' | 'loader' | 'layout' | 'objectFit' | 'objectPosition'> {
  asset: any;
  alt: string;
  // For layout="fill", parent must be relative and have dimensions. Image takes up full parent space.
  // For other cases, provide width and height for aspect ratio, and control size with CSS or parent.
  // next/image defaults to intrinsic-like scaling if width/height are provided.
  // For responsive behavior like old layout="responsive", set width/height and style={{ width: '100%', height: 'auto' }}
  fill?: boolean; // Use this instead of layout="fill"
  style?: React.CSSProperties; // For objectFit, objectPosition, and other styles
}

export default function SanityImage({
  asset,
  alt,
  width,    // Still provide for aspect ratio and initial sizing
  height,   // Still provide for aspect ratio and initial sizing
  fill,     // New prop to indicate fill behavior
  style,    // Pass style directly for objectFit, etc.
  priority = false,
  quality,
  className, // Applied to the <img> tag
  sizes,    // Important for responsive images when not using fill
  ...rest
}: SanityImageProps) {
  // Loading state for skeleton - must be at top level before any returns
  const [isLoading, setIsLoading] = React.useState(true);

  if (!asset) {
    // Placeholder logic
    if (fill && className) {
      return <div className={className} style={{ width: '100%', height: '100%', backgroundColor: '#e0e0e0', ...style }} aria-label={alt || "Image placeholder"} />;
    }
    if (width && height) {
      return <div style={{ width, height, backgroundColor: '#e0e0e0', ...style }} aria-label={alt || "Image placeholder"} />;
    }
    return <div style={{ display: 'inline-block', width: '50px', height: '50px', backgroundColor: '#e0e0e0', ...style }} aria-label={alt || "Image placeholder"} />;
  }

  const imageAssetRef = asset?._ref || (typeof asset === 'string' ? asset : asset?.asset?._ref);

  if (!imageAssetRef) {
    console.warn("SanityImage: Valid asset reference missing.", asset);
    // Similar placeholder logic
    if (fill && className) {
      return <div className={className} style={{ width: '100%', height: '100%', backgroundColor: '#e0e0e0', ...style }} aria-label={alt || "Image placeholder (ref missing)"} />;
    }
    return <div style={{ width: width || 50, height: height || 50, backgroundColor: '#e0e0e0', ...style }} aria-label={alt || "Image placeholder (ref missing)"} />;
  }

  if (fill) {
    return (
      <div className="relative w-full h-full">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse rounded-inherit">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
              style={{ backgroundSize: '200% 100%' }} />
          </div>
        )}
        <NextImage
          loader={sanityImageLoader}
          src={imageAssetRef}
          alt={alt}
          fill
          style={style}
          priority={priority}
          quality={quality}
          sizes={sizes || "100vw"}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={() => setIsLoading(false)}
          {...rest}
        />
      </div>
    );
  }

  // For non-fill images (intrinsic/responsive-like behavior)
  // next/image will use width/height for aspect ratio and initial render size.
  // Responsiveness is controlled by CSS applied to the image or its container.
  return (
    <NextImage
      loader={sanityImageLoader}
      src={imageAssetRef}
      alt={alt}
      width={width || 0} // next/image requires width/height unless fill is true
      height={height || 0} // Provide 0 if not known, but aspect ratio might be lost
      style={style} // For objectFit, objectPosition, and responsive width/height (e.g., { width: '100%', height: 'auto' })
      priority={priority}
      quality={quality}
      sizes={sizes} // Crucial for responsive images to load optimal sources
      className={className}
      {...rest}
    />
  );
}