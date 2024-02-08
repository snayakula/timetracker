const jwt = require('jsonwebtoken')

function verify(req, res, next) {
    try {

        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Unauthorized", isSuccess: false });
        }

        const authorizationHeader = req.headers.authorization;
        const tokenParts = authorizationHeader.split(" ");

        if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== "bearer") {
            return res.status(401).json({ message: "Invalid Authorization Format", isSuccess: false });
        }

        const accessToken = tokenParts[1];
        const decode = jwt.decode(accessToken)

        const exp = new Date(decode.exp * 1000);
        const dt = new Date()

        if (dt.getTime() > exp.getTime()) {
            return res.status(401).json({ message: "Token Expiered", isSuccess: false });
        }

        if (decode.tid === process.env.CLIENT_SECRET) {
            next();
        } else {
            return res.status(401).json({ message: "Access Denied", isSuccess: false });
        }
    }

    catch (error) {
        console.log(error)
    }

}

module.exports = { verify }