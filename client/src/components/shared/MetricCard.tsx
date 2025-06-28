import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BitcoinIcon } from '@/components/ui/bitcoin-icon';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconColor: string;
  changeValue?: string | number;
  changeText?: string;
  isPositive?: boolean;
  isBitcoin?: boolean;
}

export function MetricCard({
  title,
  value,
  icon,
  iconColor,
  changeValue,
  changeText,
  isPositive = true,
  isBitcoin = false,
}: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="enhanced-card group overflow-hidden relative">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm font-medium">{title}</p>
              <motion.p 
                className="text-3xl font-bold flex items-center group-hover:text-primary transition-colors duration-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              >
                {isBitcoin && (
                  <BitcoinIcon 
                    className="text-primary mr-2 group-hover:scale-110 transition-transform duration-200" 
                    size={24} 
                  />
                )}
                <span>{value}</span>
              </motion.p>
            </div>
            <motion.div 
              className={cn(
                "rounded-full p-3 shadow-sm backdrop-blur-sm border border-border/30",
                iconColor === 'primary' && "bg-primary/10 text-primary border-primary/20",
                iconColor === 'accent' && "bg-accent/10 text-accent border-accent/20",
                iconColor === 'success' && "bg-success/10 text-success border-success/20",
                iconColor === 'warning' && "bg-warning/10 text-warning border-warning/20"
              )}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <i className={`ri-${icon}-line text-xl`}></i>
            </motion.div>
          </div>
          
          {(changeValue || changeText) && (
            <motion.div 
              className="mt-4 flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className={cn(
                "text-sm font-medium flex items-center px-2 py-1 rounded-full",
                isPositive 
                  ? "text-success bg-success/10 border border-success/20" 
                  : "text-destructive bg-destructive/10 border border-destructive/20"
              )}>
                <i className={`ri-arrow-${isPositive ? 'up' : 'down'}-line mr-1 text-xs`}></i> 
                {changeValue}
              </span>
              {changeText && (
                <span className="text-xs text-muted-foreground ml-3">{changeText}</span>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}