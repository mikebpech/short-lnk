import React from 'react';
import { Meteor } from 'meteor/meteor';
import propTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copyButton);
    this.clipboard.on('success', () => {
      this.setState({justCopied: true});
      setTimeout(() => this.setState({justCopied: false}), 1000);
    }).on('error', () => {
      alert('error');
    });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  renderStats() {
    let visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;
    if (typeof this.props.lastVisitedAt === 'number') {
      visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
    }

    return <p>{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
  }
  render() {
    return (
      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        <p>{this.props.visible.toString()}</p>
        {this.renderStats()}
        <a href={this.props.shortUrl} target='_blank'>
          Visit
        </a>
        <button ref='copyButton' data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button ref='hideButton' onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
        }}>
          {this.props.visible ? 'Hide' : 'Hidden'}
        </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  _id: propTypes.string.isRequired,
  url: propTypes.string.isRequired,
  userId: propTypes.string.isRequired,
  shortUrl: propTypes.string.isRequired,
  visible: propTypes.bool.isRequired,
  visitedCount: propTypes.number.isRequired,
  lastVisitedAt: propTypes.number
}