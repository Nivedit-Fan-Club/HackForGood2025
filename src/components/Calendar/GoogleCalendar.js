import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';

function GoogleCalendar() {
  const { user } = useContext(UserContext);
  const gapi = window.gapi;

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  useEffect(() => {
    if (user?.googleId) {
      initializeGapi();
    }
  }, [user]);

  const initializeGapi = () => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      gapi.client.load('calendar', 'v3');
    });
  };

  const handleClick = async () => {
    if (!user?.googleId) {
      console.error('No Google account ID found');
      return;
    }

    try {
      const authInstance = gapi.auth2.getAuthInstance();
      await authInstance.signIn();

      const event = {
        'summary': 'Awesome Event!',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'Really great refreshments',
        'start': {
          'dateTime': '2020-06-28T09:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'end': {
          'dateTime': '2020-06-28T17:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'recurrence': [
          'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
          { 'email': user.email }
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            { 'method': 'email', 'minutes': 24 * 60 },
            { 'method': 'popup', 'minutes': 10 }
          ]
        }
      };

      const request = await gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event,
      });

      window.open(request.result.htmlLink);
    } catch (error) {
      console.error('Calendar event creation failed:', error);
    }
  };

  return (
    <div className="App">
      <button
        style={{ width: 100, height: 50 }}
        onClick={handleClick}
        disabled={!user?.googleId}
      >
        Add Event
      </button>
    </div>
  );
}

export default GoogleCalendar;