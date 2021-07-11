//SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract CrowdSource{   
  uint public adminBalance=0;
  uint public count=0;
  uint public CampCount=0;
  address public owner;
  string adminCredential = "xxxxxxxxxx@ybl";

  constructor() public {
    owner=msg.sender; 
  }

  mapping(uint => Donation) public donations;
  struct Donation{
    uint donationId;
    uint amount;
    uint campId;
    string sender;        
    string recipient;    
    string from;
    string to;
  }
  
  mapping(uint => Campaign) public campaigns;
  struct Campaign{
    uint campId;
    string campName;
    uint totalAmount;
    uint currentAmount;
    bool target;
    bool completed;
  }

 //["kerela","Mum","kar"]
 //1 2 3
  event campaignCreated(
    uint campId,
    string campName,
    uint totalAmount,
    uint currentAmount,
    bool target,
    bool completed
  );

  event transactionDone(
    uint donationId,
    uint amount,
    uint campId,
    string sender,        
    string recipient ,
    string from,
    string to
    );

  function setTransaction(uint _amount, uint _campId, string memory _sender, string memory _recipient, string memory _from, string memory _to ) public { 
  count+=1;
  address _senderId = msg.sender;
  if((owner == _senderId) && (campaigns[_campId].completed==false)){
    //A -> C
    uint amnt=campaigns[_campId].currentAmount;
    require(amnt == _amount);
    donations[count]=Donation(count, amnt, _campId, _sender, _recipient, adminCredential , _to);
    adminBalance -= _amount;
    campaigns[_campId].completed=true;
    emit transactionDone(count, _amount, _campId , _sender, _recipient,  adminCredential , _to);
 }else{
   //U -> A
    require(_amount>0);
    require(_amount<=(campaigns[_campId].totalAmount-campaigns[_campId].currentAmount));
    donations[count]=Donation(count, _amount, _campId , _sender, _recipient, _from, adminCredential); 
    adminBalance += _amount;
    campaigns[_campId].currentAmount+=_amount;

    if(campaigns[_campId].currentAmount == campaigns[_campId].totalAmount){
      campaigns[_campId].target = true;
    }
    emit transactionDone(count, _amount, _campId , _sender, _recipient, _from, adminCredential);
    }
  }


  function setCampaign(string memory _campName, uint _totalAmount) public {
      require(msg.sender == owner);
      CampCount = CampCount + 1;
      campaigns[CampCount]=Campaign(CampCount, _campName, _totalAmount, 0, false, false);
      emit campaignCreated(CampCount, _campName, _totalAmount, 0, false, false);
  }
  
}



//inst =await CrowdSource.deployed()
//await inst.setCampaign("kerala",40000)
//await inst.setTransaction(40000,1,"nabhan","derryl","xyyUPI","sdfkf",{from:'0x9eCc133D59903b605752f31B9e21d13DDC1C9168'})
//await inst.setTransaction(40000,1,"derryl","keralaCamp","xxxyUPI","sdfkf@UPI")
//await inst.campaigns(1)