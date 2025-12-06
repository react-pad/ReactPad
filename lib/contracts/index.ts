export const TokenFactoryContract = {
    address: "0x...YourTokenFactoryAddress...", //TODO: Replace with actual address
    abi: [
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "symbol",
                            "type": "string"
                        },
                        {
                            "internalType": "uint8",
                            "name": "decimals",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint256",
                            "name": "initialSupply",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "initialRecipient",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct TokenFactory.TokenParams",
                    "name": "params",
                    "type": "tuple"
                }
            ],
            "name": "createBurnableToken",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "symbol",
                            "type": "string"
                        },
                        {
                            "internalType": "uint8",
                            "name": "decimals",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint256",
                            "name": "initialSupply",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "initialRecipient",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct TokenFactory.TokenParams",
                    "name": "params",
                    "type": "tuple"
                }
            ],
            "name": "createMintableToken",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "symbol",
                            "type": "string"
                        },
                        {
                            "internalType": "uint8",
                            "name": "decimals",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint256",
                            "name": "initialSupply",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "initialRecipient",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct TokenFactory.TokenParams",
                    "name": "params",
                    "type": "tuple"
                }
            ],
            "name": "createNonMintableToken",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "symbol",
                            "type": "string"
                        },
                        {
                            "internalType": "uint8",
                            "name": "decimals",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint256",
                            "name": "initialSupply",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "initialRecipient",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct TokenFactory.TokenParams",
                    "name": "params",
                    "type": "tuple"
                }
            ],
            "name": "createPlainToken",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "symbol",
                            "type": "string"
                        },
                        {
                            "internalType": "uint8",
                            "name": "decimals",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint256",
                            "name": "initialSupply",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "initialRecipient",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct TokenFactory.TokenParams",
                    "name": "params",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "taxWallet",
                            "type": "address"
                        },
                        {
                            "internalType": "uint96",
                            "name": "taxBps",
                            "type": "uint96"
                        }
                    ],
                    "internalType": "struct TokenFactory.TaxParams",
                    "name": "tax",
                    "type": "tuple"
                }
            ],
            "name": "createTaxableToken",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "deployments",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "enum TokenFactory.TokenType",
                    "name": "tokenType",
                    "type": "uint8"
                },
                {
                    "internalType": "address",
                    "name": "creator",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "creator",
                    "type": "address"
                }
            ],
            "name": "tokensCreatedBy",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalDeployments",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "token",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "enum TokenFactory.TokenType",
                "name": "tokenType",
                "type": "uint8"
              }
            ],
            "name": "TokenCreated",
            "type": "event"
          }
    ]
} as const;

// Add other contracts here...

export const AirdropMultisenderContract = {
    address: "0x...YourAirdropMultisenderAddress...", //TODO: Replace with actual address
    abi: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "recipients",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "name": "sendERC20",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "recipients",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "name": "sendETH",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "token",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalAmount",
                "type": "uint256"
              }
            ],
            "name": "TokensSent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalAmount",
                "type": "uint256"
              }
            ],
            "name": "EthSent",
            "type": "event"
        }
    ]
} as const;

export const TokenLockerContract = {
    address: "0x...YourTokenLockerAddress...", //TODO: Replace with actual address
    abi: [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "lockId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint64",
                    "name": "additionalTime",
                    "type": "uint64"
                }
            ],
            "name": "extendLock",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "lockId",
                    "type": "uint256"
                }
            ],
            "name": "getLock",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "token",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint64",
                            "name": "lockDate",
                            "type": "uint64"
                        },
                        {
                            "internalType": "uint64",
                            "name": "unlockDate",
                            "type": "uint64"
                        },
                        {
                            "internalType": "bool",
                            "name": "withdrawn",
                            "type": "bool"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct TokenLocker.LockInfo",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint64",
                    "name": "lockDuration",
                    "type": "uint64"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                }
            ],
            "name": "lockTokens",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "lockId",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "locksOfOwner",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "lockIds",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalLocks",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "lockId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferLockOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "lockId",
                    "type": "uint256"
                }
            ],
            "name": "unlock",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
} as const;

