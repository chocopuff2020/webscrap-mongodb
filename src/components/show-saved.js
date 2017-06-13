import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import NoteBtn from './Note-btn';

var ShowSavedBtn = React.createClass({
  getInitialState: function() {
      return({
          savedArticles:[]
      })
  },

  handleClick: function(e) {
      e.preventDefault();
      // fetch('http://localhost:8080/scrape');
      fetch('http://localhost:8080/savedArticles').then(function(data) {
          return data.json();
      }).then(json => {
          console.log(json);
          this.setState({
              savedArticles: json
          });
      });
  },



  render() {
    var savedArticles = this.state.savedArticles;
    savedArticles = savedArticles.map((savedArticles, idx) =>
        (
          <Card key={idx} id="article" className="single-Article" data-id={savedArticles._id}>
              <CardHeader
                title={savedArticles.title}
                subtitle={savedArticles.link}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardActions>
                <NoteBtn articleId={savedArticles._id} />
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
          <button className="btn btn-success btn1" onClick={this.handleClick}> View Saved</button>
          <ul> {savedArticles} </ul>
      </div>
    );
  }
});


export default ShowSavedBtn;