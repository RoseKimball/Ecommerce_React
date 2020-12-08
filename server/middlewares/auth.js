const admin = require('../firebase/index');

exports.authCheck = async (req, res, next) => {
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
        console.log('firebaseUser authcheck', firebaseUser);
        req.user = firebaseUser;
        next();
    } catch (err) {
        console.log(err)
        res.status(401).json({
            err: 'invalid or expired token'
        })

    }
}
