$(document).ready(function() {
    //function to play a random song from the selected album
    var playRandom = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //  $("#fancy_popup").fancybox({
    //     transitionIn    : 'elastic',
    //     transitionOut   : 'elastic',
    //     easingIn        : 'easeInSine',
    //     easingOut       : 'easeOutSine',
    //     speedIn         : 400,
    //     speedOut        : 200,
    //     titlePosition   : 'inside', 
    //     titleFormat     : 'document.write("Fancy Box Title");',
    //     cyclic          : true,
    //     type            : "iframe",
    //     width           : 640, // or whatever
    //     height          : 320
    // });
    $('#fancy_popup').fancybox();

    // beginning of code
    // once someone enters the artist they are searching for...
    // this prevents default, submits the input.val() and...
    // clears fields


    $('.search_text').submit(function(e) {
        e.preventDefault();
        var user_input = $('.artist').val();
        var clear = function() {
            $('.artist').val('');
        };

        var get_artist = $.ajax({
            url: 'https://api.spotify.com/v1/search?',
            data: {
                type: 'artist',
                query: user_input
            }
        });

        var get_albums = get_artist.then(function(data) {
            console.log(data);
            var artist = data.artists.items[0];
            console.log(artist);
            return $.ajax({
                url: 'https://api.spotify.com/v1/artists/' + artist.id + '/albums',
                data: {
                    type: 'albums'
                }
            });
        });

        var get_album_info = get_albums.then(function(data) {
            var albums = data.items;
            albums = _.uniq(albums, false, function(album) {
                // using slice to match versions of the same album.
                return album.name.slice(0, 8).toLowerCase();
            });

            console.log(albums);
            var all_ids = '';
            albums.forEach(function(element, index) {
                if (index == 0) {
                    all_ids = all_ids + element.id
                } else {
                    all_ids = all_ids + ',' + element.id
                }

            })
            console.log(all_ids);
            return $.ajax({
                url: 'https://api.spotify.com/v1/albums',
                data: {
                    ids: all_ids,
                    markets: 'ES'
                }
            })

        });
        get_album_info.then(function(data) {
            data.albums.forEach(function(album, index) {

                console.log(album);

                var album_cover = $('<li>' +
                    '<a class="link_click" href="#">' +
                    '<img' + " src=" + album.images[1].url + '>' +
                    album.name +
                    '</a>' +
                    '</li>');
                $('.results').append(album_cover);
                
                var track_names = album.tracks.items.map(function(track) {
                    return track.name;
                })

                album_cover.on('click', function() {
                    var tracks = track_names;
                    console.log(tracks);
    					for(i=0;i<tracks.length;i++){
                        console.log(tracks[i]);
                        var album_tracks = $('<div class"album_tracks">' + '<li>' +
                            '<a rel="gallery" href="#">' + tracks[i] + '</li>' + '<br>' + '</div>');
                        // $('#fancy_popup').append(album_tracks);
                        // $('#fancy_popup').show();
                        var album_tracks_html = $('.fancybox').append(album_tracks); 
                        $.fancybox({
                            'content': album_tracks_html
                        });
                    };

                    
               




                          
                        
                   
                    // var random = playRandom(0, album.tracks.items.length);
                    // console.log(random);
                    // var preview_track = album.tracks.items[random].preview_url
                        // preview_audio = new Audio(preview_track);
                        // preview_audio.play();


                    // var album_tracks = album.tracks.items
                    // console.log(album_tracks);
                    // var track_ids = album_tracks.map(function(track){
                    // 	return track.id;

                    // })
                    // AJAX USED TO GET AUDIO FEATURES, REQUIRES AUTH. TO CONTINUE
                    // console.log(track_ids);
                    // $.ajax({
                    // 	url:"https://api.spotify.com/v1/audio-features",
                    // 	data: {
                    // 		ids:track_ids.join(',')
                    // 	}
                    // }).then(function(data){
                    // 	console.log(data);
                    // })

                });
                

            });
            console.log(data);

        });

    });


});
