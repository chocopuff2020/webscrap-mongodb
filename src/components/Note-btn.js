import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';


var NoteBtn = React.createClass({
  getInitialState: function() {
      return({
          textNotes:[]
      })
  },

  handleClick: function() {
    let textNotes = document.getElementById('exampleTextarea').value;
    const articleId = this.props.articleId;
    // console.log(textNotes);
    // e.preventDefault();
    console.log(JSON.stringify(textNotes));
    console.log(JSON.stringify(articleId));

    fetch(`http://localhost:8080/addNotes/${articleId}`, {
        mode:'no-cors',
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(textNotes)
    })
    .then(json => {
          this.setState({
              textNotes: json
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
    // var textNotes = this.state.textNotes;
    // textNotes = textNotes.map((textNotes, idx) =>
    //     (
    //       <Card key={idx} className="single-Article">
    //           <CardText expandable={true}>
    //             {textNotes}
    //           </CardText>
    //       </Card>
    //     )
    // )

    return (
      <div>
          <div className="form-group">
              <textarea className="form-control" id="exampleTextarea" rows="3" className="text-area"></textarea>
          </div>
          <button className="btn btn-primary" onClick={this.handleClick}> Add Notes </button>
      </div>
    )
  }
});


export default NoteBtn;