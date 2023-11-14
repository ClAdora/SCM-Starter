# Metacrafters ATM

## Overview

This project consists of a simple decentralized application (DApp) built with React and a corresponding smart contract written in Solidity. The DApp simulates an ATM system that allows users to deposit and withdraw funds based on certain conditions. The smart contract, named `Assessment.sol`, is deployed on the Ethereum blockchain, and the React app, `HomePage.js`, interacts with the contract through the MetaMask wallet.

## Features

- **Connection with MetaMask:** The React app connects to the MetaMask wallet to interact with the Ethereum blockchain.

- **Age Verification:** Users must input their birth year to verify their age. Only users who are 18 years or older are allowed to access the ATM functions.

- **Deposit and Withdrawal:** Users can deposit and withdraw funds from the ATM, subject to age verification and other conditions.

## Smart Contract Details (Assessment.sol)

- **Owner:** The contract owner is set during deployment and has special privileges.

- **Balance:** Tracks the balance of the smart contract.

- **Birth Years:** A mapping that stores the birth year of each user.

- **Modifiers:**
  - `onlyAdult:` Ensures that the user is 18 years or older.

- **Functions:**
  - `getBalance():` Retrieves the current balance of the contract.
  - `userAge(address _user):` Retrieves the age of a user based on their birth year.
  - `setBirthYear(uint256 _year):` Sets the birth year for a user.
  - `deposit(uint256 _amount):` Allows the owner to deposit funds into the contract.
  - `withdraw(uint256 _withdrawAmount):` Allows the owner to withdraw funds, with age and balance checks.

## React App Details (HomePage.js)

- **State Variables:**
  - `ethWallet:` Stores the MetaMask wallet.
  - `account:` Stores the connected user's Ethereum account.
  - `atm:` Represents the deployed smart contract.
  - `balance:` Tracks the user's balance.
  - `userAge:` Stores the user's age.

- **Functions:**
  - `getWallet():` Connects the app to the MetaMask wallet.
  - `handleAccount(account):` Handles the user account details and age verification.
  - `setBirthYear(year):` Sets the user's birth year on the smart contract.
  - `connectAccount():` Connects the app to the user's MetaMask account.
  - `getATMContract():` Gets a reference to the deployed smart contract.
  - `getBalance():` Retrieves the user's balance from the smart contract.
  - `deposit():` Deposits 1 ETH into the smart contract.
  - `withdraw():` Withdraws 1 ETH from the smart contract.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install` in the React app directory.
3. Deploy the `Assessment.sol` contract to the Ethereum blockchain.
4. Update the `contractAddress` variable in `HomePage.js` with the deployed contract address.
5. Run the React app using `npm start`.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
