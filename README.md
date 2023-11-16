# Solidity Assessment Contract

## Overview

This Solidity smart contract, named `Assessment.sol`, serves as a basic demonstration of a financial contract. It features functionality for depositing and withdrawing funds, along with additional functions for asserting conditions. The contract is intended for educational purposes and does not include complex features.

## Features

- **Deposit and Withdrawal:** The contract allows the owner to deposit and withdraw funds, with events (`Deposit` and `Withdraw`) emitted for transparency.

- **Balance Inquiry:** Users can inquire about the contract's current balance.

- **Assert Functions:**
  - `AddAndAssert(uint256 num1, uint256 num2):` Ensures that two input numbers are not equal and returns their sum.
  - `CheckAndRevert(uint256 _dataToCheck):` Reverts the transaction with an error message if the input data is less than 20; otherwise, returns true.

## Smart Contract Details (Assessment.sol)

- **Owner:** The address of the contract owner (deployer).

- **Balance:** The current balance of the contract.

- **Events:**
  - `Deposit(uint256 amount):` Emitted when funds are deposited.
  - `Withdraw(uint256 amount):` Emitted when funds are withdrawn.

- **Functions:**
  - `getBalance():` Retrieves the current balance of the contract.
  - `deposit(uint256 _amount):` Allows the owner to deposit funds into the contract.
  - `withdraw(uint256 _withdrawAmount):` Allows the owner to withdraw funds, with an insufficient balance check.
  - `AddAndAssert(uint256 num1, uint256 num2):` Ensures num1 is not equal to num2 and returns their sum.
  - `CheckAndRevert(uint256 _dataToCheck):` Reverts the transaction if the input data is less than 20; otherwise, returns true.

## Getting Started

1. Deploy the `Assessment.sol` contract on the Ethereum blockchain.
2. Interact with the deployed contract using Ethereum wallets or other smart contract interaction tools.

## License

This project is not licensed and is intended for educational purposes only.
