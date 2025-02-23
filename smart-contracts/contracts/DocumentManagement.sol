// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentManagement {
    // Document struct with CID and reference ID (off-chain database)
    struct Document {
        string cid;         // IPFS CID of the document
        string referenceId; // Reference ID for off-chain database
    }

    // Mapping from owner address to their documents
    mapping(address => Document[]) public documentsByOwner;

    // Event emitted when a new document is issued
    event DocumentIssued(address indexed owner, string cid, string referenceId);

    // Function to issue a document for a specified owner
    function issueDocument(address owner, string calldata cid, string calldata referenceId) external {
        // Create the new document
        Document memory newDoc = Document({
            cid: cid,
            referenceId: referenceId
        });

        // Add the document to the owner's list of documents
        documentsByOwner[owner].push(newDoc);

        // Emit the event for document issuance
        emit DocumentIssued(owner, cid, referenceId);
    }

    // Function to retrieve documents of a specific user
    function getUserDocuments(address user) external view returns (Document[] memory) {
        return documentsByOwner[user];
    }
}