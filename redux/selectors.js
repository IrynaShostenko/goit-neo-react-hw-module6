export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.filters.name;

export const selectVisibleContacts = state => {
  const filter = selectFilter(state).trim().toLowerCase();
  const items = selectContacts(state);
  if (!filter) return items;
  return items.filter(c => c.name.toLowerCase().includes(filter));
};
