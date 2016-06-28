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
                var object = data.artists.items[0];
                var artist_id = object.id;
                console.log(artist_id)
                console.log(object)
                for(i=0;i<object.images.length;i++){
                	//how to add class to below
                var album_covers = '<li>' +
                '<img' + " src=" + object.images[i].url +'>' + 
                '</li>'
                $('.results').append(album_covers);
            }
            })
            //gets all the albums data...then move images to here
            $.ajax({
            	url:'https://api.spotify.com/v1/artists/'+ artist_id + 'albums',
            	data: {
            		type:'albums'
            	}
            }).then(function(data){
            	console.log(data);
            })
        }

        // function calls
    get_artist_data(user_input);
    clear();
    })
    // end of code
})
