pragma solidity ^0.4.16;

interface Regulator{
    function checkValue(uint amount) public returns (bool);
}

contract coinBank is Regulator{//Contarct for the buying of coins and songs

    uint private value;
    address private owner;

        modifier ownerFunc{ // Modifier to make sure that only the account that accessed the contract can amke changes to it
        require(owner == msg.sender);
        _;
    }

    function coinBank(uint amount) public{
        value = amount;
        owner = msg.sender;
    }

    function deposit(uint amount) ownerFunc public{
        value += amount;
    }

    function withdraw(uint amount) ownerFunc payable public{
        if(checkValue(amount)){
            value -= amount;
        }
    }

    function coinBalance() ownerFunc public returns (uint){
        return value;
    }

    function checkValue(uint amount) public returns (bool){
        return value >= amount;
    }
}

contract userDetails is coinBank(2){//Creation and storing of the users details
                                    //User starts with 2 coins i.e. 1 free song
    string private userName;
    uint private userID;
    uint private y = 0;
    bytes32 private song;
    bytes32[] private ownedSongs;

    function buySong(bytes32 song) payable{
        ownedSongs[y] = song;
        y++;
        withdraw(2);
    }

    function getOwned() returns (bytes32){
        uint x = 0;
        while(x < ownedSongs.length){
             return ownedSongs[x];
        }
    }

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

/*contract buySong is coinBank(){

    uint private quantity;
    uint private y;
    bytes32 private songName;
    bytes32[] private songs;
    uint public cost;

    function setSong(bytes32 nSName){
        songName = nSName;
    }

    function addToArr(bytes32 songName){
        songs[y] = songName;
    }

    function setQuantity(uint nQuan){
        quantity = nQuan;
    }
    function getSong() returns (bytes32){
        return songName;
    }

    function setCost()public{
        cost = 2;
    }

    function totalCost() internal returns (uint){
        return cost * quantity;
    }

    function buySong() public {
        setCost();
    }
}*/
