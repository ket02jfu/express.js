const express = require('express');
const session = require('express-session');
const passport = require('passport');
const local = require('./stategies/local');

const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

const store = new session.MemoryStore();
const app = express();

app.use(session({
  secret: 'some secret',
  cookie: { maxAge: 60000 },
  saveUninitialized: false,
  resave: false,
  store
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(store);
  console.log(`${req.method} - ${req.url}`);
  next();
})

app.use(passport.initialize())
app.use(passport.session())

app.use('/users', usersRoute);
app.use('/auth', authRoute);

app.listen(3000, () => {
  console.log('Server is running on Port 3000');
})


// get localhost:3000/users - получение всех пользователей
// post localhost:3000/users - регистрация
// post localhost:3000/auth/login - вход в учетную запись