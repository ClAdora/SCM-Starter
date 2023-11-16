import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [checkNum, setCheckNum] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const addAndAssert = async () => {
    if (atm && num1 !== "" && num2 !== "") {
      try {
        const result = await atm.AddAndAssert(
          parseInt(num1),
          parseInt(num2)
        );
        alert(`AddAndAssert Result: ${result.toNumber()}`);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please enter valid numbers for num1 and num2.");
    }
  };

  const checkAndRevert = async () => {
    if (atm && checkNum !== "") {
      try {
        const result = await atm.CheckAndRevert(parseInt(checkNum));
        alert(`CheckAndRevert Result: ${result}`);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please enter a valid number for CheckAndRevert.");
    }
  };

  const initUser = () => {
    // Check to see if the user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask to use this ATM.</p>;
    }

    // Check to see if the user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>

        <div>
          <label>
            Num1:
            <input
              type="text"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />
          </label>
          <label>
            Num2:
            <input
              type="text"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />
          </label>
          <button onClick={addAndAssert}>AddAndAssert</button>
        </div>

        <div>
          <label>
            CheckNum:
            <input
              type="text"
              value={checkNum}
              onChange={(e) => setCheckNum(e.target.value)}
            />
          </label>
          <button onClick={checkAndRevert}>CheckAndRevert</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Metacrafters ATM!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
