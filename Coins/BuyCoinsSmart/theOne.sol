pragma solidity ^0.4.11;

interface Regulator{
    function checkValue(uint amount) returns (bool);
}

contract coinBank is Regulator{//Contarct for the buying of coins and songs

    uint private value;
    address private owner;

        modifier ownerFunc{ // Modifier to make sure that only the account that accessed the contract can amke changes to it
        require(owner == msg.sender);
        _;
    }

    function coinBank(uint amount){
        value = amount;
        owner = msg.sender;
    }

    function deposit(uint amount) ownerFunc{
        value += amount;
    }

    function withdraw(uint amount) ownerFunc{
        if(checkValue(amount)){
            value -= amount;
        }
    }

    function coinBalance() ownerFunc returns (uint){
        return value;
    }

    function checkValue(uint amount) returns (bool){
        return value >= amount;
    }
}

contract userDetails is coinBank(2){//Creation and storing of the users details
                                    //User starts with 2 coins i.e. 1 free song
    string private userName;
    uint private userID;

    function setName(string nName){
        userName = nName;
    }

    function getName() returns (string){
        return userName;
    }

    function setID(uint nID){
        userID = nID;
    }

    function getID() returns (uint){
        return userID;
    }
}

contract buySong is coinBank(0){

    uint private quantity;
    //uint private x;
    uint public cost;
     // bytes32 private songName;
    //bytes32[] public ownedSongs;


    /*function setSongName(bytes32 nSong){
        songName = nSong;
        addToArray(songName);
    }

    function addToArray(bytes32 addSongName){
        ownedSongs[x] = addSongName;
        x++;
    }

    function getArray() returns (bytes32)
    {
        uint y;
        while(y < ownedSongs.length)
        {
           return ownedSongs[y];
           y++;
        }

    }*/

    function setQuantity(uint nQuan){
        quantity = nQuan;
    }

    function setCost(){
        cost = 2;
    }

    function totalCost() returns (uint){
        return cost * quantity;
    }

    function confirm(){
            withdraw(totalCost());
    }

    function buySong(){
        setCost();
    }
}

contract testThrows{

    function testAssert(){
        assert(false);
    }

    function testRequire(){
        require(false);
    }

    function testRevert(){
        revert();
    }

    function testThrows(){
        throw;
    }
}
