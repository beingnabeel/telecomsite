// This is where all our express stuff happens (routes);
const app = require("./server").app; // here we are going in our server.js file and grabbing app.
const jwt = require("jsonwebtoken");
const linkSecret = "sld3jklds456sdjfldlsn9"; //this thing job here is to encode our data.

// this route is for us! In production, a receptionist or calender/scheduling app would send this out. we will print it out and paste it in. It will drop us on our React site with the right infomation for CLIENT1 to make an offer.
app.get("/user-link", (req, res) => {
  // data for the end user appointment.
  const appData = {
    professionalsFullName: "Nabeel Hassan, M.D",
    appDate: Date.now() + 500000,
  };
  // we need to encode this data to a token.
  // so it can be added to a url.
  const token = jwt.sign(appData, linkSecret); // so this here will generate that goofy looking hash
  res.send("https://localhost:3000/join-video?token=" + token); // this will run wherever our react is running and this part ?token is a query string which tells the browser you don't need to look for a path anymore, this is meant to be data and at the very end I will be concatenating our token.
  // res.json("This is a test route");
});

// here we will be decoding the data and printing it to the screeen
app.post("/validate-link", (req, res) => {
  // get the token from the body of the post request ( thanks express.json() )
  const token = req.body.token;
  // decode the jwt with our secret.
  const decodeData = jwt.verify(token, linkSecret);
  // send the decoded data ( our object )back to the front end.
  res.json(decodeData);
});
