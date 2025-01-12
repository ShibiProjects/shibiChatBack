import jwt from "jsonwebtoken";

const authFilter = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({error: 'Credenciales no proporcionadas. Autenticación requerida.'});
        }

        jwt.verify(token, "yourSecretKey", (err, decode) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({error: "Token expirado."});
                } else {
                    return res.status(401).json({error: 'Token invalido.'});
                }
            }
            req.user = decode;
            return next();
        });
    } catch (error) {
        next(error);
    }
}

export default authFilter;