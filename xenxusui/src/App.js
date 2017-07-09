
import React, {Component} from 'react';
import Logo from './logo.png';
import './App.css';
import Web3 from 'web3'
import _ from 'lodash'
import {Navbar, Jumbotron, Button, Image, PageHeader, Form, FormGroup, Pager, ControlLabel} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import IpfsAPI from 'ipfs-api'

var RTM = require("satori-rtm-sdk");
var axios = require('axios')


class App extends Component {

  constructor(props) {
    super(props);
    var zIpfsAPI = IpfsAPI('127.0.0.1', '', {protocol: 'http', port: '5001', progress: 'false'})
    this.state = {val: 0, processingMessage:'', increasing: false, contractJson:[], products:[],IPFSContract:'', IPFSText: '--',
      ETHEREUM_CLIENT: 'a', UserMessage: [], contractAddress: '0x8d3e374e9dfcf7062fe8fc5bd5476b939a99b3ed',
      zIpfsAPIParm: zIpfsAPI, ZsendAddress:'0xd73e172751e751d274037cb1f668eb637df55e33',ZsendContract:''}
// 0x9cceb4e507b6c498c66e812328c348e7f6a61c88 new
// 0x8d3e374e9dfcf7062fe8fc5bd5476b939a99b3ed old
// 0x32107dd216bd2b3a5f9e403a7f9f70a895ef749c
    this.reformatArray = this.reformatArray.bind(this)
    this.reformatArrayEnd = this.reformatArrayEnd.bind(this)
    this.addIPFSContent = this.addIPFSContent.bind(this)
    this.makeAPIData = this.makeAPIData.bind(this)
    this.callthis = this.callthis.bind(this)
  this.zsendPayment = this.zsendPayment.bind(this)
  }

  setClient = ( ) => {
    console.log("props", this)
  //  this.setState({ ETHEREUM_CLIENT: info });
  }

zsendPayment() {

var from = "0x48884f1f259a4fdbb22b77b56bfd486fe7784304"
var to = "0x5b4e07bab9b0ec67076a670681cab7c344678ff8"

    var success = this.state.ZsendContract.send(to, 1);
    console.log("success", success);
}

