const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const whitelist = ['http://localhost:3000/', 'http://localhost:3001/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const {
  storesRouters,
  usersRouters,
  authRouters,
  clientsRouters,
  providersRouters,
  categoriesRouters,
  productsRouters
} = require('./routes')

const app = express()

// settings
app.set('port', process.env.PORT || 3002)

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors(corsOptions))

// routes
app.get('/', (req, res) => {
  res.json({
    description: 'Api - SurtishApp',
    version: '1.0.0',
    developers: [
      {
        name: 'Fernanda Palacios',
        userGit: '@EveFer'
      },
      {
        name: 'Victor Torres',
        userGit: '@victortorres-dev'
      }
    ]
  })
})
app.use('/stores', storesRouters)
app.use('/auth', authRouters)
app.use('/users', usersRouters)
app.use('/clients', clientsRouters)
app.use('/providers', providersRouters)
app.use('/categories', categoriesRouters)
app.use('/products', productsRouters)

module.exports = app
