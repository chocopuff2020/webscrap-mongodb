import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
// import SaveButton from './saved-btn'

var ScrapBtn = React.createClass({
  getInitialState: function() {
      return({
          scrappedData:[],
          savedArticles:[]
      })
  },

  handleClick: function(e) {
      e.preventDefault();
      fetch('http://localhost:8080/scrape');
      fetch('http://localhost:8080/all').then(function(data) {
          return data.json();
      }).then(json => {
          console.log(json);
          this.setState({
              scrappedData: json
          });
      });
  },


  handleSaveClick: (data) => (e) => {
    e.preventDefault();
    console.log(JSON.stringify(data));
    fetch('http://localhost:8080/savedArticles', {
        mode:'no-cors',
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(json => {
          this.setState({
              savedArticles: json
          });
    })
    .then(function (result) {
        alert('Successful posted!');
    })
    .catch (function (error) {
        console.log('Request failed', error);
    });
  },



  render() {
    var scrappedData = this.state.scrappedData;
    scrappedData = scrappedData.map((scrappedData, idx) =>
        (
          <Card key={idx} className="single-Article">
              <CardHeader
                title={scrappedData.title}
                subtitle={scrappedData.link}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardActions>
                <FlatButton label="Read More" href={scrappedData.link} />
                <FlatButton label="Save" onClick={this.handleSaveClick(scrappedData)} />
              </CardActions>
              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </CardText>
          </Card>
        )
    )

    return (
      <div>
          <button className="btn btn-danger btn2" onClick={this.handleClick}> Scrape Articles
          </button>
          <ul> {scrappedData} </ul>
      </div>
    );
  }
});

export default ScrapBtn;

