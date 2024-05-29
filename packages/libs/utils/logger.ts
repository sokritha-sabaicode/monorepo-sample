import { prettyPrint } from '@base2/pretty-print-object';

export default function logger(message: string) {
  console.log(`message logs: ${message}`)
}

export function loggerBeautifulObject(data: object) {
  console.log(prettyPrint(data, { indent: ' ', singleQuotes: false }))
}