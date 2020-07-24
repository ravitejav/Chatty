export const fromEmailToId = (emailId) => {
  return emailId.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
};
