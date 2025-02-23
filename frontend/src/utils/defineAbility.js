import { AbilityBuilder, createMongoAbility } from '@casl/ability'

export function updateAbilityFor(user) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility)

  if (user.role === 'admin') {
    can('manage', 'all')
  } else if (user.role === 'issuer') {
    can('create', 'Document')
  } else if (user.role === 'verifier') {
    can('read', 'Document')
    can('verify', 'Document')
  } else {
    can('read', 'Document')
  }
  return build()
}
