/**
 * * Visibility
 * ? Rethink
 * ! Important
 * TODO to do
 **/
// Format times as minutes and seconds.
var timeFormat = function (secs) {
    if (secs == undefined || isNaN(secs)) {
        return '0:00';
    }
    secs = Math.round(secs);
    var mins = '' + Math.floor(secs / 60);
    secs = '' + (secs % 60);
    if (secs.length < 2) {
        secs = '0' + secs;
    }
    return mins + ':' + secs;
}

// Open the sidenav
function openNav() {
    $('#more-panel').css({
        'height': '100%'
    });
    $('#moreButton').addClass('hidden');
    $('#nomoreButton').removeClass('hidden');
}

// Close/hide the botnav
function closeNav() {
    $('#more-panel').css({
        'height': '0'
    });
    $('#moreButton').removeClass('hidden');
    $('#nomoreButton').addClass('hidden');
}


// jQuery extension encapsulating event hookups for audio element controls.
$.fn.player = function (debug) {
    // Selected element should contain an HTML5 Audio element.
    var audio = $('audio', this).get(0);

    // Control elements that may be present, identified by class.
    var playBtn = $('#btnPlay', this);
    var pauseBtn = $('#btnPause', this);
    // Extra buttons 
    var previousBtn = $('#btnPrevious', this);
    var nextBtn = $('#btnNext', this);


    var disabledInd = $('.disabled', this);
    var timesEl = $('.times', this);
    var curTimeEl = $('.currentTime', this);
    var totalTimeEl = $('.totalTime', this);
    var sliderPlayedEl = $('.slider .played', this);
    var sliderLoadedEl = $('.slider .loaded', this);

    //* Volume Slider
    var sliderVolume = player.querySelector('#volumeSlider')
    sliderVolume.addEventListener('change', volumeChange, false);

    /** So volume changes
     * ? maybe consider another event to process the request during
     */
    function volumeChange() {
        audio.volume = sliderVolume.value;
    }

    //*Seek Slider
    var sliderSeek = player.querySelector('#seekSlider')
    // console.log(sliderSeek);
    // var sliderSeekAlt = $('#seekSlider');
    // console.log(sliderSeekAlt);

    // Button events.
    playBtn.click(function () {
        audio.play();
    });
    pauseBtn.click(function (ev) {
        audio.pause();
    });



    //* Seek Slider
    /** 
     * set slider to cap at the song end
     **/
    function sliderSetMax() {
        sliderSeek.max = audio.duration;
    }

    /**
     * So slider moves with music
     */
    function sliderUpdate() {
        sliderSeek.value = audio.currentTime
    }

    /**
     * Slider resets, for song change ..etc
     */
    function sliderReset() {
        sliderSeek.value = 0;
    }

    /**
     * User has started seek process but not release
     */
    function sliderChange() {
        //Variable to stop instant paly
        audioIsPaused = audio.paused;
        // Pause while it evaluates the times
        audio.pause();
        // audio time to slider time
        audio.currentTime = sliderSeek.value
    }

    /**
     * Released, make the change
     */
    function sliderReleased() {
        // Start playing again based on if it was already playing
        if (!audioIsPaused) {
            audio.play();
        }
    }

    // TODOS
    // Fix seeker
    // Audio range bar too quick

    // Utilities.
    var timePercent = function (cur, total) {
        if (cur == undefined || isNaN(cur) ||
            total == undefined || isNaN(total) || total == 0) {
            return 0;
        }
        var ratio = cur / total;
        if (ratio > 1.0) {
            ratio = 1.0;
        }
        return (Math.round(ratio * 10000) / 100) + '%';
    }

    // Event helpers.
    var dbg = function (msg) {
        if (debug)
            console.log(msg);
    }
    var showState = function () {
        if (audio.duration == undefined || isNaN(audio.duration)) {
            playBtn.hide();
            pauseBtn.hide();
            disabledInd.show();
            timesEl.hide();
        } else if (audio.paused) {
            playBtn.show();
            pauseBtn.hide();
            disabledInd.hide();
            timesEl.show();
        } else {
            playBtn.hide();
            pauseBtn.show();
            // disabledInd.hide();
            timesEl.show();
        }
    }
    var showTimes = function () {
        curTimeEl.text(timeFormat(audio.currentTime));
        totalTimeEl.text(timeFormat(audio.duration));

        sliderPlayedEl.css('width',
            timePercent(audio.currentTime, audio.duration));

        // last time buffered
        var bufferEnd = 0;
        for (var i = 0; i < audio.buffered.length; ++i) {
            if (audio.buffered.end(i) > bufferEnd)
                bufferEnd = audio.buffered.end(i);
        }
        sliderLoadedEl.css('width',
            timePercent(bufferEnd, audio.duration));
    }

    // Initialize controls.
    showState();
    showTimes();


    $('audio', this).bind({
        playing: function () {
            dbg('playing');
            showState();
        },
        pause: function () {
            dbg('pause');
            showState();
        },
        ended: function () {
            dbg('ended');
            showState();
        },
        progress: function () {
            dbg('progress ' + audio.buffered);
        },
        timeupdate: function () {
            dbg('timeupdate ' + audio.currentTime);
            showTimes();
        },
        durationchange: function () {
            dbg('durationchange ' + audio.duration);
            showState();
            showTimes();
        },
        loadeddata: function () {
            dbg('loadeddata');
        },
        loadedmetadata: function () {
            dbg('loadedmetadata');
        }
    });
}



// Simple selection disable for jQuery.
// Cut-and-paste from:
// http://stackoverflow.com/questions/2700000
$.fn.disableSelection = function () {
    $(this).attr('unselectable', 'on')
        .css('-moz-user-select', 'none')
        .each(function () {
            this.onselectstart = function () {
                return false;
            };
        });
};

$(function () {
    // Disable selection on UI elements.
    $('#library').disableSelection();
    $('#header').disableSelection();

    //! Audio player setup.
    $('#player').player();
});