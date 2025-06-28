import React from 'react';
import { Loan } from '@shared/schema';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BitcoinIcon } from '@/components/ui/bitcoin-icon';
import { formatBTC, getLoanStatusBadgeClass, getLoanTypeClass } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LoanCardProps {
  loan: Loan;
  onViewDetails?: (loan: Loan) => void;
  onRepay?: (loan: Loan) => void;
  showRepayButton?: boolean;
}

export function LoanCard({ 
  loan, 
  onViewDetails, 
  onRepay,
  showRepayButton = false
}: LoanCardProps) {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(loan);
    }
  };

  const handleRepay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRepay) {
      onRepay(loan);
    }
  };

  const typeClass = getLoanTypeClass(loan.type);
  const statusClass = getLoanStatusBadgeClass(loan.status);
  const isBorrowing = loan.type === 'request';

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card 
        className="h-full cursor-pointer enhanced-card group overflow-hidden relative"
        onClick={handleViewDetails}
      >
        {/* Gradient overlay for visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-2">
              <motion.span 
                className={`text-xs py-1.5 px-3 rounded-full font-medium ${typeClass} shadow-sm inline-block`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {isBorrowing ? 'Borrowed' : 'Lent'}
              </motion.span>
              <motion.h3 
                className="font-semibold flex items-center text-lg group-hover:text-primary transition-colors duration-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <BitcoinIcon className="text-primary mr-2 group-hover:scale-110 transition-transform duration-200" size={20} />
                <span>{formatBTC(loan.amount)}</span>
              </motion.h3>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm mb-1">Status</p>
              <motion.p 
                className={`text-xs py-1.5 px-3 rounded-full font-medium inline-block ${statusClass} shadow-sm`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
              </motion.p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-sm mb-4">
            <motion.div 
              className="text-center p-3 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30 hover:bg-muted/50 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-medium text-foreground text-lg">{loan.interest}%</p>
              <p className="text-xs text-muted-foreground mt-1">Interest</p>
            </motion.div>
            <motion.div 
              className="text-center p-3 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30 hover:bg-muted/50 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-medium text-foreground text-lg">{loan.durationMonths}</p>
              <p className="text-xs text-muted-foreground mt-1">Months</p>
            </motion.div>
            <motion.div 
              className="text-center p-3 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30 hover:bg-muted/50 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-medium text-foreground text-lg">{loan.hasCollateral ? 'Yes' : 'No'}</p>
              <p className="text-xs text-muted-foreground mt-1">Collateral</p>
            </motion.div>
          </div>
          
          {loan.createdAt && (
            <motion.p 
              className="text-xs text-muted-foreground flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <i className="ri-time-line mr-2 text-primary"></i>
              Created on {new Date(loan.createdAt).toLocaleDateString()}
            </motion.p>
          )}
        </CardContent>
        
        {(showRepayButton && loan.status === 'active' && isBorrowing) && (
          <CardFooter className="pt-0 pb-4 px-6 relative z-10">
            <motion.div className="w-full">
              <Button 
                onClick={handleRepay} 
                className="w-full btn-gradient-primary button-hover shadow-md hover:shadow-lg" 
                variant="default"
              >
                <i className="ri-money-dollar-circle-line mr-2"></i>
                Make Repayment
              </Button>
            </motion.div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}