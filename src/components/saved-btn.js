import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';


var SaveButton = React.createClass({
    render() {
       var savedArticles = this.props.savedArticles;
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
    }
});