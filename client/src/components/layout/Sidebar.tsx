import React from 'react';
import { Link, useLocation } from 'wouter';
import { BitcoinIcon } from '@/components/ui/bitcoin-icon';
import { cn, formatBTC, shortenWalletAddress } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useUserWallet } from '@/hooks/use-wallet';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  href: string;
  icon: string;
  label: string;
  isActive: boolean;
}

function SidebarItem({ href, icon, label, isActive }: SidebarItemProps) {
  return (
    <li className="mb-2">
      <Link href={href}>
        <motion.div
          className={cn(
            "nav-item flex items-center p-3 rounded-lg font-medium transition-all duration-200 relative overflow-hidden group",
            isActive
              ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
              : "text-foreground/70 hover:bg-muted/50 hover:text-foreground"
          )}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="nav-item-content flex items-center w-full">
            <motion.i 
              className={`ri-${icon}-line mr-3 text-lg`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
            {label}
          </div>
          {isActive && (
            <motion.div
              className="absolute right-2 w-2 h-2 bg-primary rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          )}
        </motion.div>
      </Link>
    </li>
  );
}

export function Sidebar() {
  const [location] = useLocation();
  const { user, handleLogout } = useAuth();
  const { wallet } = useUserWallet();

  const navItems = [
    { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
    { href: "/loans", icon: "exchange-dollar", label: "My Loans" },
    { href: "/marketplace", icon: "store-2", label: "Marketplace" },
    { href: "/transactions", icon: "exchange-funds", label: "Transactions" },
    { href: "/wallet", icon: "wallet-3", label: "Wallet" },
    { href: "/settings", icon: "settings-3", label: "Settings" },
  ];

  const initials = user?.avatarInitials || "BT";
  const walletAddress = wallet.isConnected ? wallet.address : user?.walletAddress;
  const btcBalance = wallet.isConnected && wallet.balance 
    ? parseFloat(wallet.balance) 
    : user?.btcBalance || 0;

  return (
    <motion.aside 
      className="hidden md:flex md:flex-col md:w-64 bg-card/80 backdrop-blur-sm border-r border-border/50 p-5 h-screen sticky top-0 custom-scrollbar overflow-y-auto shadow-lg"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Logo */}
      <motion.div 
        className="flex items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <BitcoinIcon className="text-primary text-3xl mr-3" />
        </motion.div>
        <span className="font-bold text-2xl text-gradient">BitLend</span>
      </motion.div>
      
      {/* User Profile */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center mb-4">
          <motion.div 
            className="bg-gradient-to-br from-primary to-accent text-white rounded-full h-12 w-12 flex items-center justify-center mr-3 shadow-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="font-semibold text-lg">{initials}</span>
          </motion.div>
          <div>
            <p className="font-semibold text-foreground">{user?.username || "Anonymous"}</p>
            <p className="text-sm text-muted-foreground truncate">
              {shortenWalletAddress(walletAddress || "")}
            </p>
          </div>
        </div>
        
        <motion.div 
          className="enhanced-card p-4 mb-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-muted-foreground font-medium">Balance</span>
            <motion.span 
              className="text-primary font-semibold flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <BitcoinIcon className="mr-1" size={16} />
              <span>{formatBTC(btcBalance)}</span>
            </motion.span>
          </div>
          <Button 
            variant="default" 
            size="sm" 
            className="w-full btn-gradient-primary button-hover"
          >
            <i className="ri-add-line mr-2"></i> Deposit Funds
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Navigation */}
      <motion.nav 
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <ul>
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <SidebarItem
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={location === item.href}
              />
            </motion.div>
          ))}
        </ul>
      </motion.nav>
      
      {/* Footer */}
      <motion.div 
        className="mt-auto pt-6 border-t border-border/50 space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link href="/help">
          <motion.div 
            className="nav-item flex items-center p-3 rounded-lg text-foreground/70 hover:bg-muted/50 hover:text-foreground font-medium transition-all duration-200 group"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="nav-item-content flex items-center">
              <i className="ri-question-line mr-3 text-lg group-hover:text-accent transition-colors duration-200"></i>
              Help & Support
            </div>
          </motion.div>
        </Link>
        <motion.button 
          onClick={handleLogout}
          className="nav-item flex items-center p-3 w-full text-left rounded-lg text-destructive hover:bg-destructive/10 font-medium transition-all duration-200 group"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="nav-item-content flex items-center">
            <i className="ri-logout-box-line mr-3 text-lg group-hover:scale-110 transition-transform duration-200"></i>
            Log Out
          </div>
        </motion.button>
      </motion.div>
    </motion.aside>
  );
}