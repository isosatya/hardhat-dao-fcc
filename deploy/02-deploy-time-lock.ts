import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { ethers } from "hardhat"
import { MIN_DELAY, VERIFICATION_BLOCK_CONFIRMATIONS } from "../helper-hardhat-config"

const deployTimeLock: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const args = [MIN_DELAY, [], [], deployer]

    const timeLock = await deploy("TimeLock", {
        from: deployer,
        args,
        log: true,
    })
}

export default deployTimeLock
