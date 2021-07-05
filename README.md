As the user comes on the website, they can view the visualization of features of songs of different artists. The user can choose to get recommendations based on their playlist. 

To create the playlist, user must navigate to the Recommendation page. Here, the user must search for songs using keywords. Songs related to the keywords will be fetched using Spotify API. 

To use the Spotify APIs, tokens must be changed in the fetch.js file. In line 1, line 69 and line 134, tokens must be changed to the tokens generated from https://developer.spotify.com" - search, audio features and tracks respectively. 

Once adding of songs to playlist is completed, the user must click on ‘create playlist’. This will download a ‘playlist.csv’ file. This file should be saved in the jupyter folder to run it through the recommendation system. The file will be read by the prediction.ipynb file. Running all the blocks will result in recommended songs based on the user’s playlist, and visualizations specific to the playlist and recommendations.  

A text file called songs.txt will be created which will have the ids of all the recommended songs. This file must be uploaded by the user into the recommendation page. The recommended songs and their features will then be fetched using Spotify API and will be displayed to the user.
