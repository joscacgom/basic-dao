import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { MIN_DELAY, PROPOSERS, EXECUTORS } from "../hardhat-helper-config";

const deployTimeLock: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy,log } = deployments;
  const { deployer } = await getNamedAccounts();

    const timeLock=await deploy("TimeLock", {
        from: deployer,
        args: [MIN_DELAY,PROPOSERS,EXECUTORS,deployer],
        log: true,
    });
    log(`TimeLock deployed to: ${timeLock.address}`);

}

export default deployTimeLock;
deployTimeLock.tags = ["TimeLock"];