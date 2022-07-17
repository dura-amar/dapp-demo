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
        uint startDate;
        uint endDate;
        string venue;
        string time;
        uint fee;
        address organizer;
        Participant[] participants;
    }

    Workshop[] public workshops;
    mapping(address => Organizer) public organizers;
    mapping(address => Participant) public participants;

    /*
     * Modifiers
     */
    modifier onlyOrganizer() {
        bytes memory name = bytes(organizers[msg.sender].name);
        require(name.length > 0, "You are not registered as organizer.");
        _;
    }
    modifier onlyParticipant() {
        bytes memory name = bytes(participants[msg.sender].name);
        require(name.length > 0, "You are not registered as participant.");
        _;
    }
    modifier requireFree(Workshop memory w){
        require(msg.value>=(w.fee),"Please send enough fee for the workshop.");
        _;
    }

    // Default constructor to set the owner address only
    constructor() {
        owner = msg.sender;
    }

    /*
     * add organizer
     * @param : name, about
     * adds a new Organizer to organizers
     */
    function addOrganizer(string memory _name, string memory _about) external {
        organizers[msg.sender] = Organizer(msg.sender, _name, _about);
    }

    /*
     * add participant
     * @param : name, email
     * adds a new Participant to participants
     */
    function addParticipant(string memory _name, string memory _email)
        external
    {
        participants[msg.sender] = Participant(msg.sender, _name, _email);
    }

    /*
     * add workshop
     * @param : 
            bannerUri,
            title,
            startDate,
            endDate,
            venue,
            time,
            fee
     * adds a new Workshop to workshops
     * called by organizer only
     */

    function addWorshop(
        string memory _bannerUri,
        string memory _title,
        uint _startDate,
        uint _endDate,
        string memory _venue,
        string memory _time,
        uint _fee
    ) external onlyOrganizer {
        // get a reference to the pushed struct
        // then modify the storage instance
        Workshop storage w1 = workshops.push();
        w1.bannerUri = _bannerUri;
        w1.title = _title;
        w1.startDate = _startDate;
        w1.endDate = _endDate;
        w1.venue = _venue;
        w1.time = _time;
        w1.fee = _fee;
        w1.organizer = msg.sender;
    }

    /*
     * Organizer functions
     *
     */

    /*
     * @param : workshopIndex
     * Returns list of participants for the workshop
     */
    function getParticipants(uint _workshopIndex)
        external
        view
        onlyOrganizer
        returns (Participant[] memory)
    {
        Workshop memory w1 = workshops[_workshopIndex];
        return w1.participants;
    }

    function getMyWorkshops() external view returns (Workshop[] memory) {
        uint len = workshops.length;
        Workshop[] memory ws = new Workshop[](len);
        uint i = 0;
        uint wi = 0;
        for (i; i < len; i++) {
            if (workshops[i].organizer == msg.sender) {
                ws[wi] = workshops[i];
                wi++;
            }
        }
        return ws;
    }

    // TODO : organizer sendCertificates

    /*
     * Participants functions
     */

    /*
     * returns all the current workshops
     */
    function getCurrentWorkshops()
        external
        view
        onlyParticipant
        returns (Workshop[] memory)
    {
        uint len = workshops.length;
        Workshop[] memory ws = new Workshop[](len);
        uint i = 0;
        uint wi = 0;
        for (i; i < len; i++) {
            if (workshops[i].endDate < block.timestamp) {
                ws[wi] = workshops[i];
                wi++;
            }
        }
        return ws;
    }

    /*
     * register for workshop
     * @param: _workshopIndex
     *
     */

    function registerForWorkshop(uint _workshopIndex) external onlyParticipant requireFree(workshops[_workshopIndex]) payable{
        //check values

        Workshop memory w1 = workshops[_workshopIndex];
        uint pLen = w1.participants.length;
        workshops[_workshopIndex].participants[pLen] = (
            participants[msg.sender]
        );
    }
    //TODO : request for certificate
}
