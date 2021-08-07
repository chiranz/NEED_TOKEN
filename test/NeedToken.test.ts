import { assert, expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  NeedToken,
  NeedToken__factory,
} from "../frontend/src/hardhat/typechain";

let NeedContract: NeedToken__factory;
let needContract: NeedToken;

let deployer: SignerWithAddress;
let signers: SignerWithAddress[];

beforeEach(async () => {
  [deployer, ...signers] = await ethers.getSigners();
  NeedContract = (await ethers.getContractFactory(
    "NeedToken"
  )) as unknown as NeedToken__factory;
  needContract = await NeedContract.deploy("NeedToken", "NEED");
  await needContract.deployed();
});

describe("Need Token", function () {
  it("should mint tokens for the deployer", async function () {
    const deployerBalance = await needContract.balanceOf(deployer.address);
    assert.equal(ethers.utils.formatEther(deployerBalance), "100.0");
  });

  it("should mint token for different fund minters", async () => {
    const [minter1, minter2] = signers;

    await needContract.connect(minter1).mint();
    const minter1Balance = await needContract.balanceOf(minter1.address);
    assert.equal(ethers.utils.formatEther(minter1Balance), "100.0");

    await needContract.connect(minter2).mint();
    const minter2Balance = await needContract.balanceOf(minter2.address);
    assert.equal(ethers.utils.formatEther(minter2Balance), "100.0");
  });
  it("should have a trust score of 10 for fresh minter", async () => {
    const [minter1] = signers;

    await needContract.connect(minter1).mint();
    const minterTrustScore = await needContract.trustScoreOf(minter1.address);
    assert.equal(minterTrustScore.toNumber(), 10);
  });
  it("should reduce the trust score if address tries to mint again", async () => {
    const [minter1] = signers;

    await needContract.connect(minter1).mint();
    await needContract.connect(minter1).mint();
    const minterTrustScore = await needContract.trustScoreOf(minter1.address);
    assert.equal(minterTrustScore.toNumber(), 7);
  });
});
