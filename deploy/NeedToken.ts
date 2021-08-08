module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("NeedToken", {
    from: deployer,
    gas: 4000000,
    args: ["NeedToken", "NEED"],
  });
};
