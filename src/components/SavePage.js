import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';


var SaveButton = React.createClass({
    getInitialState: function() {
      return({
          savedArticles:[]
      })
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
       var savedArticles = this.savedArticles;
       savedArticles = savedArticles.map((savedArticles, idx) =>
          (
          <Card key={idx} className="single-Article">
              <CardHeader
                title={savedArticles.title}
                subtitle={savedArticles.link}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardActions>
                <FlatButton label="Read More" href={savedArticles.link} />
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
          <button className="btn btn-success"> Scrape Articles </button>
          <ul> {savedArticles} </ul>
      </div>
    );
    }
});