import { createConfig } from '@privy-io/wagmi';
import { http } from 'wagmi';
import { baseSepolia } from 'viem/chains';

// Create Privy Wagmi config
export const wagmiAdapterConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});