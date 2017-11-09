'use strict'

const Model = use('Model')

class Organization extends Model {
  users () {
    return this.hasMany('App/Models/User')
  }
}

module.exports = Organization
