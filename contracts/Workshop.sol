// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract WorkshopChain {
    address owner;

    // This enum is for different user types
    enum UserType {
        ORGANIZER,
        PARTICIPANT
    }

    //struct for organizer
    struct Organizer {
        address id;
        string name;
        string about;
    }

    //struct for participant
    struct Participant {
        address id;
        string name;
        string email;
    }

    //struct for workshop
    struct Workshop {
        string bannerUri; //hash of the banner stored in ipfs
        string title;
        string startDate;
        string endDate;
        string venue;
        string time;
        uint fee;
        address organizer;
        mapping(uint=>Participant) participants;
    }

    mapping(uint=>Workshop) public workshops;
    mapping(address=>Organizer) public organizers;
    mapping(address=>Participant) public participants;


// Default constructor to set the owner address only
    constructor() {
        owner=msg.sender;
    }

/*
* add organizer
* @param : name, about
* adds a new Organizer to organizers
*/
    function addOrganizer(string memory name, string memory about) external{
        organizers[msg.sender]=Organizer(msg.sender,name,about);
    }

/*
* add participant
* @param : name, email
* adds a new Participant to participants
*/
    function addParticipant(string memory name, string memory email)external {
        participants[msg.sender]=Participant(msg.sender,name,email);
    }
 

}
