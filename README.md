# Auto-Doc: Document Verification using Blockchain and AI

![Project Banner](https://github.com/user-attachments/assets/26be3957-d830-4768-96df-2e6e5d8804e0)

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Architecture](#architecture)
5. [Installation](#installation)
6. [Usage](#usage)
10. [License](#license)
11. [Acknowledgements](#acknowledgements)

---

## Introduction

The **Auto-Doc** is a decentralized solution designed to automate and secure the process of document verification using **blockchain technology** and **artificial intelligence (AI)**. This platform addresses the inefficiencies and vulnerabilities of traditional manual verification processes by providing a tamper-proof, transparent, and user-friendly system for issuing, verifying, and accessing official documents.

### Key Problems Solved
- **Time-Consuming Manual Verification**: Automates the verification process, reducing time and effort.
- **Fraud and Tampering**: Ensures document integrity using blockchain's immutability.
- **Lack of Interoperability**: Uses **W3C Verifiable Credentials** for global compatibility.
- **Privacy Concerns**: Implements **Zero-Knowledge Proofs (ZKPs)** for selective disclosure of document attributes.

---

## Features

- **Document Issuance**: Issuing authorities (e.g., universities, employers) can create and issue digital documents.
- **Document Verification**: Verifying authorities (e.g., banks, government offices) can validate documents using AI and blockchain.
- **User Portal**: Individuals can view and share their documents securely.
- **AI-Powered Fraud Detection**: Detects forged documents or anomalies in real-time.
- **Zero-Knowledge Proofs (ZKPs)**: Allows users to prove specific attributes (e.g., age, degree) without revealing the entire document.
- **Cross-Chain Compatibility**: Enables verification of credentials across multiple blockchains using Avalanche's **Interchain Messaging**.
- **IPFS Storage**: Stores documents securely on the InterPlanetary File System (IPFS).

---

## Technologies Used

### Frontend
- **React.js**: For building the user interface.
- **TailwindCSS**: For styling the components.
- **Web3.js**: For interacting with the Avalanche blockchain.

### Backend
- **Node.js**: For building the backend server.
- **Express.js**: For creating RESTful APIs.
- **Python**: For AI-powered fraud detection (TensorFlow/OpenCV).

### Blockchain
- **Avalanche Fuji Testnet**: For deploying smart contracts.
- **AvalancheJS**: For interacting with the Avalanche blockchain.
- **Hardhat**: For smart contract development and deployment.
- **IPFS**: For decentralized document storage.

### Zero-Knowledge Proofs (ZKPs)
- **Circom**: For designing ZKP circuits.
- **SnarkJS**: For generating and verifying proofs.

---

## Architecture
![auto-doc-arch](https://github.com/user-attachments/assets/05661bbf-9ca9-4a30-8238-6a870e4d4148)


The platform consists of three main components:
1. **Frontend**: A React-based web portal for issuing authorities, verifying authorities, and individuals.
2. **Backend**: A Node.js server with RESTful APIs for document issuance, verification, and ZKP generation.
3. **Blockchain**: Smart contracts deployed on Avalanche Fuji Testnet for storing document hashes and verifying credentials.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MetaMask or Avalanche Wallet (for blockchain interaction)
- Hardhat (for smart contract deployment)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/4darsh-Dev/AutoDoc_DUHACKS4.git
   cd AutoDoc_DUHACKS4
    ```
2. Frontend setup
    ```bash
    cd frontend
    npm i
    npm run dev
    ```
3. Backend setup
    ```bash
    cd backend
    npm i
    node app.js
    ```
4. Env setup
    ``` ```


## License

This project is licensed under the MIT LICENSE . See the [LICENSE](https://github.com/4darsh-Dev/AutoDoc_DUHACKS4.git/blob/main/LICENSE) file for details.

## Acknowledgements

   - Avalanche: For providing the blockchain infrastructure.

   - IPFS: For decentralized document storage.

   - Circom and SnarkJS: For zero-knowledge proof integration.

   - TensorFlow/OpenCV: For AI-powered fraud detection.
