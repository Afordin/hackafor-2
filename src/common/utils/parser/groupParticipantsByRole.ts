import { User } from '../../types';

/**
 * Concat the "administrador" object
 * Create grouped roles with the "roles" as unique "keys"
 * each grouped role has an array of users (User[])
 * example of result:
 * from this:
 * [
    { name: "jp", role: "back-end" },
    { name: "marcos", role: "back-end" },
    { name: "aforcita", role: "front-end" },
    { name: "unai", role: "front-end" },
    { name: "nico", role: "front-end" },
    { name: "ana", role: "front-end" },
  ]
  to this:
 * {
    'front-end': [
      { name: 'aforcita', role: 'front-end' },
      { name: 'unai', role: 'front-end' },
      { name: "nico", role: "front-end" },
      { name: "ana", role: "front-end" },
    ],
    'back-end': [
      { name: 'jp', role: 'back-end' },
      { name: 'marcos', role: 'back-end' },
    ]
   }
 */

export function groupParticipantsByRole(membersObj: User[], administratorObj: User) {
  const grouped = [administratorObj].concat(membersObj).reduce(
    // thanks Marcos <3!
    (acc, obj) => {
      if (!acc[obj.role]) {
        acc[obj.role] = [];
      }
      acc[obj.role].push(obj);
      return acc;
    },
    {} as Record<string, User[]>
  );
  return grouped;
}
