list of challenges! 

var print = function(msg){
	var paragraph = document.createElement('p');
  paragraph.appendChild(document.createTextNode(JSON.stringify(msg)));
  document.body.appendChild(paragraph);
}

var all_ids = "";
var ids = [];
var albums = [
  {id: 'saks', name: 'homonimous'},
  {id: 'jdks', name: 'sophomore'},
  {id: 'qppq', name: 'third is a charm'},
  {id: 'alxa', name: 'maturity'},
  {id: 'trew', name: 'revival'},
  {id: 'qwer', name: 'more of the same'}
];


albums.forEach(function(element, index){
  if (index==0){
  	all_ids = all_ids + element.id
  }
  else {
  	all_ids = all_ids + ',' + element.id
  }
});
// ADD ALL OF THE IDs to the `ids` VARIABLE to get an array instead of a string
albums.forEach(function(element, index){

});
// JOIN ALL OF THE IDs in `ids` VARIABLE INTO A STRING
print(ids);