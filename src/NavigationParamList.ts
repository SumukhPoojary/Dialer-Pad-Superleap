/**
 * A record of the navigation params for each route in your app.
 */
export type MainStackParamList = {
  Dialer: {};
  CallHistory: {};
  Contacts: {};
  ContactDetails: {
    contactId?: string;
  };
};