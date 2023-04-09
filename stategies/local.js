const localStrategy = require('passport-local');
const passport = require('passport');
const db = require('../database')

passport.serializeUser((user, done) => {
    done(null, user.username);
})

passport.deserializeUser(async (username, done) => {
    try{
        const result = await db.promise().query(`SELECT * FROM TESTAPP WHERE USERNAME = '${username}'`);
        if(result[0][0]){
            done(null, result[0][0]);
        }
    }
    catch(error){
        done(error, null)
    }
})

passport.use(new localStrategy(
    async(username, password, done) =>{
        try{
            const result = await db.promise().query(`SELECT * FROM TESTAPP WHERE USERNAME = '${username}'`);
            if(result[0].length === 0){
                done(null, false);
            } else{
                if(result[0][0].password === password){
                    done(null, result[0][0]);
                } else{
                    done(null, false);
                }
            }
        }catch(error){
            done(error, false);
            console.log('local error: ' + error)
        }
    }
))