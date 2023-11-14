#Solidity SmartContract
Overview
This Solidity SmartContract, named "Assessment," is designed to function as a basic ATM service on the Ethereum blockchain. It features functionalities such as depositing and withdrawing funds, age verification, and maintaining user account balances. The contract is equipped with event logging and custom error handling for a more robust user experience.

State Variables
owner: The Ethereum address that deploys the contract, serving as the owner of the ATM.
balance: A state variable representing the total balance of the ATM.
birthYears: A mapping of Ethereum addresses to their corresponding birth years.
Events
Deposit(uint256 amount): Triggered when a deposit is made, logging the deposited amount.
Withdraw(uint256 amount): Triggered when a withdrawal occurs, logging the withdrawn amount.
Functions
onlyAdult: A modifier ensuring that the user invoking a function is 18 years or older.
getBalance(): Retrieves the current balance of the ATM.
userAge(address _user): Calculates and returns the age of a user based on their provided birth year.
setBirthYear(uint256 _year): Sets the birth year for the calling user.
deposit(uint256 _amount): Allows the owner to deposit funds into the ATM, updating the balance.
withdraw(uint256 _withdrawAmount): Allows the owner to withdraw funds from the ATM, with proper balance checks.
Error Handling
Custom error InsufficientBalance is triggered when a withdrawal is attempted with insufficient funds.
React Application
Overview
The React application is a front-end interface for interacting with the Assessment SmartContract. It uses the MetaMask wallet for account authentication and provides a simple user interface to view account details, deposit, and withdraw funds.

Components
HomePage: The main component rendering the UI elements.
getWallet: Fetches the MetaMask wallet and updates the account details.
handleAccount: Manages the user account, prompting for birth year and setting it.
setBirthYear: Calls the SmartContract function to set the user's birth year.
connectAccount: Connects the MetaMask wallet and initializes the ATM contract.
getATMContract: Initializes the ATM contract using ethers.js.
getBalance: Retrieves and updates the user's balance from the SmartContract.
deposit: Initiates a deposit transaction and updates the balance.
withdraw: Initiates a withdrawal transaction and updates the balance.
initUser: Renders the user interface based on the user's age and account status.
Usage
Install MetaMask to use the ATM.
Connect your MetaMask wallet to the application.
Enter your birth year when prompted.
Interact with the ATM by checking your balance, depositing, and withdrawing funds.
License
This project is licensed under the MIT License - see the LICENSE.md file for details.
