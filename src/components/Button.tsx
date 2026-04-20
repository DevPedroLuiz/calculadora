import { motion } from 'motion/react';

export type ButtonVariant = 'default' | 'accent' | 'secondary';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    'bg-white/40 hover:bg-white/50 text-slate-800 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white border border-white/20 dark:border-transparent',
  accent:
    'bg-orange-500/80 hover:bg-orange-500 text-white',
  secondary:
    'bg-white/60 hover:bg-white/70 text-slate-800 dark:bg-white/20 dark:hover:bg-white/30 dark:text-slate-400 border border-white/20 dark:border-transparent',
};

const baseStyle =
  'flex items-center justify-center text-xl font-medium rounded-[18px] transition-colors outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-orange-500/50 shadow-sm backdrop-blur-sm';

export function Button({
  children,
  onClick,
  className = '',
  variant = 'default',
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.02 }}
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
