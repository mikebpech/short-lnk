import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  
  Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;

    //Validate if email is valid email.
    try {
      new SimpleSchema({
        email: {
          type: String,
          regEx: SimpleSchema.RegEx.Email
        }
      }).validate({ email });
    } catch (e) {
      throw new Meteor.Error(400, e.message);
    }

    return true;
  });

  // const employeeSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200
  //   },
  //   hourlyWage : {
  //     type: Number,
  //     min: 1
  //   },
  //   email : {
  //     type: String,
  //     regEx: SimpleSchema.RegEx.Email
  //   }
  // });

  // employeeSchema.validate({
  //   name: 'michael pechousek',
  //   hourlyWage: 17,
  //   email: 'mike@lolzz.ca'
  // });

});
