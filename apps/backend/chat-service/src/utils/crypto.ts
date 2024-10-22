import crypto from 'crypto'

export const generateRoomId = (userId: string, companyId: string) => {
  const hash = crypto.createHash('sha256');

  hash.update(userId + companyId);
  return hash.digest('hex')
}