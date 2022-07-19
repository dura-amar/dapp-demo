//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Certificates {
    address public owner;

    /*
     * User may be ISSUER or HOLDER
     */
    enum UserType {
        ISSUER,
        HOLDER
    }

    /*
     * Certificate has issuer, holder, uriAddress
     */
    struct Certificate {
        string uriAddress; // location of the digital certificate in ipfs
        address issuer;
        address holder;
    }

    /*
     * User has userId, userType(ISSUER or HOLDER), certificates
     * for HOLDER: certificates owned
     * for ISSUER: certificates issued
     */
    struct User {
        address userId;
        UserType userType;
        string[] certificates; //uriAddresses
    }

    /*+
     * allUsers holds the data about all the users
     * allCertificates holds the data about the certificates
     */
    mapping(address => User) allUsers;
    mapping(string => Certificate) allCertificates;

    /*
     * User and Certificates must be uniques, i.e. added only once
     */
    modifier onlyNewUser() {
        //logic to check for the new users
        require(
            (abi.encodePacked(allUsers[msg.sender].userId)).length > 0,
            "User Already Registered"
        );
        _;
    }
    modifier onlyNewCertificate(string memory _uriAddress) {
        //logic to check the new certificate
        require(
            (abi.encodePacked(allCertificates[_uriAddress].uriAddress)).length >
                0,
            "Certificate Already Registered"
        );

        _;
    }

    //Event
    event AddUser(address _userAddr, UserType _userType);
    event AddCertificate(string _uriAddress, address _issuer, address _holder);

    constructor() {
        owner = msg.sender;
    }

    /*
     * UserType is needed to create a new user
     *
     */
    function addUser(UserType _userType) external onlyNewUser {
        string[] memory emptyArray;
        allUsers[msg.sender] = User(msg.sender, _userType, emptyArray); // adding new user to the list
        emit AddUser(msg.sender, _userType);
    }

    function addCertificate(
        address _issuer,
        address _holder,
        string memory _uriAddress
    ) public onlyNewCertificate(_uriAddress) {
        allCertificates[_uriAddress] = Certificate(
            _uriAddress,
            _issuer,
            _holder
        );
        allUsers[_holder].certificates.push(_uriAddress); //Add certificate to holder's certificates list
        allUsers[_issuer].certificates.push(_uriAddress); //Add certificate to issuer's certificates list
        emit AddCertificate(_uriAddress, _issuer, _holder);
    }

    function getCertificates() external view returns (string[] memory) {
        return allUsers[msg.sender].certificates;
    }
}
