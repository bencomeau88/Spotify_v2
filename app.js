// beginning of code
$(document).ready(function() {
    // once someone enters the artist they are searching for...
    // this prevents default, submits the input.val() and...
    // clears fields
    $('.search_text').submit(function(e) {
            var user_input = $('.artist').val();
            var clear = function() {
                $('.artist').val('');
            }
            e.preventDefault();

            // $.ajax call to get artist searched for...
            // in the above form field
            var get_artist_data = function(user_input) {
                $.ajax({
                    url: 'https://api.spotify.com/v1/search?	',
                    data: {
                        type: 'artist',
                        query: user_input
                    }
                }).then(function(data) {
                    console.log(data);
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
                    	albums = _.sortBy(albums, '')
                    	albums = _.uniq(albums,false,function(album){return album.name.slice(0,8).toLowerCase()})
                        for (i = 0; i < albums.length; i++) {
                        	var album = albums[i];
                            //how to add class to below
                            var album_covers = '<li>' +
                                '<img' + " src=" + album.images[1].url + '>' +
                                album.name +
                                '</li>'
                            $('.results').append(album_covers);
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
            get_artist_data(user_input);
            clear();
        })
        // end of code
})
