"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import {
  BookOpen,
  Gem,
  HelpCircle,
  LayoutDashboard,
  PlusSquare,
  Rocket,
  ThumbsUp,
  Coins
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
  { name: "Launchpad", href: "/projects", icon: Rocket },
  { name: "Markets", href: "/markets", icon: Coins },
  { name: "Staking", href: "/staking", icon: Gem },
  { name: "Voting", href: "/voting", icon: ThumbsUp },
];

const bottomItems = [
  { name: "Support", href: "/support", icon: HelpCircle },
  { name: "Docs", href: "https://reactpad.gitbook.io/", icon: BookOpen },
];

export function Sidebar({ children }: { children: React.ReactNode; }) {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const pathname = usePathname();

  // Get the primary embedded wallet address
  // Privy creates embedded wallets automatically when users log in
  // The first wallet in the array is typically the embedded wallet
  const embeddedWallet = wallets.find((wallet: { walletClientType: string; address?: string; }) =>
    wallet.walletClientType === 'privy' || wallet.walletClientType === 'embedded'
  ) || wallets[0];
  const address = embeddedWallet?.address;
  const isConnected = authenticated && !!address;

  return (
    <div className="flex h-screen bg-[#FFF9F0] text-black">
      <div className="flex flex-col w-72 h-full bg-white border-r-4 border-black overflow-y-auto">
        {/* Logo */}
        <div className="p-1 border-b-4 border-black bg-[#7DF9FF] flex items-center justify-center">
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="https://res.cloudinary.com/dma1c8i6n/image/upload/v1764289640/reactpad_swlsov.png"
              alt="ReactPad Logo"
              width={60}
              height={60}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Wallet Info */}
        {isConnected && (
          <div className="mx-6 my-3 p-4 border-4 border-black bg-[#2FFF2F] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-black border-2 border-black"></div>
                <span className="text-xs font-mono font-black uppercase">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
              <button className="hover:scale-110 transition-transform">
                <PlusSquare size={18} strokeWidth={3} />
              </button>
            </div>
            <div>
              <div className="text-3xl font-black">4,500</div>
              <div className="text-sm font-black uppercase mt-1">REACT</div>
              <div className="text-xs font-bold mt-1">~$300</div>
            </div>
            <button
              onClick={logout}
              type="button"
              className="w-full mt-4 bg-red-500 text-white font-black uppercase text-xs tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all px-2 py-2"
            >
              DISCONNECT
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-6 mt-6">
          <ul className="space-y-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 transition-all font-black uppercase text-xs tracking-wider border-2 border-black ${isActive
                      ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                      : "text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                      }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" strokeWidth={2.5} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Create Project Button - Highlighted */}
          <div className="mt-8 mb-3">
            <Link
              href="/dashboard/create"
              className={`flex items-center justify-center w-full px-4 py-4 transition-all font-black uppercase text-xs tracking-wider border-4 border-black ${pathname === "/dashboard/create"
                ? "bg-[#FF4911] text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                : "bg-[#FF00F5] text-black hover:bg-[#FF4911] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                }`}
            >
              <PlusSquare className="w-5 h-5 mr-2" strokeWidth={3} />
              CREATE PROJECT
            </Link>
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-6 border-t-4 border-black">
          <ul className="space-y-2 mb-4">
            {bottomItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center px-3 py-2 transition-all font-bold uppercase text-xs tracking-wider border-2 ${isActive
                      ? "bg-black text-white border-black"
                      : "border-transparent hover:bg-black hover:text-white hover:border-black"
                      }`}
                  >
                    <item.icon className="w-4 h-4 mr-3" strokeWidth={2.5} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Connect Button for non-connected users */}
          {!isConnected && ready && (
            <div className="mt-4">
              <button
                onClick={login}
                type="button"
                className="w-full bg-[#7DF9FF] text-black font-black uppercase text-xs tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all px-4 py-4"
              >
                CONNECT WALLET
              </button>
            </div>
          )}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto bg-[#FFF9F0]">{children}</main>
    </div>
  );
}

export default Sidebar;