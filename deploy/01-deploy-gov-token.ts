import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployGovToken: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy,log } = deployments;
  const { deployer } = await getNamedAccounts();

  const govToken=await deploy("GovToken", {
    from: deployer,
    args: [],
    log: true,
  });
  log(`GovToken deployed to: ${govToken.address}`);
  await delegate(govToken.address, deployer);
  log(`GovToken delegated to: ${deployer}`);
}

const delegate = async (governanceTokenAddress:string, delegateAccount: string) =>{
  const governanceToken = await ethers.getContractAt("GovToken", governanceTokenAddress);
  const txResponse = await governanceToken.delegate(delegateAccount);
  await txResponse.wait(1);

}

export default deployGovToken;
deployGovToken.tags = ["GovToken"];