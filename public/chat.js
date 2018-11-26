var socket = io.connect('http://localhost:4000/');

var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');
      feedback = document.getElementById('feedback');

btn.addEventListener('click', function(){
	if(handle.value.length>0 && message.value.length>0){
		socket.emit('message', {
			handle:handle.value,
			message:message.value
		});
		output.value = ''
	}
});


socket.on('message', function(data){
	feedback.innerHTML = '';
	output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

message.addEventListener('keypress', function(){
	socket.emit('typing', {
		handle:handle.value	
	});
});

socket.on('typing', function(data){
	feedback.innerHTML = '<p><em>' + data.handle + ' is typing a message...</em></p>';
});


