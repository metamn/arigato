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
      
      jQuery('#info #album-image').html("<img src='" + result + "' />");     
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
      
      jQuery('#info #artist-image').html("<img src='" + result + "' />");      
    });
  }
  
  // Displaying song info  
  function setInfo() {
    var ampTrack = jQuery('#player #amptracker_NowPlaying .display span').first().html();
    var ampArtist = jQuery('#player #amptracker_NowPlaying .display span:nth-child(3)').html();
    var ampAlbum = jQuery('#player #amptracker_NowPlaying .display span:nth-child(5)').html();
    
    jQuery('#info #track').html(ampTrack);
    jQuery('#info #artist').html("<em>by</em> " + ampArtist);
    jQuery('#info #album').html("<em>from</em> " + ampAlbum);   
    
    setAlbumImage(ampTrack, ampArtist);     
    setArtistImage(ampTrack, ampArtist);
  }
  
  
  // Displaying recently played
  function setPlayed() {
    var txt = jQuery("#fromlastfm table").html();
    jQuery("#playlist").html(txt);
  }
  
  jQuery(".link").click(function() {
    setInfo();
    setPlayed();
  });
  
  
});
