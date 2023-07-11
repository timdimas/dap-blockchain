const abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [],
        name: "NewCycleStarted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "string",
                name: "itemName",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "quantity",
                type: "uint256",
            },
        ],
        name: "TicketPurchased",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "carWinner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "phoneWinner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "computerWinner",
                type: "address",
            },
        ],
        name: "WinnersDeclared",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "itemName",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "quantity",
                type: "uint256",
            },
        ],
        name: "buyTickets",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "carName",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "carTicketsSold",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "changeOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "checkWinningItems",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "computerName",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "computerTicketsSold",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "contractOwner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "declareWinners",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "destroyContract",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getCarTicketsSold",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getOwner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "phoneName",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "phoneTicketsSold",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "startNewCycle",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "tickets",
        outputs: [
            {
                internalType: "address",
                name: "buyer",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "quantity",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalEtherBalance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "userWinningItems",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "winners",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

export default abi;
