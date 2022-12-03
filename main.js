import './style.css'


async function connectMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    //console.log('MetaMask is installed!');

    const address = await window.ethereum.request({ method: 'eth_requestAccounts' });

    document.getElementById('status').innerText = `You are connected to MetaMask and your address is ${address}`;


  }
  else {
    document.getElementById('status').innerText = 'MetaMask is not installed'
  }
}

async function checkChainChanged() {
  const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  // Do something with the chainId

  window.ethereum.on('chainChanged', handleChainChanged(chainId));

  async function handleChainChanged(chainId) {
    const newChainId = await window.ethereum.request({ method: 'eth_chainId' });
    document.getElementById('status').innerText = `Network has changed. Current network is ${newChainId}`
  }

}



document.getElementById("connect").addEventListener('click', connectMetaMask);

document.getElementById('check').addEventListener('click', checkChainChanged);