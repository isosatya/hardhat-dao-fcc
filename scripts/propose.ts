import { ethers, network } from "hardhat"
import {
    FUNC,
    NEW_STORE_VALUE,
    PROPOSAL_DESCRIPTION,
    VOTING_DELAY,
    developmentChains,
    PROPOSALS_FILE,
} from "../helper-hardhat-config"
import { moveBlocks } from "../utils/move-blocks"
import * as fs from "fs"

export async function startPropose(
    args: any[],
    functionToCall: string,
    proposalDescription: string
) {
    const governor = await ethers.getContract("GovernorContract")
    const box = await ethers.getContract("Box")
    const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall, args)

    console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`)
    console.log(`Proposal Description: \n ${proposalDescription}`)
    // this propose function is originally from the Governor.sol template
    const proposeTx = await governor.propose(
        [box.address],
        [0],
        [encodedFunctionCall],
        proposalDescription
    )

    const proposeReceipt = await proposeTx.wait(1)
    let state = await governor.state(proposeReceipt.events[0].args.proposalId)
    console.log("Proposal state 1", state)

    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_DELAY + 1)
    }

    // events[0] becaues it´s the first argument from the emitted event from governor.propose
    const proposalId = proposeReceipt.events[0].args.proposalId

    let proposals = JSON.parse(fs.readFileSync(PROPOSALS_FILE, "utf-8"))
    proposals[network.config.chainId!.toString()].push(proposalId.toString())
    fs.writeFileSync(PROPOSALS_FILE, JSON.stringify(proposals))

    if (developmentChains.includes(network.name)) {
        await moveBlocks(1)
    }

    state = await governor.state(proposalId)
    console.log("Proposal state 2", state)
}

startPropose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
