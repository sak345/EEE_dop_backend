const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')

exports.protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }

  try {
    const decoded = jwt.verify(token, '${process.env.JWT_SECRET}')
    const user = await User.findById(decoded.id)
    if (!user) {
      return next(new ErrorResponse('No user found with this id', 404))
    }
    req.user = user // here making user sit on req
    next()
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this router', 401))
  }
}

exports.roles = async (req, res, next) => {
  const { role } = req.user

  if (role == 'admin') {
    next()
  } else if (role == 'member') {
    return next(
      new ErrorResponse(
        'Not authorized to access this router, Role not adequite',
        401
      )
    )
  } else {
    return next(new ErrorResponse('Not authorized to access this router', 401))
  }
}
