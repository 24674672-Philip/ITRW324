pragma solidity ^0.4.0;

contract Coin{

    address public minter;

    mapping(address => uint) public balances;

    event Sent(address from, address to, uint amount);

    function Coin(){
        minter = msg.sender;
    }

    function mint(address reciver, uint amount){
        if(msg.sender != minter) return;
        balances[reciver] += amount;
    }

    function send(address reciver, uint amount){
        if(balances[msg.sender]<amount)return;
        balances[msg.sender] -= amount;
        balances[reciver] += amount;
        Sent(msg.sender, reciver, amount);
    }

    function minter() returns (address){
        return minter;
    }

    function balances(address _account) returns (uint){
        return balances[_account];
    }
}
