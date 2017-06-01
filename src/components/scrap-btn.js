import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

// const ScrapBtn = () => (
//   <div>
//     <RaisedButton
//       label="Start Scrapping"
//       labelPosition="before"
//       primary={true}
//       icon={<ActionAndroid />}
//       style={styles.button}
//     />
//     <RaisedButton
//       href="https://github.com/callemall/material-ui"
//       target="_blank"
//       label="Saved articles"
//       secondary={true}
//       style={styles.button}
//       icon={<FontIcon className="muidocs-icon-custom-github" />}
//     />
//   </div>
// );
// export default ScrapBtn;




var ScrapBtn = React.createClass({
    render: function() {
        return <button type="button" onClick={this.onClick} >Start Scrapping</button>
    },

    onClick: function(ev) {
        alert('the button was clicked');
    }
});

export default ScrapBtn;