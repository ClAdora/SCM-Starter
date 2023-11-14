import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [userAge, setUserAge] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);

      let birthYear = prompt("Please enter your birth year:");

      if (birthYear === null) {
        setAccount(undefined);
        setUserAge(undefined);
        return;
      }

      birthYear = parseInt(birthYear);

      if (isNaN(birthYear) || birthYear < 1900 || birthYear > 2023) {
        alert("Invalid birth year. Please enter a valid year between 1900 and 2023.");
        setAccount(undefined);
        setUserAge(undefined);
      } else {
        setUserAge(2023 - birthYear);
        setBirthYear(birthYear);
      }
    } else {
      console.log("No account found");
    }
  };

  const setBirthYear = async (year) => {
    if (atm) {
        try {
            await atm.setBirthYear(year);
        } catch (error) {
            alert(error.message);
        }
    }
  };

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }
  
    if (!account) {
      return (
        <div>
          <p>You must be at least 18 years old to have an account.</p>
          <button onClick={connectAccount}>Login Using Metamask</button>
        </div>
      );
    }
  
    if (userAge === undefined) {
      return null;
    }
  
    if (userAge < 18) {
      return <p class="block">Sorry, you must be at least 18 years old to use this service.</p>;
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
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color:violet;
        }
      `}
      </style>
    </main>
  )
}