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

    return <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
  }
  render() {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <a className="button button--link button--pill" href={this.props.shortUrl} target='_blank'>
          Visit
        </a>
        <button className="button button--pill" ref='copyButton' data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button className="button button--pill" ref='hideButton' onClick={() => {
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