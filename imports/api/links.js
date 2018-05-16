import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Links.find({ userId: this.userId });
  });
}

//Naming Conventions for Methods
  //resource.action
  //emails.archive
  //links.insert
Meteor.methods({
  //Insert new URL
  'links.insert'(url) {
    //Check if user is logged in.
    if (!this.userId) {
      throw new Meteor.Error('unauthorized', 'User not logged in!');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url });

    //Insert link with params of URL, userId, ID
    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    });
  },

  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized', 'User not logged in!');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible });

    Links.update({_id, userId: this.userId}, { $set: {visible}});
  },

  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Links.update({_id}, { $set: {lastVisitedAt: new Date().getTime()}, $inc: {visitedCount: 1}})
  }


});