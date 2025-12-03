export const REACT_TOKEN_ADDRESS = "0xe00CBca00d36c89819289dE34e352881E8F475Fd"; // Replace with actual contract address
export const REACT_TOKEN_PRICE_USD = 0.067; // Mock price

import { maxUint256 } from 'viem';

const uint256Max = maxUint256;

const feeToSpacing = {
    3000: 60,
    500: 10
};

// Token definitions for Sepolia testnet
export const TOKENS = {
    WBLOCX: {
        symbol: 'WBLOCX',
        name: 'Wrapped BLOCX',
        address: '0xe00CBca00d36c89819289dE34e352881E8F475Fd',
        decimals: 18,
        logoURI: 'https://res.cloudinary.com/dma1c8i6n/image/upload/v1760088649/wBLOCX_ldu8l2.png',
        color: '#1E90FF'
    },
};

export const TOKEN_LIST = Object.values(TOKENS);

export { feeToSpacing, uint256Max };