
const jwt = require('jsonwebtoken');

const verificaToken = (req, res, next)=>{
    //Leer token

    const token = req.header('x-token');
    console.log(token)
    if (!token){
        return res.status(401).json({
            ok: false,
            msg: "Es necesario subministrar el token"
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "token no valido"
        })
    }

}

module.exports = {
    verificaToken
}