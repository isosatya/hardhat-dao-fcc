import { ethers } from "hardhat"

export interface networkConfigItem {
    name?: string
    subscriptionId?: string
    gasLane?: string
    keepersUpdateInterval?: string
    raffleEntranceFee?: string
    callbackGasLimit?: string
    vrfCoordinatorV2?: string
    mintFee?: string
    ethUsdPriceFeed?: string
    blockConfirmations?: string
    gas?: string
    allowUnlimitedContractSize?: boolean
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    11155111: {
        name: "sepolia",
        subscriptionId: "1141",
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        keepersUpdateInterval: "30",
        raffleEntranceFee: ethers.utils.parseEther("0.01").toString(),
        callbackGasLimit: "5000000",
        vrfCoordinatorV2: "0x8103b0a8a00be2ddc778e6e7eaa21791cd364625",
        mintFee: "10000000000000000", // 0.01 ETH
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
        blockConfirmations: "6",
        gas: "600000000", // Manual Gas
    },
    31337: {
        name: "localhost",
        subscriptionId: "588",
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: ethers.utils.parseEther("0.01").toString(), // 0.01 ETH
        callbackGasLimit: "500000000", // 500,000 gas
        mintFee: "10000000000000000", // 0.01 ETH
        blockConfirmations: "1",
        allowUnlimitedContractSize: true,
        gas: "600000000",
    },
}

export const developmentChains = ["hardhat", "localhost"]

export const VERIFICATION_BLOCK_CONFIRMATIONS = 6

export const MIN_DELAY = 3600

export const VOTING_PERIOD = 5
export const VOTING_DELAY = 1
export const QUORUM_PERCENTAGE = 4

export const NEW_STORE_VALUE = 77
export const FUNC = "store"
export const PROPOSAL_DESCRIPTION = "Proposal #1: store 777 in the Box contract"
export const PROPOSALS_FILE = "proposals.json"

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    MIN_DELAY,
    VOTING_PERIOD,
    VOTING_DELAY,
    QUORUM_PERCENTAGE,
    NEW_STORE_VALUE,
    FUNC,
    PROPOSAL_DESCRIPTION,
    PROPOSALS_FILE,
}