  addIPFSContentSuper(msg) {
    var s = new Buffer(msg);
    var _this = this;
          console.log("calling ipfs insert func");
    this.state.zIpfsAPIParm.add(s, function (err, res){
            console.log("hello");
            if(err || !res) return console.error("ipfs add error", err, res);
            else{
  //                console.log("no issue"ipfsAdd);
                  console.log(res);
              res.forEach(function(text) {
                     console.log('successfully stored', text.hash);
                   //  console.log('successfully stored', text.path);
                   //  display(file.Hash);
                      var textaddress=text.hash;
                      console.log(textaddress);
                      var IPFS1 = textaddress.substring(0,32);
                      var IPFS2 = textaddress.substring(32,textaddress.length);
                      _this.state.IPFSContract.addIpfs(IPFS1, IPFS2);
              });
            }
          });

  }

addIPFSContent(e) {
  let inputStr = this.refs.b.value;
  var s = new Buffer(inputStr);
  var _this = this;
  _this.state.zIpfsAPIParm.add(s, function (err, res){
          console.log("hello");
          if(err || !res) return console.error("ipfs add error", err, res);
          else{
//                console.log("no issue"ipfsAdd);
//                console.log(res);
            res.forEach(function(text) {
                   console.log('successfully stored', text.hash);
                 //  console.log('successfully stored', text.path);
                 //  display(file.Hash);
                    var textaddress=text.hash;
                    console.log(textaddress);
                    var IPFS1 = textaddress.substring(0,32);
                    var IPFS2 = textaddress.substring(32,textaddress.length);
                    _this.state.IPFSContract.addIpfs(IPFS1, IPFS2);
            });
          }
        });

}

componentWillMount() {
  console.log('componentWillMount');

  var appKey = "EDC25D6EB2CF1916590F186d20461c2D";
  var channel = "US-Bike-Sharing-Channel";
  var endpoint = "wss://open-data.api.satori.com";

  var client = new RTM(endpoint, appKey);

this.setState({client: client, channel: channel});

  let localJsonABI = [ { "constant": true, "inputs": [], "name": "getIpfsData", "outputs": [ { "name": "", "type": "bytes32[]" }, { "name": "", "type": "bytes32[]" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_addr1", "type": "bytes32" }, { "name": "_addr2", "type": "bytes32" } ], "name": "addIpfs", "outputs": [ { "name": "success", "type": "bool" } ], "payable": true, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "ipfsrecs", "outputs": [ { "name": "addr1", "type": "bytes32" }, { "name": "addr2", "type": "bytes32" } ], "payable": false, "type": "function" } ]
  this.setState({contractJson: localJsonABI})
//  let w = new Web3(new Web3.providers.HttpProvider("http://178.62.81.42:8545"))
 let w = new Web3(new Web3.providers.HttpProvider("http://104.236.58.158:8545"))
//  let w = new Web3(new Web3.providers.HttpProvider("http://104.236.58.158:8545"))
  this.setState({ETHEREUM_CLIENT: w});
//  this.setClient = this.setClient.bind(this);


  let IPFSContractLocal = w.eth.contract(localJsonABI).at(this.state.contractAddress)
  this.setState({IPFSContract: IPFSContractLocal})

let ZsendABI=   [ { "constant": true, "inputs": [], "name": "minter", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balances", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "receiver", "type": "address" }, { "name": "amount", "type": "uint256" } ], "name": "mint", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "amount", "type": "uint256" } ], "name": "makepayment", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "receiver", "type": "address" }, { "name": "amount", "type": "uint256" } ], "name": "send", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Sent", "type": "event" } ]


  let ZsendLocal = w.eth.contract(ZsendABI).at(this.state.ZsendAddress)
  this.setState({ZsendContract: ZsendLocal})

w.eth.defaultAccount = w.eth.coinbase;

var _this = this;



//  this.state.ETHEREUM_CLIENT.eth.defaultAccount = this.state.ETHEREUM_CLIENT.eth.coinbase;
  let ipfsBCData = IPFSContractLocal.getIpfsData();
  var ipfs1 = String(ipfsBCData[0]).split(',')
  var ipfs2 = String(ipfsBCData[1]).split(',')
  var ipfsAddressLocalArray = [];
  for (var i = 0; i < ipfs1.length; i++) {
      var aIPDFDataRecHex = ipfs1[i]
      var addr1 = this.reformatArray(aIPDFDataRecHex)
      aIPDFDataRecHex = ipfs2[i]
      var addr2 = this.reformatArrayEnd(aIPDFDataRecHex)
      ipfsAddressLocalArray[i] = addr1+addr2;
  }
       var _this = this;
       let reviewArray =[];
       let reviewAddr = [];
       let reviewText=[];
       let j=-1;
       for (var i = 0; i < ipfsAddressLocalArray.length; i++) {

            let fulladdr = ipfsAddressLocalArray[i];
            console.log('ipfs address ', fulladdr)
             let url = "http://ipfs.io/api/v0/cat?arg="+fulladdr;
             console.log("url ", url)
             axios
             .get(url)
             .then(function(result) {
                 j++;
               console.log('file ', result.data)
               reviewArray.push(j);
               reviewAddr.push(fulladdr);
               reviewText.push(result.data);
               var bidValue= 1;
               _this.setState({
                               products:  _this.state.products.concat({
                               'reviewIndex': j,
                                 'ipfsAddr': fulladdr,
                              'ipfsText': JSON.stringify(result.data),
                              'ipfsBid': bidValue
                            })
                        })

               })

               .catch(function (error) {
                   console.log(error);
               });

       }
}

reformatArray(strVal) {
  strVal = strVal.replace('0x', '');
  strVal = strVal.replace('00', '');
  var hex = strVal.toString();
  var aIPDFDataRec = '';
  for (var n = 0; n < hex.length; n += 2) {
      aIPDFDataRec += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
    return aIPDFDataRec;
}

reformatArrayEnd(strVal) {
  strVal = strVal.replace('0x', '');
  strVal = strVal.replace(/00/g, '');
  var hex = strVal.toString();
  var aIPDFDataRec = '';
  for (var n = 0; n < hex.length; n += 2) {
      aIPDFDataRec += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return aIPDFDataRec;
}


makeAPIData() {
this.setState({processingMessage: "We are processing your request"})
var client = this.state.client;
var channel = this.state.channel;
var _SELF = this;
client.on('enter-connected', function () {
    console.log('Connected to Satori RTM!');
  });

 var subscription = client.subscribe(channel, RTM.SubscriptionMode.SIMPLE, {
   history: { count: 10 },
 });


 var temp = undefined;

 subscription.on('rtm/subscription/data', function (pdu) {
   pdu.body.messages.forEach(function (msg) {
     //console.log('Got message:', msg);
   });
 if(temp == undefined) {

   temp = pdu.body.messages;
   console.log(temp, "something");

    _SELF.callthis(temp);
 }

 });


 client.start();

 setTimeout(function() {
   console.log(temp, "PRINTED HERE");


 }, 1000);




}

callthis(temp) {
  console.log(temp, "here is it" );
this.addIPFSContentSuper(JSON.stringify(temp))
//this.zsendPayment()
    //    console.log("self ", _SELF);
}

addAddress() {
  var IPFSAddress = document.getElementById("NewIPFSAddress").value;
  document.getElementById("NewIPFSAddress").value = "";
  var IPFS1 = "";
  var IPFS2 = "";
  var err = 0;
  if (IPFSAddress.length>31) {
    if (IPFSAddress.length>63) {
      var aMessage = this.state.UserMessage.slice();
      aMessage.push('Error - string too long - max is 32 chars')
      this.setState({UserMessage:aMessage});
      var err =1;
    } else {
      IPFS1 = IPFSAddress.substring(0,32);
      IPFS2 = IPFSAddress.substring(32,IPFSAddress.length);
    }
  } else {
    IPFS2 = "";
  }
  if (err==0) {
    this.state.IPFSContract.addIpfs(IPFS1, IPFS2);
    var aMessage = this.state.UserMessage.slice();
    aMessage.push('Your IPFS ADDRESS will be added in a few minutes to the blockchain - please refresh then')
    this.setState({UserMessage:aMessage});
}



  //reviewContract.addReview("company12", "trevor lee oakley", 1)
}


render() {

  var ShowMessage = [];
  this.state.UserMessage.forEach((item, i) => {
         ShowMessage.push(<p className = "jenbil-warn">{item}</p>);
     });
     const pageHeaderInstance = (
  <PageHeader>XENXUS - IOT Data Marketplace</PageHeader>
);
     const thumbnailInstance = (


         <Image href="#" width="150" height="150" alt="171x180" src="https://s12.postimg.org/mhx4rq98t/logo.png" responsive/>


     );

     const formInstance = (
  <Form inline>
    <FormGroup controlId="formInlineName">
      <ControlLabel>{thumbnailInstance}</ControlLabel>

    </FormGroup>

    <FormGroup controlId="formInlineEmail">
      <ControlLabel  >
      <Pager>
    <Pager.Item >{pageHeaderInstance}</Pager.Item>

  </Pager>

      </ControlLabel>

    </FormGroup>

  </Form>
);
    return (
        <div>

      {formInstance}







              <button type="button" className="btn" onClick={() => this.makeAPIData()}>Get Data</button>
 <PageHeader><small>{this.state.processingMessage}</small></PageHeader>


            <BootstrapTable data={this.state.products} striped={true} hover={true}>
                <TableHeaderColumn width="50"   dataField="reviewIndex" isKey={true} dataAlign="center" dataSort={true}>ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="ipfsAddr" dataAlign="center" dataSort={true}>Ipfs
                    Address</TableHeaderColumn>
                <TableHeaderColumn width="600" dataField="ipfsText" dataAlign="center" dataSort={true}>Ipfs
                    Text</TableHeaderColumn>
                    <TableHeaderColumn width="50" dataField="ipfsBid" dataAlign="center" dataSort={true}>Bid
                        Text</TableHeaderColumn>
            </BootstrapTable>
        </div>
    );
}
}




export default App;
