//importing
import { useState } from 'react';
import { ethers } from 'ethers';

import logo from './logo.svg';
import './App.css';

//importing abi of our contract
import Certificates from './artifacts/contracts/Certificates.sol/Certificates.json';

//storing our contract in a variable
//address obtained after depoying the contract script
const certificatesAddress="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";




function App() {



  // storing greeting in local state
  const [userType] = useState();

  //request access to the user's MetaMask account
  // use this with connect wallet button
  async function requestAccount(){
    await window.ethereum.request({method: 'eth_requestAccounts'});
  }


  async function getIssuers(){
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(certificatesAddress,Certificates.abi, provider)
      try {
        const data = await contract.getIssuers()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }



  return (
    <div className="App">
      <header className="App-header">
        <button onClick={requestAccount}>Connect Wallet</button>
        <button onClick={getIssuers}>Get Issuers</button>
      </header>
    </div>
  );
}

export default App;
