$(document).ready(function() {
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
                var album_cover = $('<li>' +
                    '<a href="#">' +
                    '<img' + " src=" + album.images[1].url + '>' +
                    album.name +
                    '</a>' +
                    '</li>')
                album_cover.on('click', function() {
                	var preview_track = album.tracks.items[0].preview_url
                    preview_audio = new Audio(preview_track);
                    preview_audio.play();
                })
                $('.results').append(album_cover);
            })
            console.log(data);
            var preview_track = data.albums[0].tracks.items[0].preview_url;
            console.log(preview_track);
            var album_images = data.albums[0].images[1];
            console.log(album_images);
            var $album_info = $('a');

        })
        
    });
});
