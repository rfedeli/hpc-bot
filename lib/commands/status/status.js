/* status.js - !Command to see a user's status (house, commends etc)
*/

var strings = require('../../../config/strings.json');

var eventbus; // Global event bus that modules can pub/sub to
var User;

var start = function start(_eventbus, _User) {
	eventbus = _eventbus;
	User = _User;

	eventbus.on('status:get', getStatus);
};

var getStatus = function getStatus(username, parameters) {
	// Get a specific user's status
	var target;
	var self=true;	// Are they asking for themselves? Or for someone else

	if(parameters != null) {
		// User is looking for someone else
		target = parameters;
		self = false;
	}
	else {
		// User is looking for their own
		target = username;
	}

	var response = [];

	// Get a specific user's status
	User.getAll(target, function(err, data) {
		var response = [];

		if(!err && data) {
			// Generic Status message
			response.push(strings.status.overview + target);

			if(data.house) {
				response.push(strings.status.house + data.house);
			}
			if(data.commends) {
				response.push(strings.status.commends + data.commends);
			}
		}
		else {
			// User not found
			response.push(strings.status.cant_find + target);
		}

		eventbus.emit('twitch:say', response);
	});
			// statuses.push
			// pick out the statuses we want
/*
			if(self) {
				response.push(target + strings.commends.user_has + commends + strings.commends.commends);
			}
			else {
				response.push(target + strings.commends.user_has + commends + strings.commends.commends + strings.commends.jealous);	
			}
		}
		else {
			if(err == 'User Not Found') {
				response.push(strings.commends.cant_find + target);
			}
			else if(err == 'User Has No Commends') {
				response.push(target + strings.commends.no_commends);
			}
		}
*/
};

module.exports = {
	start: start
};