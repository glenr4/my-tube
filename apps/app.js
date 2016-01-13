'use strict'
$(function(){	// equivalent to: $(document).ready(function(){})

	function showResults(results){
		var html = "";
		var img = "";
		var url = "";
		$.each(results, function(index, value){
			url = "https://www.youtube.com/watch?v="+ value.id.videoId;
			img = value.snippet.thumbnails.default.url;
			html += "<p><a href="+ url +"><img src="+ img +"></a></p>";
		});
		console.log(html);
		$("#search-results").empty().append(html);
	};

	$("#search-term").submit(function(event){
		event.preventDefault();
		var searchTerm = $("#query").val();
		getResults(searchTerm);
	});

	function getResults(searchTerm){
		var url = "https://www.googleapis.com/youtube/v3/search";
		var params = {
			part: "snippet",
			key: "AIzaSyBKdOetmaqtjwiXrPEy8xF3PH5fzVLnWtc",
			q: searchTerm
		};

		$.getJSON(url, params, function(data){
			if (data.hasOwnProperty("items")){
				console.log(data.items);
				showResults(data.items);
			} else {
				$("#search-results").empty().append("Cannot find: "+ searchTerm);
			};
		});
	};
});