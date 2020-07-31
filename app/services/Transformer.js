export const fromEmailToId = (emailId) => {
  return emailId.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
};

export const messagesPath = (fromId, toId) => {
  const fromEmailId = fromEmailToId(fromId);
  const toEmailId = fromEmailToId(toId);
  return fromEmailId > toEmailId
    ? fromEmailId + '-' + toEmailId
    : toEmailId + '-' + fromEmailId;
};
