import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true
    }
  }
  componentDidMount() {
    this.filterTracker = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible')
      });
    });
  }
  componentWillUnmount() {
    this.filterTracker.stop();
  }
  render() {
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
            if (e.target.checked) {
              Session.set('showVisible', false);
            } else {
              Session.set('showVisible', true);
            }
          }}/>
          show hidden links
        </label>
      </div>
    );
  }
}