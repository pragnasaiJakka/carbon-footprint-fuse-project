
import { ethers } from 'ethers';
import CarbonCreditABI from '../contracts/CarbonCredit.json';

// Contract address on Polygon Mumbai testnet
const CONTRACT_ADDRESS = '0x123456789abcdef123456789abcdef123456789a'; // Replace with actual deployed contract
const MUMBAI_CHAIN_ID = 80001;

export interface EcoActivity {
  activity: string;
  distance: number;
  date: string;
}

export interface TokenListing {
  id: number;
  seller: string;
  amount: number;
  pricePerToken: number;
  active: boolean;
}

export interface Reward {
  id: number;
  name: string;
  description: string;
  tokenCost: number;
  image: string;
}

// Initialize ethers provider and contract
const getProvider = () => {
  if (typeof window.ethereum !== 'undefined') {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  throw new Error('MetaMask not installed');
};

const getContract = async (withSigner = false) => {
  const provider = getProvider();
  if (withSigner) {
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CarbonCreditABI.abi, signer);
  }
  return new ethers.Contract(CONTRACT_ADDRESS, CarbonCreditABI.abi, provider);
};

// Wallet connection
export const connectWallet = async (): Promise<string> => {
  try {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask not installed');
    }

    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    // Check network
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (parseInt(chainId, 16) !== MUMBAI_CHAIN_ID) {
      try {
        // Try to switch to Mumbai testnet
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: ethers.utils.hexValue(MUMBAI_CHAIN_ID) }],
        });
      } catch (error: any) {
        // If Mumbai network is not added, prompt to add it
        if (error.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: ethers.utils.hexValue(MUMBAI_CHAIN_ID),
                chainName: 'Polygon Mumbai',
                nativeCurrency: {
                  name: 'MATIC',
                  symbol: 'MATIC',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
              },
            ],
          });
        } else {
          throw error;
        }
      }
    }

    return account;
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

// Token operations
export const getTokenBalance = async (address: string): Promise<number> => {
  try {
    const contract = await getContract();
    const balance = await contract.balanceOf(address);
    return parseFloat(ethers.utils.formatEther(balance));
  } catch (error) {
    console.error('Error getting token balance:', error);
    return 0;
  }
};

export const mintCarbonCredits = async (address: string, ecoActivity: EcoActivity): Promise<boolean> => {
  try {
    // Calculate tokens based on activity (simplified)
    const tokensToMint = calculateTokens(ecoActivity);
    
    const contract = await getContract(true);
    const tx = await contract.mintCredits(address, ethers.utils.parseEther(tokensToMint.toString()));
    await tx.wait();
    
    return true;
  } catch (error) {
    console.error('Error minting tokens:', error);
    return false;
  }
};

// Helper to calculate tokens based on activity
const calculateTokens = (activity: EcoActivity): number => {
  // Simple calculation based on distance
  const baseTokens = activity.distance * 0.1;
  return Math.max(baseTokens, 1); // Minimum 1 token
};

// Market operations
export const getActiveListings = async (): Promise<TokenListing[]> => {
  try {
    const contract = await getContract();
    const listings = await contract.getActiveListings();
    
    return listings.map((listing: any) => ({
      id: listing.id.toNumber(),
      seller: listing.seller,
      amount: parseFloat(ethers.utils.formatEther(listing.amount)),
      pricePerToken: parseFloat(ethers.utils.formatEther(listing.pricePerToken)),
      active: listing.active
    }));
  } catch (error) {
    console.error('Error getting listings:', error);
    return [];
  }
};

export const createListing = async (amount: number, pricePerToken: number): Promise<boolean> => {
  try {
    const contract = await getContract(true);
    const tx = await contract.createListing(
      ethers.utils.parseEther(amount.toString()),
      ethers.utils.parseEther(pricePerToken.toString())
    );
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error creating listing:', error);
    return false;
  }
};

export const buyListing = async (listingId: number, totalPrice: number): Promise<boolean> => {
  try {
    const contract = await getContract(true);
    const tx = await contract.buyListing(listingId, {
      value: ethers.utils.parseEther(totalPrice.toString())
    });
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error buying listing:', error);
    return false;
  }
};

export const cancelListing = async (listingId: number): Promise<boolean> => {
  try {
    const contract = await getContract(true);
    const tx = await contract.cancelListing(listingId);
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error canceling listing:', error);
    return false;
  }
};

// Rewards operations
export const redeemReward = async (amount: number): Promise<boolean> => {
  try {
    const contract = await getContract(true);
    const tx = await contract.burn(ethers.utils.parseEther(amount.toString()));
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error redeeming reward:', error);
    return false;
  }
};

// Mock rewards data (would typically come from a database)
export const getAvailableRewards = (): Reward[] => {
  return [
    {
      id: 1,
      name: "10% Discount on Eco Products",
      description: "Get 10% off your next purchase of eco-friendly products",
      tokenCost: 5,
      image: "https://placehold.co/100x100?text=Eco+Discount"
    },
    {
      id: 2,
      name: "Tree Planting Certificate",
      description: "We'll plant a tree in your name and send you a certificate",
      tokenCost: 10,
      image: "https://placehold.co/100x100?text=Tree+Planting"
    },
    {
      id: 3,
      name: "Carbon Neutral Flight Offset",
      description: "Offset the carbon emissions of your next flight",
      tokenCost: 20,
      image: "https://placehold.co/100x100?text=Flight+Offset"
    },
    {
      id: 4,
      name: "Sustainable Fashion Voucher",
      description: "Voucher for sustainable clothing brands",
      tokenCost: 15,
      image: "https://placehold.co/100x100?text=Fashion+Voucher"
    }
  ];
};

// Listen for account changes
export const setupAccountsChangedListener = (callback: (accounts: string[]) => void) => {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', callback);
    return () => {
      window.ethereum.removeListener('accountsChanged', callback);
    };
  }
  return () => {};
};

// Listen for chain changes
export const setupChainChangedListener = (callback: (chainId: string) => void) => {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('chainChanged', callback);
    return () => {
      window.ethereum.removeListener('chainChanged', callback);
    };
  }
  return () => {};
};
