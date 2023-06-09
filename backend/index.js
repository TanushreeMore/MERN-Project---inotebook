const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')               

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json()) // to use request.body we need to uses this


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})