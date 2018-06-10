require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require('twilio');
var client = new twilio(accountSid, authToken);

app.post('/api/',(req,res)=>{
	console.log("API REQUEST");
	console.log(req.body);
	res.send();
});

app.post('/api/license/',(req,res)=>{
	console.log(req.body)
	console.log("LICENSE REQUEST");


	if(!isKnownALPRBody) return res.send();

	let messageBody = ["License detected, ", req.body.results[0].plate, " with ", req.body.results[0].confidence, " confidence. Known Plates - ", process.env.KNOWN_PLATES]
	sendMessage(messageBody.join(''))


	res.send();
});

app.post('/development/',(req,res)=>{
	console.log(req.body)
	console.log("DEV LICENSE REQUEST");


	if(!isKnownALPRBody) return res.send();

	let messageBody = ["License detected, ", req.body.results[0].plate, " with ", req.body.results[0].confidence, " confidence. Known Plates - ", process.env.KNOWN_PLATES]
	sendMessage(messageBody.join(''))


	res.send();
});

app.listen(port);


function isKnownALPRBody(body){
	// If body unknown
	if(body.data_type === undefined){
		if(body.data_type !== 'alpr_results'){
			console.error('Unknown data_type ', body);
			return false;
		}
		console.error('Unknown body ', body);
		return false;
	} else if(body.results.length === 0){
		console.error('No Results ', body);
		return false;
	}
	return true;
}

function sendMessage(message){
	client.messages.create({
		body: message,
		to: process.env.TWILIO_TO_NUMBER,
		from: process.env.TWILIO_FROM_NUMBER
	}).catch(err => {
		console.error(err);
	});
}


// { version: 2,
//   data_type: 'alpr_results',
//   epoch_time: 1528591839288,
//   img_width: 640,
//   img_height: 480,
//   processing_time_ms: 2285.127441,
//   regions_of_interest: [],
//   results:
//    [ { plate: '5DIB146',
//        confidence: 88.950455,
//        matches_template: 0,
//        plate_index: 0,
//        region: '',
//        region_confidence: 0,
//        processing_time_ms: 700.859802,
//        requested_topn: 10,
//        coordinates: [Array],
//        candidates: [Array] } ],
//   uuid: '-cam1-1528591841596',
//   camera_id: 1,
//   site_id: '' }