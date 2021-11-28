const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const store = require('./store')
const login = async (data) => {
  let { password, user_name } = data

  // password = bcrypt.hashSync(password, 10)
  // console.log(password);
  let users = await store.get(user_name).catch((e) => false)

  if (users) {
    if (!(users.length > 0)) {
      return false
    }

    let user = users[0]
    if (!bcrypt.compareSync(password || '', user.password)) {
      return false
    }

    user.password = undefined

    let token = jwt.sign(
      {
        login: user,
      },
      process.env.SEED,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    )

    return {
      token,
      // user,
    }
  } else {
    return false
  }
}

const refreshToken = async (data) => {
  let { user_name } = data

  let users = await store.get(user_name).catch((e) => false)

  if (users) {
    if (!(users.length > 0)) {
      return false
    }

    let user = users[0]

    user.password = undefined

    let token = jwt.sign(
      {
        login: user,
      },
      process.env.SEED,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    )

    return {
      token,
      user,
    }
  } else {
    return false
  }
}

const validateToken = async (token) => {
  if (!token) return false
  let usuario = null
  token = token.split(' ')[1]
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (!err) {
      usuario = decoded
    }
  })

  if (!usuario) return false
  var Today = Math.round(new Date().getTime() / 1000)

  const { exp } = usuario
  if (Today < exp) {
    return { user: usuario.login }
  }
  return {
    user: {},
  }
}

const validateTokenRecoveryPassword = async (token) => {
  if (!token) return false
  let user = null
  token = token.split(' ')[1]
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (!err) {
      user = decoded
    }
  })

  if (!user) return false
  var Today = Math.round(new Date().getTime() / 1000)

  const { exp } = user
  if (Today < exp) {
    return user
  }
  return false
}

const recoveryPassword = async (email) => {
  let users = await store.get(email).catch((e) => false)

  if (!users.length) {
    return false
  }

  let user = users[0]
  user.password = undefined
  // ===========>>>>>>>>>>>>

  let tokenRecoveyPassword = jwt.sign({ user }, process.env.SEED, {
    expiresIn: '1d',
  })

  var transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'e701f39e547e8e',
      pass: 'aaf0f3f2dd1ac5',
    },
  })

  await transport.sendMail({
    from: '"KigGamer 👻" a6b0851ccc-d81480@inbox.mailtrap.io',
    to: user.email,
    subject: '🔑 Recuperación de contraseña 🔑',
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </head>
    <style>
        .main{
            background-image: url("cid:bg");
        }
    </style>
    <body>
        <div class="main" style="background-color: dimgrey; display: flex; justify-content: center;align-items: center; height: 100vh;">
            <div class="col-6"><div class="row" style="background-color: white; border-radius: 10px; padding:15px;">
                <div class="col-12" style="display: flex; justify-content: center;">
                    <img src="cid:logo" alt="" height="100">
                </div>
                <div class="col-12"  style="display: flex; justify-content: center;">
                    <p>Hola <b>${user.user_name}</b>, astas intentando recupear tú contraseña para acceder en KinGamer.</p>
                </div>
                <div class="col-12"  style="display: flex; justify-content: center;">
                    <p style="text-align: center;">Hacer click <br><a href="https://kingamer.herokuapp.com/recuperar/password/${tokenRecoveyPassword}" class="btn btn-success" st>Aquí</a> <br> para recuperar la contraseña.</p>
                </div>
            </div></div>
        </div>
    </body>
    </html>
    `,
    attachments: [
      {
        filename: 'image.png',
        path: __dirname + '/img/logo.png',
        cid: 'logo',
      },
      {
        filename: 'image.png',
        path: __dirname + '/img/bg.jpg',
        cid: 'bg',
      },
    ],
  })

  return { tokenRecoveyPassword }
}

module.exports = {
  login,
  validateToken,
  refreshToken,
  recoveryPassword,
  validateTokenRecoveryPassword,
}
