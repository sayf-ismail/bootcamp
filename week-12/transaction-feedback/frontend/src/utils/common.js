import { ethers } from "ethers";
import ContractAddress from "./../artifacts/contracts/Vault.sol/contract-address.json";
import ContractAbi from "./../artifacts/contracts/Vault.sol/Vault.json";
import Swal from "sweetalert2";

const getBlockchain = () =>
  new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();

      const vault = new ethers.Contract(
        ContractAddress.address,
        ContractAbi.abi,
        signer
      );

      resolve({ signerAddress, vault });
    }
    resolve({ signerAddress: undefined, vault: undefined });
  });

function showError(error) {
  Swal.fire({
    icon: "error",
    title: "Transaction Failed",
    text: error.toString(),
  });
}

function showSuccess(transaction) {
  Swal.fire({
    icon: "success",
    title: "Transaction Mined",
    html: `Your transaction has been successfully mined. <br/> <a target="_blank" href="https://etherscan.io/tx/${transaction.hash}">View on Etherscan </a>`,
  });
}

export { getBlockchain, showError, showSuccess };
export default getBlockchain;
