// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FlightInsurance {
    // Structure to hold the policy details
    struct Policy {
        uint256 policyId;
        address insured;
        string flightNumber;
        string departureAirport;
        string arrivalAirport;
        uint256 departureTime;
        uint256 amount;
        bool isActive;
    }

    // Variables
    uint256 public policyCounter;
    mapping(address => Policy) public policies;

    // Events
    event PolicyPurchased(
        address indexed insured,
        uint256 policyId,
        string flightNumber,
        uint256 amount
    );
    event VerificationFailed(address indexed user);
    event ProofVerified(address indexed user);

    // Modifier to ensure the function is called only by zkPassVerifier
    modifier onlyVerifier() {
        require(msg.sender == zkPassVerifier, "Caller is not the verifier");
        _;
    }

    // Constructor
    constructor() {
        policyCounter = 0;
    }


    // Function to purchase insurance after proof verification
    function purchasePolicy(
        string memory flightNumber,
        string memory departureAirport,
        string memory arrivalAirport,
        uint256 departureTime,
        uint256 amount
    ) public payable {
        // Ensure the sender has no active policy
        require(!policies[msg.sender].isActive, "You already have an active policy");

        // Verify payment amount
        require(msg.value == amount, "Incorrect payment amount");

        // Create a new policy
        policyCounter++;
        policies[msg.sender] = Policy({
            policyId: policyCounter,
            insured: msg.sender,
            flightNumber: flightNumber,
            departureAirport: departureAirport,
            arrivalAirport: arrivalAirport,
            departureTime: departureTime,
            amount: amount,
            isActive: true
        });

        // Emit an event for policy purchase
        emit PolicyPurchased(msg.sender, policyCounter, flightNumber, amount);
    }

    // Function to deactivate a policy 
    function deactivatePolicy(address user) public {
        require(policies[user].isActive, "Policy is not active");
        policies[user].isActive = false;
    }

    // Function to get policy details for a user
    function getPolicy(address user) public view returns (Policy memory) {
        return policies[user];
    }
}
