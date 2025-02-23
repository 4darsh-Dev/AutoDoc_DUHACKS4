const { AbilityBuilder, PureAbility } = require('@casl/ability')

function defineAbilitiesFor(user) {
  const { can, cannot, build } = new AbilityBuilder(PureAbility)

  if (user.role === 'admin') {
    can('manage', 'all')
  } else if (user.role === 'issuing-authority') {
    can('create', 'Document')
    can('read', 'Document')
    cannot('delete', 'Document')
  } else if (user.role === 'verifying-authority') {
    can('read', 'Document')
    can('verify', 'Document')
  } else {
    can('read', 'Document')
  }

  return build()
}

module.exports = defineAbilitiesFor
