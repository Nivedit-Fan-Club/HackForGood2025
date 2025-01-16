import React, { useContext, useEffect } from 'react';

function ShowCal() {
    const userEmail = localStorage.getItem('userEmail')

    useEffect(() => {
        if (userEmail) {
            const iframe = document.getElementById('calendarEmbed');
            const blocker = document.getElementById('calendarEmbedBlocker');

            iframe.src = `https://calendar.google.com/calendar/embed?src=${encodeURI(userEmail)}`;
            blocker.style.display = 'none';
        }
    }, [userEmail]);

    return (
        <div id="calendarEmbedWrapper">
            <iframe
                id="calendarEmbed"
                title="Google Calendar"
                style={{ border: 0 }}
                width="800"
                height="600"
            />
            <div id="calendarEmbedBlocker">
                <p>Loading calendar...</p>
            </div>
        </div>
    );
}

export default ShowCal;
