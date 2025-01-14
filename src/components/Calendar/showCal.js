function showCal(){
    var iframe = document.getElementById('calendarEmbed');
    var email = document.getElementById('email').value;
    var blocker = document.getElementById('calendarEmbedBlocker');
    if (email && /.+\@.+/.test(email)){
        iframe.src = 'https://calendar.google.com/calendar/embed?src=' + encodeURI(email);
        blocker.style.display = 'none';
    }
    else {
        alert("That doesn't look like a valid email...");
        blocker.style.display = 'block';
    }
    return(
    <div id="calendarEmbedWrapper">
    <iframe id="calendarEmbed"></iframe>
    <div id="calendarEmbedBlocker">
        <p>Please enter email and click load</p>
    </div>
    </div>)
}

