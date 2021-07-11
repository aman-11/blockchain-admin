import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Containers/Login/Login.js';
import Signin from './Containers/Signin/Signin.js';
import Request from './Containers/Request/Request';
import StoryPost from './Containers/Dashboard/Content/StoryPost/StoryPost';
import Navbar from './Containers/Navbar/Navbar';
import Home from './Containers/Home/Home';
import Dashboard from './Containers/Dashboard/Dashboard';
import ShowRequest from './Containers/Dashboard/Content/Request/ShowRequest'
import PeopleTrans from './Containers/Dashboard/Content/PeopleTransaction/PeopleTrans'
import CampaignStatus from './Containers/Dashboard/Content/CampaignStatus/CampaignStatus.js';
import Web3 from 'web3'
import CrowdSource from './abis/CrowdSource.json'
//import { SendMail } from './Actions/Mail'
import { API } from './Api/Api'

//const key = "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";

class App extends React.Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }


  async loadWeb3() {
    if (window.ethereum) {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable()
    }
    else {
      alert("Please install MetaMask to use this dApp!");
    }
  }


  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = CrowdSource.networks[networkId]
    if (networkData) {
      try {
        this.setState({ load: true })
        const crowdSource = new web3.eth.Contract(CrowdSource.abi, networkData.address)
        this.setState({ contract: crowdSource })
        const adminBal = await crowdSource.methods.adminBalance().call()
        this.setState({ adminBal: adminBal })

        //get all transcation of people
        const donationCount = await crowdSource.methods.count().call()
        this.setState({ donationCount: donationCount })
        let result = []
        for (let i = 1; i <= donationCount; i++) {
          let transfer = await this.state.contract.methods.donations(i).call()
          if (transfer.recipient === "Admin") {
            result = [...result, transfer]
          }
        }
        this.setState({ transfers: result })
        this.setState({ load: false })

        this.setState({ load: true })
        //get the campaigns
        const campCount = await crowdSource.methods.CampCount().call()
        this.setState({ campCount: campCount })
        //let campResult = []
        for (let i = 1; i <= campCount; i++) {
          let camp = await crowdSource.methods.campaigns(i).call()
          this.setState({ camps: [...this.state.camps, camp] })
        }

        //console.log(this.state.transfers[0]['sender'])
        this.setState({ load: false })

      } catch (error) {
        console.log(error)
      }
    } else {
      alert('Contract not deployed to this network')
    }

  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      load: true,
      contract: '',
      adminBal: 0,
      donationCount: 0,
      transfers: [],
      campCount: 0,
      camps: []
    }
    this.createCampaign = this.createCampaign.bind(this)
    this.setTransaction = this.setTransaction.bind(this)
  }

  async createCampaign(_campName, _totalAmount) {
    this.setState({ load: true })
    await this.state.contract.methods.setCampaign(_campName, _totalAmount).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ load: false })
      })
  }

  async setTransaction(amount, _campId, recipient, to) {
    //get emails
    const emailResult = []
    for (let i in this.state.transfers) {
      if (this.state.transfers[i]['campId'] && (this.state.transfers[i]['campId']) === _campId)
        emailResult[i] = this.state.transfers[i]['sender']
    }
    var filtered = emailResult.filter(function (x) {
      return x !== '';
    });
    const jsonTransfers = filtered.map(JSON.stringify);
    const uniqueTransferSender = new Set(jsonTransfers);
    const Emails = Array.from(uniqueTransferSender).map(JSON.parse);

    this.setState({ load: true })
    await this.state.contract.methods.setTransaction(amount, _campId, "Admin", recipient, "xxxxxxxx@ybl", to).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ load: false })
      })

    // console.log(this.state.camps[0].campName)
    const campName = this.state.camps[_campId - 1].campName
    const FormData = { Emails, campName, amount, to }
    API.post('/sendMail', FormData)

  }


  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/request" exact component={Request} />
            <Route path="/storypost" exact>
              <StoryPost
                createCampaign={this.createCampaign}
                load={this.state.load}
              />
            </Route>
            <Route path="/dashboard" exact>
              <Dashboard adminBal={this.state.adminBal} />
            </Route>
            <Route path="/showReq" exact component={ShowRequest} />
            <Route path="/peopleTransfers" exact>
              <PeopleTrans
                transfers={this.state.transfers}
                camps={this.state.camps}
                load={this.state.load}
              />
            </Route>
            <Route path="/campStatus" exact>
              <CampaignStatus
                camps={this.state.camps}
                load={this.state.load}
                setTransaction={this.setTransaction}
              />
            </Route>
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
