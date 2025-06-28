import React, { useState } from 'react';
import { BitcoinIcon } from '@/components/ui/bitcoin-icon';
import { useAuth } from '@/hooks/use-auth';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { NotificationBadge } from '@/components/shared/NotificationBadge';
import { motion } from 'framer-motion';

export function MobileHeader() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      className="md:hidden bg-card/95 backdrop-blur-sm shadow-lg p-4 sticky top-0 z-50 border-b border-border/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <motion.div
                whileTap={{ scale: 0.9 }}
              >
                <Button variant="ghost" size="icon" className="mr-3 hover:bg-primary/10 transition-colors duration-200">
                  <motion.i 
                    className="ri-menu-line text-2xl text-foreground"
                    whileHover={{ scale: 1.1 }}
                  />
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 max-w-xs bg-card/95 backdrop-blur-sm">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <BitcoinIcon className="text-primary text-2xl mr-2" />
            </motion.div>
            <span className="font-bold text-xl text-gradient">
              BitLend
            </span>
          </motion.div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.div
            whileTap={{ scale: 0.9 }}
          >
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-colors duration-200">
              <motion.i 
                className="ri-notification-3-line text-2xl text-foreground"
                whileHover={{ scale: 1.1 }}
              />
              <NotificationBadge count={2} />
            </Button>
          </motion.div>
          
          <ThemeToggle />
          
          <motion.div 
            className="bg-gradient-to-br from-primary to-accent text-white rounded-full h-10 w-10 flex items-center justify-center ml-2 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="font-semibold text-sm">{user?.avatarInitials || "BT"}</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}