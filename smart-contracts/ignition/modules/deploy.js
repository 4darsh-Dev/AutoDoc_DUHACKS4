const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DocumentManagementModule = buildModule(
  "DocumentManagementModule",
  (m) => {
    const documentManagement = m.contract("DocumentManagement");

    return { documentManagement };
  }
);

module.exports = DocumentManagementModule;
