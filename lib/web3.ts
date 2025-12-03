import { createConfig } from 'wagmi'
import type { Chain } from 'viem'
import { http } from 'viem'

export const reactiveMainnet: Chain = {
  id: 1597,
  name: 'Reactive Mainnet',
  nativeCurrency: {
    name: 'REACT',
    symbol: 'REACT',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://mainnet.rpc.reactive.network'] }
  },
  blockExplorers: {
    default: { name: 'ReactiveScan', url: 'https://reactscan.net/' }
  },
}
export const reactiveTestnet: Chain = {
  id: 5318007,
  name: 'Reactive Testnet',
  nativeCurrency: {
    name: 'REACT',
    symbol: 'REACT',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://testnet.rpc.reactive.network'] }
  },
  blockExplorers: {
    default: { name: 'ReactiveScanTestnet', url: 'https://lasna.reactscan.net/' }
  },
}

export const wagmiAdapterConfig = createConfig({
  chains: [reactiveMainnet, reactiveTestnet],
  transports: {
    [reactiveMainnet.id]: http(),
    [reactiveTestnet.id]: http(),
  }
})