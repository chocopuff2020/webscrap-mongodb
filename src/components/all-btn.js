import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';


var ScrapBtn = React.createClass({
  getInitialState: function() {
      return({
          scrappedData:[]
      })
  },

  handleClick: function(e) {
      e.preventDefault();
      fetch('http://localhost:8080/all').then(function(data) {
          return data.json();
      }).then(json => {
          console.log(json);
          this.setState({
              scrappedData: json
          });
      })
  },

  render() {
    var scrappedData = this.state.scrappedData;
    console.log(scrappedData[0]);
    scrappedData = scrappedData.map(function(scrappedData) {
        return(
          <Card className="single-Article">
              <CardHeader
                title={scrappedData.title}
                subtitle={scrappedData.link}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardActions>
                <FlatButton label="Read More" />
                <FlatButton label="Save" />
              </CardActions>
              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. 
              </CardText>
          </Card>
        )
    })

    return (
      <div>
          <button className="btn btn-danger" onClick={this.handleClick}> All Articles!
          </button>
          <ul> {scrappedData} </ul>
      </div>
    );
  }
});

export default ScrapBtn;

