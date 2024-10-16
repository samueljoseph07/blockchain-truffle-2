window.addEventListener('load', async () => {
    // Check if Web3 has been injected by the browser (MetaMask)
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');

        // Request account access if needed
        await ethereum.request({ method: 'eth_requestAccounts' });

        // Initialize web3 instance
        window.web3 = new Web3(window.ethereum);

        // Get the current account (address) from MetaMask
        const accounts = await web3.eth.getAccounts();
        console.log("Connected account:", accounts[0]);

        // Display connected account
        document.body.innerHTML += `<p>Connected Account: ${accounts[0]}</p>`;
    } else {
        console.log('MetaMask is not installed!');
        alert("Please install MetaMask to use this DApp.");
    }
});