export const PresaleFactoryContract = {
    address: "0x...YourPresaleFactoryAddress...", //TODO: Replace with actual address
    abi: [
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "saleToken",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "paymentToken",
                            "type": "address"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint64",
                                    "name": "startTime",
                                    "type": "uint64"
                                },
                                {
                                    "internalType": "uint64",
                                    "name": "endTime",
                                    "type": "uint64"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "rate",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "softCap",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "hardCap",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "minContribution",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "maxContribution",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct PresaleConfig",
                            "name": "config",
                            "type": "tuple"
                        },
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct PresaleFactory.CreateParams",
                    "name": "params",
                    "type": "tuple"
                }
            ],
            "name": "createPresale",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "presale",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "creator",
                    "type": "address"
                }
            ],
            "name": "presalesCreatedBy",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalPresales",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "allPresales",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
} as const;

export const LaunchpadPresaleContract = {
    // This ABI is for an instance of a presale, the address will be dynamic
    abi: [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "contribute",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "claimTokens",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "claimRefund",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "saleToken",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "paymentToken",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "startTime",
            "outputs": [
                {
                    "internalType": "uint64",
                    "name": "",
                    "type": "uint64"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "endTime",
            "outputs": [
                {
                    "internalType": "uint64",
                    "name": "",
                    "type": "uint64"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "rate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "softCap",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "hardCap",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalRaised",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "minContribution",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "maxContribution",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "claimEnabled",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "refundsEnabled",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
} as const;

export const NFTFactoryContract = {
    address: "0x...YourNFTFactoryAddress...", //TODO: Replace with actual address
    abi: [
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "symbol",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "baseURI",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "maxSupply",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "payoutWallet",
                            "type": "address"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint64",
                                    "name": "saleStart",
                                    "type": "uint64"
                                },
                                {
                                    "internalType": "uint64",
                                    "name": "saleEnd",
                                    "type": "uint64"
                                },
                                {
                                    "internalType": "uint32",
                                    "name": "walletLimit",
                                    "type": "uint32"
                                },
                                {
                                    "internalType": "uint128",
                                    "name": "price",
                                    "type": "uint128"
                                }
                            ],
                            "internalType": "struct MintConfig",
                            "name": "mintConfig",
                            "type": "tuple"
                        }
                    ],
                    "internalType": "struct NFTFactory.NFTParams",
                    "name": "params",
                    "type": "tuple"
                }
            ],
            "name": "createETHNFT",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "nft",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "symbol",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "baseURI",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "maxSupply",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "payoutWallet",
                            "type": "address"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint64",
                                    "name": "saleStart",
                                    "type": "uint64"
                                },
                                {
                                    "internalType": "uint64",
                                    "name": "saleEnd",
                                    "type": "uint64"
                                },
                                {
                                    "internalType": "uint32",
                                    "name": "walletLimit",
                                    "type": "uint32"
                                },
                                {
                                    "internalType": "uint128",
                                    "name": "price",
                                    "type": "uint128"
                                }
                            ],
                            "internalType": "struct MintConfig",
                            "name": "mintConfig",
                            "type": "tuple"
                        }
                    ],
                    "internalType": "struct NFTFactory.NFTParams",
                    "name": "params",
                    "type": "tuple"
                },
                {
                    "internalType": "address",
                    "name": "paymentToken",
                    "type": "address"
                }
            ],
            "name": "createUSDCNFT",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "nft",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalDeployments",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "deployments",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "nft",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "acceptsEth",
                            "type": "bool"
                        },
                        {
                            "internalType": "address",
                            "name": "creator",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct NFTFactory.NFTRecord[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
} as const;

export const LaunchpadNFTContract = {
    // This ABI is for an instance of an NFT, the address will be dynamic
    abi: [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "maxSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalMinted",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "mintPrice",
            "outputs": [
                {
                    "internalType": "uint128",
                    "name": "",
                    "type": "uint128"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "saleStart",
            "outputs": [
                {
                    "internalType": "uint64",
                    "name": "",
                    "type": "uint64"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "saleEnd",
            "outputs": [
                {
                    "internalType": "uint64",
                    "name": "",
                    "type": "uint64"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
} as const;


