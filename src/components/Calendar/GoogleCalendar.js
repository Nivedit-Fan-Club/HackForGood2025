import React, { useEffect, useState } from "react";

let tokenClient;

function initializeTokenClient() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: "YOUR_CLIENT_ID.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/calendar",
    callback: (response) => {
      if (response.error) {
        console.error("Error during token retrieval", response.error);
        return;
      }
      localStorage.setItem("calendarApiToken", response.access_token);
      console.log("Calendar API Token:", response.access_token);
    },
  });
}

function requestCalendarAccess() {
  tokenClient.requestAccessToken({ prompt: "consent" });
}

function GoogleCalendar() {
  useEffect(() => {
    const fetchCalendarEvents = async () => {
      const token = localStorage.getItem("calendarApiToken");

      if (!token) {
        console.error("No token found. Request calendar access first.");
        return;
      }

      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch calendar events:", response.statusText);
        return;
      }

      const events = await response.json();
      console.log("Calendar Events:", events);
    };

  fetchCalendarEvents();
}, []);

  return (
    <div>
      <h2>Google Calendar Events</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.summary}</strong>
            <br />
            {event.start?.dateTime || event.start?.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoogleCalendar;

