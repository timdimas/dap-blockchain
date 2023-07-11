import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./Credentials";

function App() {
    const contractAddress = "0xc89e99cbbe432660c521501d90eb8ff8f406a4d8";

    const [provider, setProvider] = useState(null);
    // const [contract, setContract] = useState(null);

    const [carBid, setCarBid] = useState(1);
    const [phoneBid, setPhoneBid] = useState(0);
    const [computerBid, setComputerBid] = useState(0);
    const [totalEtherBalance, setTotalEtherBalance] = useState(0);
    const [account, setAccount] = useState();
    const [owner, setOwner] = useState();

    const [winningItems, setWinningItems] = useState([]);
    const [winners, setWinners] = useState([]);

    const [ticketPurchasedEvents, setTicketPurchasedEvents] = useState([]);

    useEffect(() => {
        async function connectToMetaMask() {
            await connectWallet();
            await getObjectNames();
        }
        initializeContract();
        connectToMetaMask();
        const interval = setInterval(() => {
            getObjectNames();
        }, 5000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    async function initializeContract() {
        if (window.ethereum) {
            await window.ethereum.enable();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);
            if (contract) {
                contract.on("TicketPurchased", handleTicketPurchased);
                contract.on(
                    "WinnersDeclared",
                    (carWinner, phoneWinner, computerWinner) => {
                        setWinners([carWinner, phoneWinner, computerWinner]);
                    }
                );
            }
        }
    }

    const handleTicketPurchased = (buyer, itemName, quantity, event) => {
        // Update the state variable with the event data
        setTicketPurchasedEvents((prevEvents) => [
            ...prevEvents,
            {
                buyer,
                itemName,
                quantity,
                transactionHash: event.transactionHash,
            },
        ]);
    };

    async function handleStartNewCycle() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
            contractAddress,
            abi,
            provider.getSigner()
        );
        if (contract) {
            try {
                const transaction = await contract.startNewCycle();
                await transaction.wait();
                alert("New cycle started");
            } catch (error) {
                console.log(error);
                alert("Failed to start new cycle");
            }
        }
    }

    async function getObjectNames() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(ethereum);
        // setProvider(provider);

        const contract = new ethers.Contract(
            contractAddress,
            abi,
            provider.getSigner()
        );
        const carB = await contract.carTicketsSold();
        const phoneB = await contract.phoneTicketsSold();
        const computerB = await contract.computerTicketsSold();

        setCarBid(carB.toNumber());
        setPhoneBid(phoneB.toNumber());
        setComputerBid(computerB.toNumber());
    }

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                setProvider(provider);

                const contract = new ethers.Contract(
                    contractAddress,
                    abi,
                    provider.getSigner()
                );

                const owner = await contract.getOwner();
                setOwner(owner);
                // setContract(contract);
                setAccount(accounts[0]);
                console.log(accounts, provider, contract);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleBid = async (itemName) => {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // setProvider(provider);

            const contract = new ethers.Contract(
                contractAddress,
                abi,
                provider.getSigner()
            );

            const bidTransaction = await contract.buyTickets(itemName, 1, {
                value: ethers.utils.parseEther("0.01"),
                gasLimit: 300000,
            });

            await bidTransaction.wait();

            contract.on(
                "TicketPurchased",
                (buyer, itemName, quantity, event) => {
                    // Display a pop-up message or perform any desired action
                    console.log(
                        `Ticket purchased by ${buyer}: ${quantity} ${itemName}(s)`
                    );
                }
            );

            console.log("bid successful");
        } catch (error) {
            console.log("bid failed", error);
        }
    };

    async function declareWinners() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
            contractAddress,
            abi,
            provider.getSigner()
        );

        if (contract) {
            try {
                const transaction = await contract.declareWinners({
                    gasLimit: 300000,
                });
                await transaction.wait();

                // const winners = await contract.winners();

                // const carWinner = winners[0];
                // const phoneWinner = winners[1];
                // const computerWinner = winners[2];
                // alert(
                //     "Winners declared",
                //     carWinner,
                //     phoneWinner,
                //     computerWinner
                // );
            } catch (error) {
                console.log(error);
                alert("Failed to declare winners");
            }
        }
    }

    async function checkWinningItems() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
            contractAddress,
            abi,
            provider.getSigner()
        );

        const itemNumbers = await contract.checkWinningItems();

        setWinningItems(itemNumbers);

        // Display the winning items on the page
        console.log("Winning Items:", winningItems);
    }

    async function handleWithdraw() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
            contractAddress,
            abi,
            provider.getSigner()
        );
        if (contract) {
            try {
                const transaction = await contract.withdraw();
                await transaction.wait();
                alert("Withdraw successful");
            } catch (error) {
                console.log(error);
                alert("Withdraw failed");
            }
        }
    }

    async function handleTransferOwnership() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
            contractAddress,
            abi,
            provider.getSigner()
        );
        if (contract && newOwnerAddress) {
            try {
                const transaction = await contract.cahngeOwner(newOwnerAddress);
                await transaction.wait();
                alert("Ownership transferred successfully");
            } catch (error) {
                console.log(error);
                alert("Failed to transfer ownership");
            }
        }
    }

    async function handleDestroyContract() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
            contractAddress,
            abi,
            provider.getSigner()
        );
        if (contract) {
            try {
                const transaction = await contract.destroyContract();
                await transaction.wait();
                alert("Contract destroyed successfully");
            } catch (error) {
                console.log(error);
                alert("Failed to destroy contract");
            }
        }
    }

    return (
        <div className="grid place-content-center bg-white">
            <main className="flex container justify-center items-center flex-col gap-12">
                <h1 className="text-4xl font-semi-bold text-black py-12 border-b border-black/2 w-1/3 text-center">
                    Lottery - Ballot
                </h1>
                <div className="flex gap-12 flex-wrap md:flex-nowrap">
                    <div className="border border-black/2 flex flex-col">
                        <h2 className="px-4 py-2 text-2xl bg-slate-100 border-b border-black/2">
                            Car
                        </h2>
                        <div className="w-1/4 md:w-2/3 self-center">
                            <img
                                className="w-full"
                                src="/src/assets/img/Hyundai.jpg"
                                alt="Car"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleBid("Car")}
                                className="m-2 py-2 px-4 bg-slate-50 border border-black/8 cursor-pointer hover:bg-slate-100"
                            >
                                Bid
                            </button>
                            <div className="m-2 px-4 text-4xl">{carBid}</div>
                        </div>
                    </div>
                    <div className="border border-black/2 flex flex-col">
                        <h2 className="px-4 py-2 text-2xl bg-slate-100 border-b border-black/2">
                            Phone
                        </h2>
                        <div className="w-2/3 self-center">
                            <img
                                className="w-full"
                                src="/src/assets/img/phone.jpg"
                                alt="Car"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleBid("Phone")}
                                className="m-2 py-2 px-4 bg-slate-50 border border-black/8 cursor-pointer hover:bg-slate-100"
                            >
                                Bid
                            </button>
                            <div className="m-2 px-4 text-4xl">{phoneBid}</div>
                        </div>
                    </div>
                    <div className="border border-black/2 flex flex-col">
                        <h2 className="px-4 py-2 text-2xl bg-slate-100 border-b border-black/2">
                            Computer
                        </h2>
                        <div className="self-center">
                            <img
                                className="w-full"
                                src="/src/assets/img/laptop.jpg"
                                alt="Car"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleBid("Computer")}
                                className="m-2 py-2 px-4 bg-slate-50 border border-black/8 cursor-pointer hover:bg-slate-100"
                            >
                                Bid
                            </button>
                            <div className="m-2 px-4 text-4xl">
                                {computerBid}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-between">
                    <div className="flex flex-col gap-4">
                        <span>Current Account:</span>
                        <div className="border border-black px-2">
                            {account}
                        </div>
                        <div className="flex flex-col gap-2 w-2/3">
                            <button
                                onClick={checkWinningItems}
                                id="check-winner-btn"
                                className="bg-blue-400 hover:bg-blue-500 transition-colors text-white p-2 rounded-lg"
                            >
                                Am i Winner
                            </button>
                            <button
                                onClick={connectWallet}
                                id="connect-wallet-btn"
                                className="bg-blue-400 hover:bg-blue-500 transition-colors text-white p-2 rounded-lg"
                            >
                                Connect Wallet
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span>Owner's Account:</span>
                        <div className="border border-black px-2">{owner}</div>
                        <span>Contract Owner's Account:</span>
                        <div className="border border-black px-2">
                            {contractAddress}
                        </div>
                        <div className="flex flex-col self-end gap-2 w-[70%]">
                            <button
                                onClick={handleWithdraw}
                                id="withdraw-btn"
                                className="bg-green-600 hover:bg-green-700 transition-colors text-white p-2 rounded-lg"
                            >
                                Withdraw
                            </button>
                            <button
                                onClick={declareWinners}
                                id="declare-winner-btn"
                                className="bg-green-600 hover:bg-green-700 transition-colors text-white p-2 rounded-lg"
                            >
                                Declare Winner
                            </button>
                            <button
                                onClick={handleDestroyContract}
                                id="declare-winner-btn"
                                className="bg-green-600 hover:bg-green-700 transition-colors text-white p-2 rounded-lg"
                            >
                                Destroy Contract
                            </button>
                            <button
                                onClick={handleTransferOwnership}
                                id="connect-wallet-btn"
                                className="bg-green-600 hover:bg-green-700 transition-colors text-white p-2 rounded-lg"
                            >
                                Transfer Ownership
                            </button>
                            <button
                                onClick={handleStartNewCycle}
                                id="connect-wallet-btn"
                                className="bg-green-600 hover:bg-green-700 transition-colors text-white p-2 rounded-lg"
                            >
                                Start New Cycle
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        Car Winner: {winners[0] ? winners[0].toString() : "-"}
                    </div>
                    <div>
                        Phone Winner: {winners[1] ? winners[1].toString() : "-"}
                    </div>
                    <div>
                        Computer Winner:
                        {winners[2] ? winners[2].toString() : "-"}
                    </div>
                </div>
                <div>
                    <h3>Recent Ticket Purchases:</h3>
                    <ul>
                        {ticketPurchasedEvents.map((event, index) => (
                            <li key={index}>
                                <p>Buyer: {event.buyer.toString()}</p>
                                <p>Item: {event.itemName.toString()}</p>
                                <p>Quantity: {event.quantity.toString()}</p>
                                <p>
                                    Transaction Hash:{" "}
                                    {event.transactionHash.toString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default App;
