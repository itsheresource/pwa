export default function handleSeparateName(name) {
  let firstName = '';
  let lastName = '';
  const trimName = name.trim();
  const partsArray = trimName.split(' ');
  if (partsArray.length === 1) {
    [firstName] = partsArray;
  } else if (partsArray.length > 1) {
    lastName = partsArray.pop();
    while (!lastName && partsArray.length > 1) lastName = partsArray.pop();

    firstName = partsArray.join(' ');
  }
  return { firstName, lastName };
}
