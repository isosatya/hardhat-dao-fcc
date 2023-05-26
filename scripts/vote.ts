import * as fs from "fs"
import { PROPOSALS_FILE, VOTING_PERIOD, developmentChains } from "../helper-hardhat-config"
import { ethers, network } from "hardhat"
import { moveBlocks } from "../utils/move-blocks"

const index = 0

async function vote(proposalIndex: number) {
    const proposals = JSON.parse(fs.readFileSync(PROPOSALS_FILE, "utf-8"))
    const proposalID = proposals[network.config.chainId!][proposalIndex]
    // 0 = against, 1= for, 2 = abstain
    const voteDecision = 1
    const reason = "I find this proposal very meaningful and contributive"
    const governor = await ethers.getContract("GovernorContract")
    let state = await governor.state(proposalID)
    console.log("Proposal state in vote script", state)
    const voteTxResponse = await governor.castVoteWithReason(proposalID, voteDecision, reason)
    await voteTxResponse.wait(1)
    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD + 1)
    }
    console.log("Voted and ready to go!")
}

vote(index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
