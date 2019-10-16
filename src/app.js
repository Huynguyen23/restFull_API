const express = require('express')
const userRouter = require('./routers/user')
const passport = require('passport');
require('./middleware/auth');
require('./passport');
const port = process.env.PORT
require('./db/db')

const app = express()

app.use(express.json())
const auth = require('./middleware/auth');
const user = require('./routers/user');
app.use('/auth', auth);
app.use('/user', user);
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})