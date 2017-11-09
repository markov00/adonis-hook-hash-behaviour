'use strict'

class AuthController {
  async login({ request, response, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    await response.json(token)
  }
}

module.exports = AuthController
