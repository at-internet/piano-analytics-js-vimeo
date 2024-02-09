class paVimeoPlayer {

    constructor() {
        this.paCustomParams = {}
    }

    set params(params) {
        this.paCustomParams = params
    }

    set media(media) {
        this.videoMedia = media
    }

    avInitTag = (data) => {
        if (data.duration) {
            this.paCustomParams.av_content_duration = data.duration*1000;
        } else if (data.id) {
            this.paCustomParams.av_content_id = data.id.toString();
        }
        this.videoMedia.setProps(this.paCustomParams);
        console.log(this.paCustomParams)
    }

    onPlayerReady = (player) => {
        this.instanciatedPlayer = player;

        this.instanciatedPlayer.on("loaded", (data) => {
            this.avInitTag(data);
            this.newVideoLoaded = true;
        });

        this.instanciatedPlayer.on("playing", (data) => {
            this.instanciatedPlayer.getVideoTitle().then((title) => {
                this.paCustomParams.av_content = title;
                this.avInitTag(data);
                if (this.previousPlayerStatePaused === true & !this.newVideoLoaded) {
                    this.videoMedia.playbackResumed(data.seconds * 1000);
                } else if (this.previousPlayerStateSeeked === true & !this.newVideoLoaded) {
                    this.videoMedia.playbackResumed(data.seconds * 1000);
                } else if (this.newVideoLoaded) {
                    this.videoMedia.play(data.seconds * 1000);
                    this.videoMedia.playbackStart(data.seconds * 1000);
                    this.newVideoLoaded = false;
                }
            });
        });

        this.instanciatedPlayer.on("pause", (data) => {
            this.instanciatedPlayer.getVideoTitle().then((title) => {
                this.paCustomParams.av_content = title;
                this.avInitTag(data);
                this.videoMedia.playbackPaused(data.seconds * 1000);
                this.previousPlayerStatePaused = true;
            });
        });

        this.instanciatedPlayer.on("ended", (data) => {
            this.instanciatedPlayer.getVideoTitle().then((title) => {
                this.paCustomParams.av_content = title;
                this.avInitTag(data);
                this.videoMedia.playbackStopped(data.seconds * 1000);
            });
        });

        this.instanciatedPlayer.on("seeking", (data) => {
            this.instanciatedPlayer.getVideoTitle().then((title) => {
                this.paCustomParams.av_content = title;
                this.avInitTag(data);
                this.previousCursorPosition = data.seconds * 1000;
            });
        });

        this.instanciatedPlayer.on("seeked", (data) => {
            this.instanciatedPlayer.getVideoTitle().then((title) => {
                this.paCustomParams.av_content = title;
                this.avInitTag(data);
                this.videoMedia.seek(this.previousCursorPosition, data.seconds * 1000);
                this.previousPlayerStateSeeked = true;
            });  
        });
    }
}

const paVimeoConnector = new paVimeoPlayer();