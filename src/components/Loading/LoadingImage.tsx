import React, { useState } from "react";
import { Loader2 } from "lucide-react";

interface LoadingImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
}

export function LoadingImage({
  src,
  alt,
  className = "",
  fallbackText = "Loading...",
  ...props
}: LoadingImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative inline-block">
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
        {...props}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
          <span className="sr-only">{fallbackText}</span>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center  text-gray-500">
          Failed to load image
        </div>
      )}
    </div>
  );
}
