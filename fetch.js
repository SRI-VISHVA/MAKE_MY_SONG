var token = 'BQCyKQ1vVBaPGrMCmkvkd9uj0Vo3WSqX308CFtgUIr8h1BGC1K2Se6sbkx8z4rAV3PQDVJzJPHApTYTsHIw'
var bearer = 'Bearer ' + token
var playlist_tracks = []
var rat = 10;
var rat1 = 1;
function searchSong(){
    var song = document.getElementById("inp").value
    url = "https://api.spotify.com/v1/search?q="+song+"&type=track&market=IN"
    
    fetch(url,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
          }
    }).then(function(response) {   
        return response.json();
      }).then(function(json) {
        // console.log(json.tracks.items[0])
        document.getElementById('songs').innerHTML=""
        var songs = document.getElementById('songs');
        var track = json.tracks.items
        var i = 0
        
        track.forEach(function (song) {
        var entry_panel_row = document.createElement('div');

        entry_panel_row.className = 'entry panel row';  //+song.id+

        entry_panel_row.innerHTML +=  '<div>'+song.name+'<br><br>'+song.artists[0].name+
                                        '<br><br><button type="submit" onclick="playlist('+i+');">Add</button></div>';      //'<div class="large-4 ...</div>';
        i++;
        songs.appendChild(entry_panel_row);
            //var x = song.name;
            //console.log(song.name)
            //document.getElementById("sname").innerHTML += "<div>"+song.name+"</div>"
        });
      })
}
function playlist(id){
    //console.log(id)
    var song = document.getElementById("inp").value
    url = "https://api.spotify.com/v1/search?q="+song+"&type=track&market=IN"
    
    fetch(url,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
          }
    }).then(function(response) {   
        return response.json();
      }).then(function(json) {
        playlist_tracks.push({id: json.tracks.items[id].id, name: json.tracks.items[id].name, artist: json.tracks.items[id].artists[0].name,img: json.tracks.items[id].album.images[0].url}) 
        
        var playlistView = document.getElementById('playlist');
        
        var entry_panel_row = document.createElement('div');

        entry_panel_row.className = 'entry panel row';  //+song.id+

        entry_panel_row.innerHTML +=  '<div><img src="'+json.tracks.items[id].album.images[0].url+'" style="width: 100px; height: 100px;"><br>'+json.tracks.items[id].name+'<br>'+json.tracks.items[id].artists[0].name+'</div>';      //'<div class="large-4 ...</div>';
      
        playlistView.appendChild(entry_panel_row);

    })
}

var bearer2 = 'Bearer '+ 'BQCyKQ1vVBaPGrMCmkvkd9uj0Vo3WSqX308CFtgUIr8h1BGC1K2Se6sbkx8z4rAV3PQDVJzJPHApTYTsHIw'

var data = []

function CreatePlaylist(){
    //console.log(playlist_tracks)
    var x = 0
    playlist_tracks.forEach(function (song){
        url = "https://api.spotify.com/v1/audio-features/"+song.id
        fetch(url,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer2
              }
        }).then(function(response) {   
            return response.json();
          }).then(function(json) {
              x++;
            // console.log(song.id)
            // console.log(json.danceability) 
            data.push(['User',song.id,song.name,song.artist,json.danceability,json.energy,json.key,json.loudness,json.mode,json.speechiness,json.acousticness,json.instrumentalness,json.liveness,json.valence,json.tempo,json.duration_ms,json.time_signature,rat])
            if(rat1>1)
                rat--;
            rat1++;
            if(x==playlist_tracks.length)
            {
                DownloadPlaylist()
            }
          })
    })
}

function DownloadPlaylist(){

    var csv = 'owner,id,name,artists,danceability,energy,key,loudness,mode,speechiness,acousticness,instrumentalness,liveness,valence,tempo,duration_ms,time_signature,ratings\n'

    data.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";
    });
 
    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'playlist.csv';
    hiddenElement.click();
}

document.getElementById('inputfile') 
    .addEventListener('change', function() { 
    var fr=new FileReader(); 
    fr.onload=function(){ 
        var arr = fr.result;
        var songs = arr.split(",");
        for(i=0;i<songs.length;i++)
        {
            console.log(songs[i])
            recommendation(songs[i]);
        }
    } 
    fr.readAsText(this.files[0]); 
}) 

var bearer3 = 'Bearer ' + 'BQCyKQ1vVBaPGrMCmkvkd9uj0Vo3WSqX308CFtgUIr8h1BGC1K2Se6sbkx8z4rAV3PQDVJzJPHApTYTsHIw'

var recommendedSongs = []

function recommendation(id){
    
    url = "https://api.spotify.com/v1/tracks/"+id+"?market=IN";
        
        fetch(url,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer3
              }
        }).then(function(response) {   
            return response.json();
          }).then(function(json) {
            //recommendedSongs.push({id: json.id, name: json.name, artist: json.artists[0].name,img: json.album.images[0].url}) 
            
            var recView = document.getElementById('recomSongs');
            
            var entry_panel_row = document.createElement('div');
    
            entry_panel_row.className = 'entry panel row';  //+song.id+
    
            entry_panel_row.innerHTML +=  '<div><img src="'+json.album.images[0].url+'" style="width: 100px; height: 100px;"><br>'+json.name+'<br>'+json.artists[0].name+'</div>';      //'<div class="large-4 ...</div>';
          
            recView.appendChild(entry_panel_row);
    
        })
    }


