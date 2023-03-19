import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { MIN_DELAY, PROPOSERS, EXECUTORS, ADMIN, VOTING_DELAY, VOTING_PERIOD, QUORUM } from '../hardhat-helper-config';

const deployGovernorContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy,log, get } = deployments;
  const { deployer } = await getNamedAccounts();

    const timeLock=await get("TimeLock");
    const govToken=await get("GovToken");
    const governor=await deploy("GovernorContract", {
        from: deployer,
        args: [govToken.address,timeLock.address, VOTING_DELAY,VOTING_PERIOD, QUORUM],
        log: true,
    });
    log(`Governor deployed to: ${governor.address}`);

}

export default deployGovernorContract;
deployGovernorContract.tags = ["GovernorContract"];