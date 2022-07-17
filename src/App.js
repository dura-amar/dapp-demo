//importing
import { useState } from 'react';
import { ethers } from 'ethers';

import logo from './logo.svg';
import './App.css';

//importing abi of our contract
import WorkshopChain from './artifacts/contracts/WorkshopChain.sol/WorkshopChain.json';

//storing our contract in a variable
//address obtained after depoying the contract script
const workshopAddress="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";




function App() {

  //request access to the user's MetaMask account
  // use this with connect wallet button
  async function requestAccount(){
    await window.ethereum.request({method: 'eth_requestAccounts'});
  }

  // get functions
  async function getCurrentWorkshops(){
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(workshopAddress,WorkshopChain.abi, provider)
      try {
        const currentWorkshops = await contract.getCurrentWorkshops();
        console.log('Current Workshop: ', currentWorkshops)
      } catch (err) {
        console.log("Error: ", err)
      }
    }   
  }


  async function getMyWorkshops(){
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(workshopAddress,WorkshopChain.abi, provider)
      try {
        const myWorkshops = await contract.getMyWorkshops()
        console.log('My Workshops: ', myWorkshops)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  async function getParticipants(workshopIndex){
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(workshopAddress,WorkshopChain.abi, provider)
      try {
        const participants = await contract.getParticipants(workshopIndex)
        console.log('My Workshops: ', participants)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  //add functions
  async function addOrganizer(name,about) {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(workshopAddress, WorkshopChain.abi, signer)
      const transaction = await contract.addOrganizer(name,about)
      await transaction.wait()
    }
  }

  async function addParticipant(name,email) {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(workshopAddress, WorkshopChain.abi, signer)
      const transaction = await contract.addParticipant(name,email)
      await transaction.wait()
    }
  }

  async function addWorkshop(banneruri,title,startDate,endDate,venu,time,fee) {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(workshopAddress, WorkshopChain.abi, signer)
      const transaction = await contract.addWorkshop(banneruri,title,startDate,endDate,venu,time,fee)
      await transaction.wait()
    }
  }
  async function registerForWorkshopR(workshopIndex) {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(workshopAddress, WorkshopChain.abi, signer)
      const transaction = await contract.registerForWorkshop(workshopIndex)
      await transaction.wait()
    }
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={requestAccount}>Connect Wallet</button>
        <button onClick={getCurrentWorkshops}>Participant: Get Current Workshops</button>
        <button onClick={getMyWorkshops}>Organizer: Ge my workshops</button>
        <button onClick={getParticipants}>Participants</button>
        <button onClick={addOrganizer}>Add Organizer</button>
        <button onClick={addParticipant}>Add Participant</button>
        <button onClick={addWorkshop}>Add workshops</button>
      
      </header>
    </div>
  );
}

export default App;
