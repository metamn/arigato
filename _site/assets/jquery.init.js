jQuery.noConflict();


// Use jQuery via jQuery(...)
jQuery(document).ready(function(){
  
  
  // Getting album art via JSON from last.fm
  function setAlbumImage(track, artist) {
    jQuery.getJSON("http://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=987a9125aca0c32d6497d0051ddf93fa&format=json&artist=" + artist +"&track=" + track + "&callback=?", function(data) {
      var result = '';
      
      if (data) {
        jQuery.each(data.track.album.image, function(i, img) { 
          result = img["#text"];
        });
      }
      
      jQuery('#album-info #album-image').html("<img src='" + result + "' />");     
    });
  }
  
  // Getting artist image via JSON from last.fm
  function setArtistImage(track, artist) {
    jQuery.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=987a9125aca0c32d6497d0051ddf93fa&format=json&artist=" + artist + "&callback=?", function(data) {
      var result = '';
      
      if (data) {
        jQuery.each(data.artist.image, function(i, img) { 
          result = img["#text"];
        });        
      }
      
      jQuery('#artist-info #artist-image').html("<img src='" + result + "' />");      
    });
  }
  
  // Displaying song info  
  function setInfo() {
    var ampTrack = jQuery('#player #amptracker_NowPlaying .display span').first().html();
    var track = jQuery('#album-info #track').html();
    
    if (!(ampTrack == track)) {
      var ampArtist = jQuery('#player #amptracker_NowPlaying .display span:nth-child(3)').html();
      var ampAlbum = jQuery('#player #amptracker_NowPlaying .display span:nth-child(5)').html();
      
      
      jQuery('#album-info #track').html(ampTrack);
      jQuery('#artist-info #artist').html(ampArtist);
      if (ampAlbum) {
        jQuery('#album-info #album').html("<em>from</em> " + ampAlbum);   
        setAlbumImage(ampTrack, ampArtist); 
      } else {
        jQuery('#album-info #album').html('');   
      }  
      setArtistImage(ampTrack, ampArtist);
    }
  }
  
  
  // Polling for song change
  var changeInfo = setInterval(function(){
    setInfo();
  }, 500);
  
  
  // Show / hide playlist
  jQuery("#playlist h3").click(function() {
    jQuery('#lastfmframe').show('slow');
  });
  
});
