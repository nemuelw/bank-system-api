const jwt = require('jsonwebtoken');

const verifyTjwt = (req, res, next) => {
    const token = req.get('x-token');
    try {
        jwt.verify(token, 'dT3ll3R@Sl0ngT0k3nth@TUk@ntGu3sSTry@nDci1');
        next()
    } catch(err) {
        res.status(401).send('unauthorized');
    }
}

module.exports = verifyTjwt;