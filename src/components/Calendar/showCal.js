import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';

function ShowCal() {
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user?.email) {
            const iframe = document.getElementById('calendarEmbed');
            const blocker = document.getElementById('calendarEmbedBlocker');

            iframe.src = `https://calendar.google.com/calendar/embed?src=${encodeURI(user.email)}`;
            blocker.style.display = 'none';
        }
    }, [user]);

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