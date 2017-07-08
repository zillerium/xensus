import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IpfsAPI from 'ipfs-api';

var RTM = require("satori-rtm-sdk");

class App extends Component {

constructor(props) {
    super(props);
    var zIpfsAPI = IpfsAPI('127.0.0.1', '', {protocol: 'http', port: '5001', progress: 'false'})
    this.state = {val: 0, increasing: false, contractJson:[], products:[],IPFSContract:'', IPFSText: '--',
      ETHEREUM_CLIENT: 'a', UserMessage: [], contractAddress: '0x8d3e374e9dfcf7062fe8fc5bd5476b939a99b3ed',
      zIpfsAPIParm: zIpfsAPI}

      this.addIPFSContent = this.addIPFSContent.bind(this)


  }

  addIPFSContent(msg) {
    var s = new Buffer(msg);
    var _this = this;
    this.state.zIpfsAPIParm.add(s, function (err, res){
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

componentWillMount(){

  var _this = this;
  var endpoint = "wss://open-data.api.satori.com";
  var appKey = "EDC25D6EB2CF1916590F186d20461c2D";
  var channel = "US-Bike-Sharing-Channel";

  var client = new RTM(endpoint, appKey);

  client.on('enter-connected', function () {
    console.log('Connected to Satori RTM!');
  });

  var subscription = client.subscribe(channel, RTM.SubscriptionMode.SIMPLE);

  subscription.on('rtm/subscription/data', function (pdu) {
    pdu.body.messages.forEach(function (msg) {
      //console.log('Got message:', msg);

      _this.addIPFSContent(JSON.stringify(msg));
    });
  });

  client.start();

}




  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
