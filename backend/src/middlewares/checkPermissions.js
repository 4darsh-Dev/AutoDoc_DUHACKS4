const defineAbilitiesFor = require('../utils/ability')

function checkPermissions(action, subject) {
  return (req, res, next) => {
    const ability = defineAbilitiesFor(req.user) // Assuming user is added to req via authentication

    if (ability.can(action, subject)) {
      next()
    } else {
      res.status(403).send('Access Denied')
    }
  }
}

module.exports = checkPermissions
