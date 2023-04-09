const { Router } = require('express')
const db = require('../database');
const { check, validationResult } = require('express-validator')

const router = Router()

router.use((req, res, next) => {
  console.log('Request made to /TESTAPP ROUTE');
  next();
})

router.get('/', async (req, res) => {
  try{
    if(req.user){
      const results = await db.promise().query(`SELECT * FROM TESTAPP`);
      res.status(200).send(results[0])
    }
    else{
      res.status(403).send({msg: 'Not Authenticated'});
    }
  }
  catch(error){
    console.log('get users error: ' + error)
  }
})

router.post('/', [
  check('username')
    .notEmpty()
    .withMessage('Username cannot be empty!')
    .isLength({min: 5})
    .withMessage('Username must be at least 5 characters'),
  check('password')
  .notEmpty()
  .withMessage('Password cannot be empty!')
  .isLength({min: 3})
  .withMessage('Password must be at least 3 characters'),
],(req, res) => {
  const errors = validationResult(req);
  console.log(errors)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, password } = req.body;
  if(username && password) {
    console.log(username, password);
    try{
      db.promise().query(`INSERT INTO TESTAPP VALUE('${username}', '${password}')`)
      res.status(201).send({ msg: 'Created User' })
    }
    catch(error){
      console.log('post users error: ' + error)
    }
  }
})

module.exports = router