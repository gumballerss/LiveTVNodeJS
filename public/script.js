(function() {

   var socket = io();
   socket.emit('auth', userId);

   socket.on('tweet', function(tweet) {
       
       var div = document.getElementById('tweet');
       div.innerHTML = '<p>' + ' <img src= "' + tweet.user.profile_image_url + '"/> ' + tweet.text + '</p>' + div.innerHTML ;
       console.log(tweet);

   });
})();