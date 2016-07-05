// beginning of code
$(document).ready(function() {
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

                var get_albums = get_artist.then(function(data){
                	var artist = data.artists.item[0];
                	console.log(artist);
                	return $.ajax({
                		url: 'https://api.spotify.com/v1/artists/' + artist.id + '/albums',
                		data: {
                			type: 'albums'
                		}
                	});
                });
                
                var get_album_info = get_albums.then(function(data){
                	var albums = data.items;
                	albums = _.uniq(albums, false, function(album) {
        			// using slice to match versions of the same album.
        			return album.name.slice(0, 8).toLowerCase();
                });

                console.log(albums);

            });

                // $.ajax call to get artist searched for...          
                // in the above form field
                var get_artist_data = function(user_input) {
                        $.ajax({
                            url: 'https://api.spotify.com/v1/search?',
                            data: {
                                type: 'artist',
                                query: user_input
                            }
                        }).then(function(data) {
                            console.log(data);
                            //returns the most popular aka first artist in the search list
                            var artist = data.artists.items[0];

                            return artist;
                        }).then(function(artist) {
                                console.log(artist);
                                $.ajax({
                                    url: 'https://api.spotify.com/v1/artists/' + artist.id + '/albums',
                                    data: {
                                        type: 'albums'
                                    }
                                }).then(function(data) {
                                        var albums = data.items;
                                        // albums = _.sortBy(albums, '')
                                        albums = _.uniq(albums, false, function(album) {
                                            return album.name.slice(0, 8).toLowerCase() })
                                        for (i = 0; i < albums.length; i++) {
                                            var album = albums[i];
                                            var album_id = albums[i].id;
                                            console.log(album_id);

                                            $.ajax({
                                                url: 'https://api.spotify.com/v1/albums?' + album_id + ',',
                                                data: {
                                                    ids: album_id,
                                                    'available_markets': 'ES'
                                                }
                                            }).then(function(data) {                            
                                                    var preview_tracks = data.albums[0].tracks.items[0];
                                                    console.log(preview_tracks);
                                                    var album_images = data.albums[0].images[1];
                                                    console.log(album_images);
		                                            
                                                    var album_covers = '<li>' +
                                                    	'<a href="#">' +
                                                        '<img' + " src=" + album_images.url + '>' +
                                                        album.name +
                                                        '</a>'+
                                                        '</li>'
                                                    $('.results').append(album_covers);
                                                    var $album_info = $('a');
                                                    $album_info.on('click',function(){
                                                    	preview_audio = new Audio(preview_tracks.preview_url);                                                   
                                                    	preview_audio.play();
                                                    	
                                                    })
                                                })

                                            }
                                        console.log(data);
                                        // $.ajax({
                                        // 	url:'https://api.spotify.com/v1/albums' +
                                        // 	data:{
                                        // 		type:'albums'
                                        // 	}
                                        // }).then(function(data){

                                        // }
                                    })
                                })


                                //gets all the albums data...then move images to here


                            }

                            // function calls
                            $('.cd_content').on('click',function(){
                            	$('.modal').css('display', 'block');
                            })                            
                            get_artist_data(user_input); clear();
                        })
                    // end of code
            })
