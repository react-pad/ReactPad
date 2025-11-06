"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { baseSepolia } from "viem/chains";
import { wagmiAdapterConfig } from "@/lib/web3";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode; }) {
  const [queryClient] = useState(() => new QueryClient());

  // Get Privy App ID from environment variable
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!privyAppId) {
    throw new Error(
      "Error: NEXT_PUBLIC_PRIVY_APP_ID is not set. Please set it in your .env.local file."
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <PrivyProvider
        appId={privyAppId}
        config={{
          loginMethods: ["email", "wallet", "sms", "google", "apple", "twitter"],
          appearance: {
            theme: "light",
            accentColor: "#7DF9FF",
          },
          embeddedWallets: {
            ethereum: {
              createOnLogin: "users-without-wallets",
            },
          },
          defaultChain: baseSepolia,
          supportedChains: [baseSepolia],
        }}
      >
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiAdapterConfig}>
            {children}
          </WagmiProvider>
        </QueryClientProvider>
      </PrivyProvider>
    </ThemeProvider>
  );
}
