
export default function sendResponse<T>({ message, data }: { message: string, data?: T }) {
  return {
    message,
    data
  }
}