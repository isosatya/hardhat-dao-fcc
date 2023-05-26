import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { ethers } from "hardhat"

const deployGovernanceToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("Deploying GovernanceToken...")
    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        args: [],
        log: true,
    })

    await delegate(governanceToken.address, deployer)
    console.log("Delegated!")
}

const delegate = async function (governanceTokenAddress: string, delegatedAccount: string) {
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)
    const tx = await governanceToken.delegate(delegatedAccount)
    await tx.wait(1)
    // checkpoints should be 1 if delegated correctly
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}

export default deployGovernanceToken
