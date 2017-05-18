// videojs-shoot-plugin

var VjsButton = videojs.getComponent('Button');
var SHButton = videojs.extend(VjsButton, {
    constructor: function(player, options) {
        VjsButton.call(this, player, options);
        this.player = player;
        this.on('click', this.onClick);
    },

    onClick: function() {
        //Start by pausing the player
        this.player.pause();
        var video  = document.getElementById('video_html5_api');
        var canvas = capture(video, 1);
        //save
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");   
        var filename = 'szest_' + (new Date()).getTime() + '.' + 'png';
        saveFile(image,filename);          
    },
});

function capture(video, scaleFactor) {
	if(scaleFactor == null){
		scaleFactor = 1;
	}
	var w = video.videoWidth * scaleFactor;
	var h = video.videoHeight * scaleFactor;
	var canvas = document.createElement('canvas');
		canvas.width  = w;
	    canvas.height = h;
	var ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, w, h);
    return canvas;
} 

var saveFile = function(data, filename){
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
};

function shoot(){    
    var player = this;
    player.ready(function() {
            player.controlBar.addChild(
                new SHButton(player, {
                    el: videojs.createEl(
                        'button',
                        {
                            className: 'vjs-shoot-button vjs-control',
                            innerHTML: '<button class="vjs-control vjs-button  vjs-snapshot-button" type="button" aria-live="polite" aria-disabled="false"><svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" viewBox="0 0 16 16"><path class="fill" fill="#ccc" d="M4.75 9.5c0 1.795 1.455 3.25 3.25 3.25s3.25-1.455 3.25-3.25S9.795 6.25 8 6.25 4.75 7.705 4.75 9.5zM15 4h-3.5c-.25-1-.5-2-1.5-2H6C5 2 4.75 3 4.5 4H1c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-7 9.938c-2.45 0-4.438-1.987-4.438-4.438S5.55 5.062 8 5.062c2.45 0 4.438 1.987 4.438 4.438S10.45 13.938 8 13.938zM15 7h-2V6h2v1z"></path></svg></button>'
                        },
                        {
                            role: 'button'
                        }
                    )
                })
            );
    });    
    
}

videojs.plugin('shoot', shoot);
