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

        var artistRequest = $.ajax({
            url: 'https://api.spotify.com/v1/search?',
            data: {
                type: 'artist',
                query: user_input
            }
        });

        var artistAlbumsRequest = artistRequest.then(function(data) {
            var artist = data.artists.items[0];
            console.log(artist);
            return $.ajax({
                url: 'https://api.spotify.com/v1/artists/' + artist.id + '/albums',
                data: {
                    type: 'albums'
                }
            });
        });

        var albumsInfoRequest = artistAlbumsRequest.then(function(data) {
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
                console.log(all_ids);
                $.ajax({
                    url: 'https://api.spotify.com/v1/albums',
                    data: {
                        ids: all_ids,
                        markets: 'ES'
                    }
                }).then(console.log(data))
            })

            // $.ajax({
            //   url: 'https://api.spotify.com/v1/albums',
            //   data: {
            //     ids: ''
            //   }
            // });
        });


        // function calls
        $('.cd_content').on('click', function() {
            $('.modal').css('display', 'block');
        });
    });
    // end of code
});



// var print = function(msg){
//   var paragraph = document.createElement('p');
//   paragraph.appendChild(document.createTextNode(JSON.stringify(msg)));
//   document.body.appendChild(paragraph);
// }

// var albums = [
//   {id: 'saks', name: 'homonimous'},
//   {id: 'jdks', name: 'sophomore'},
//   {id: 'qppq', name: 'third is a charm'},
//   {id: 'alxa', name: 'maturity'},
//   {id: 'trew', name: 'revival'},
//   {id: 'qwer', name: 'more of the same'}
// ];

// albums.forEach(function(element, index){
//   if(index==0){
//   all_ids = all_ids + element.id
//   }
//   else {
//   all_ids = all_ids + ',' + element.id
//   }
//   print('https://theapi.com/albums?'+element.id)
// })
// print(all_ids);
// print('https://theapi.com/albums?'+all_ids)


// saks,jdks,qppq,tre,qwer
//for (i=0; i<albums.length; i++){
//  var album = albums[i];
//  if (i == 0) {
//    all_ids = all_ids + album.id
//  }
//  else {
//    all_ids = all_ids + ',' + album.id
//  }
//}
