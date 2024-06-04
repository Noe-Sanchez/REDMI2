const express = require('express');
const cors = require('cors');
const app = express();
const port = 8082;
const init_time = Date.now() / 1000;

function requestTime(){
  return Math.floor((Date.now() / 1000)-init_time).toString();
}

app.use(express.json());

let allowedOrigins = ['http://localhost:8081'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      let msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Routes
app.get('/', (req, res) => {
  console.log('Inbound default GET request at ' + requestTime() + ' seconds');
  res.send('Debug route');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})
