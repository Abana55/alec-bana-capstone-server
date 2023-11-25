// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     const bearerTokenString = req.headers.authorization;

//     if (!bearerTokenString) {
//         return res.status(401.json({error: "check"}))
//     }
//     const splitBearerTokenString = bearerTokenString.split(" ");

//     if (splitBearerTokenString.length !==2) {
//         return res.status(400).json({error: "token is malformed"});
//     }

//     const token = splitBearerTokenString[1];

//     jwt.verify(tokenm, process)
// }