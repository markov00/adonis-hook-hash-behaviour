'use strict'

const { test, afterEach } = use('Test/Suite')('Hook behaviour')
const Hash = use('Hash')
const User = use('App/Models/User')
const Organization = use('App/Models/Organization')
const Database = use('Database')

const PASSWORD = 'password'
const ANOTHER_PASSWORD = 'anotherPassword'
const USER = {
  username: 'user',
  email: 'admin@admin.it',
  password: PASSWORD
}

afterEach(async () => {
  await Database.table('users').truncate()
  await Database.table('organizations').truncate()
})

test('Hash hook after creating user and updating password',  async ({ assert }) => {
  const user = await User.create(USER)
  // now update a user param
  user.password = ANOTHER_PASSWORD
  await user.save()

  const isSame = await Hash.verify(ANOTHER_PASSWORD, user.password)
  assert.isTrue(isSame, 'Password Hash') // this will pass
})

test('Hash hook after creating user and updating it',  async ({ assert }) => {
  const user = await User.create(USER)
  // now update a user param
  user.username = 'anotherusername'
  await user.save()

  const isSame = await Hash.verify(PASSWORD, user.password)
  assert.isTrue(isSame, 'Password Hash') // this will not pass/ rehashed the existing password
})

test('Hash hook after creating user and saving relationship',  async ({ assert }) => {
  const user = await User.create(USER)
  const org = await Organization.create({
    name: 'acme'
  })
  await org.users().save(user)
  const isSame = await Hash.verify(PASSWORD,user.password)
  assert.isTrue(isSame, 'Password Hash') // this will not pass/ rehashed the existing password
})
