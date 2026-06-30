// import express
const express = require("express");

//import prom-client
const client = require("prom-client");

//start collecting metrics
client.collectDefaultMetrics();

//create custom metrics
const httpRequestsTotal = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests"
});


// create app
const app = express();

//metrics route
app.get("/metrics", async (req,res) => {
	res.set("Content-Type", client.register.contentType);
	const metrics = await client.register.metrics();
	res.send(metrics);
});

// import dotenv
const dotenv = require("dotenv");

// load dotenv
dotenv.config();

//route
app.get("/", (req, res) => {
     httpRequestsTotal.inc();
     res.send('Hello World!');
});

//secret route
app.get("/secret", (req,res) => {
	console.log(req.get("authorization"));
	const authHeader = req.get("authorization");

	if (!authHeader) {
		// set WWW- Authenticate header
		res.set('WWW-Authenticate', 'Basic realm="User Visible Realm"')
		// set status 401
		return res.status(401).send("Authentication required");

}
		//decode BasicAuth
                const encodedCredentials = authHeader.split(" ")[1];
                const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString("utf-8");
		const credentials = decodedCredentials.split(":");
		const username = credentials[0];
		const password = credentials[1];
                console.log(username);
		console.log(password);


	if (username === process.env.USERNAME && password === process.env.PASSWORD) {
                httpRequestsTotal.inc();
		return res.send(process.env.SECRET_MESSAGE);
}
		else {
		res.set('WWW-Authenticate', 'Basic realm="User Visible Realm"')
                return res.status(401).send("Authentication required");
}

});



//listen
app.listen(3000, () => { 
        console.log('Example app listening on port 3000!');
});

