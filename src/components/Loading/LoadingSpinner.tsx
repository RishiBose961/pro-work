import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  className?: string; // Tailwind classes for color/theme
}

export function LoadingSpinner({ size = 40, className }: LoadingSpinnerProps) {
  return (
    <motion.div
      className={className}
      style={{
        width: size,
        height: size,
        border: `4px solid currentColor`,
        borderTopColor: 'transparent',
        borderRadius: '50%',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
}
