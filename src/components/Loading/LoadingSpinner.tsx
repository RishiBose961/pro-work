import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export function LoadingSpinner({ size = 40, color = 'currentColor' }: LoadingSpinnerProps) {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        border: `4px solid ${color}`,
        borderTopColor: 'transparent',
        borderRadius: '50%',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
}

