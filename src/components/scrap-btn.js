import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class TestComponent extends React.Component{
  render(){
    console.log(this.props)
    return <div/>
  }
}

var ScrapBtn = React.createClass({
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
          </Card>
        )
    })

    return (
      <div>
          <button onClick={this.handleClick}> Click ME!
          </button>
          <ul> {scrappedData} </ul>
      </div>
    );
  }
});

export default ScrapBtn;

// ReactDOM.render(<ScrapBtn />, document.getElementById('results'));