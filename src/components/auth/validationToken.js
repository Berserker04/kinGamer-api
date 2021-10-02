const jwt = require('jsonwebtoken');

// varificar token
let verificaToken = (req, res, next) => {
    let token = req.params.token;
    let usuario = null;
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.json({
                ok: false,
                err
            });
        }

        usuario = decoded;

    });

    var Today = Math.round((new Date()).getTime() / 1000);

    const { exp } = usuario;
    if (Today < exp) {
        return res.json({
            ok: true,
            user: usuario.login
        });
    }
    res.json({
        ok: false,
        user:{}
    });
};


let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'Admin') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
};

module.exports = { verificaToken, verificaAdmin_Role };