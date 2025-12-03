"use client";

import { RainbowKitProvider, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import {
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
  metaMaskWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { ThemeProvider } from "next-themes";
import "@rainbow-me/rainbowkit/styles.css";
import { reactiveMainnet, reactiveTestnet } from "@/lib/web3";

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Suggested',
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
        coinbaseWallet
      ],
    },
  ],
  {
    appName: 'ReactPad',
    projectId: 'YOUR_PROJECT_ID', // Replace with your WalletConnect project ID
  }
);

const config = createConfig({
  chains: [reactiveMainnet, reactiveTestnet],
  connectors,
  transports: {
    [reactiveMainnet.id]: http(),
    [reactiveTestnet.id]: http(),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}