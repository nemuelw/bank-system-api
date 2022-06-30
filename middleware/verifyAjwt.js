const jwt = require('jsonwebtoken');

const verifyAjwt = (req, res, next) => {
    const token = req.get('x-token');
    try {
        jwt.verify(token, '@AdmInC@Sl0ngT0k3nth@TUk@ntGu3sSTry@nDci1');
        next()
        console.log('okay: authorized')
    } catch(err) {
        res.status(401).send('unauthorized');
    }
}

module.exports = verifyAjwt;