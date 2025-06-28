import React from 'react';
import { Loan } from '@shared/schema';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BitcoinIcon } from '@/components/ui/bitcoin-icon';
import { formatBTC, getLoanTypeClass } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MarketplaceLoanCardProps {
  loan: Loan;
  rating?: number;
  onAccept: (loan: Loan) => void;
}

export function MarketplaceLoanCard({ 
  loan, 
  rating = 4.5,
  onAccept 
}: MarketplaceLoanCardProps) {
  const typeClass = getLoanTypeClass(loan.type);
  const isRequest = loan.type === 'request';
  
  const handleAccept = () => {
    onAccept(loan);
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="enhanced-card group overflow-hidden relative h-full flex flex-col">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Subtle border glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        
        <CardContent className="p-6 relative z-10 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-2">
              <motion.span 
                className={`text-xs py-1.5 px-3 rounded-full font-medium ${typeClass} shadow-sm inline-block backdrop-blur-sm`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {isRequest ? 'Loan Request' : 'Loan Offer'}
              </motion.span>
              <motion.h3 
                className="font-semibold flex items-center text-lg group-hover:text-primary transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <BitcoinIcon className="text-primary mr-2 group-hover:scale-110 transition-transform duration-300" size={20} />
                <span>{formatBTC(loan.amount)}</span>
              </motion.h3>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm mb-1">Interest Rate</p>
              <motion.p 
                className={`font-bold text-xl ${isRequest ? 'text-primary' : 'text-accent'} group-hover:scale-110 transition-transform duration-200`}
                whileHover={{ scale: 1.1 }}
              >
                {loan.interest}%
              </motion.p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm mb-4">
            <motion.div 
              className="text-center p-3 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30 hover:bg-muted/50 transition-all duration-200"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <p className="font-medium text-foreground text-lg">{loan.durationMonths}</p>
              <p className="text-xs text-muted-foreground mt-1">months</p>
            </motion.div>
            <motion.div 
              className="text-center p-3 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30 hover:bg-muted/50 transition-all duration-200"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="flex items-center justify-center mb-1">
                <i className="ri-star-fill text-warning mr-1 text-sm"></i>
                <span className="font-medium text-foreground">{rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">rating</p>
            </motion.div>
            <motion.div 
              className="text-center p-3 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30 hover:bg-muted/50 transition-all duration-200"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <p className="font-medium text-foreground text-lg">{loan.hasCollateral ? 'Yes' : 'No'}</p>
              <p className="text-xs text-muted-foreground mt-1">collateral</p>
            </motion.div>
          </div>

          {/* Additional loan details */}
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Currency:</span>
              <span className="font-medium text-foreground">{loan.currency || 'BTC'}</span>
            </div>
            {loan.createdAt && (
              <div className="flex items-center justify-between">
                <span>Posted:</span>
                <span className="font-medium text-foreground">
                  {new Date(loan.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 relative z-10">
          <motion.div className="w-full">
            <Button 
              className={`w-full font-medium shadow-md hover:shadow-lg button-hover transition-all duration-300 ${
                isRequest 
                  ? "btn-gradient-primary" 
                  : "btn-gradient-accent"
              }`}
              onClick={handleAccept}
            >
              <i className={`ri-${isRequest ? 'hand-coin' : 'money-dollar-circle'}-line mr-2`}></i>
              {isRequest ? 'Lend Now' : 'Borrow Now'}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}