export interface FunctionResponse {
  statusCode: number
  body: string
  headers: Record<string, string>
}

export function responseFactory(body: any, httpCode = 200): FunctionResponse {
  return {
    statusCode: httpCode,
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
  }
}
