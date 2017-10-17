pragma solidity ^0.4.0;

contract Coin{

    address public minter;

    mapping(address => uint) public balances;

    event Sent(address from, address to, uint amount);

    /*Coin.Sent().Watch({},''. function(error,result){
        if(!error){
          console.log("Coin Transfer: " + result.args.amount + " coins were sent from " + result.args.from + " to " + result.args.to + ".");
          console.log("New Balances:\n" + "Sender: " + Coin.balances.call(result.args.from) + "\nReceiver: " + Coin.balances.call(result.args.to));
        }
      })*/

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
