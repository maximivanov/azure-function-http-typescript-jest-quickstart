import httpTrigger from '../index'
import fetch from 'node-fetch'
const { Response } = jest.requireActual('node-fetch')
import {
  runStubFunctionFromBindings,
  createHttpTrigger,
} from 'stub-azure-function-context'

jest.mock('node-fetch')

describe('azure function handler', () => {
  it('fails on missing ip parameter', async () => {
    const res = await mockedRequestFactory('')

    expect(res.statusCode).toEqual(400)

    const body = JSON.parse(res.body)
    expect(body.code).toEqual('inputValidationFailed')

    const mock = (fetch as unknown) as jest.Mock
    expect(mock).toHaveBeenCalledTimes(0)
  })

  it('returns city', async () => {
    const ip = '127.0.0.1'
    const city = 'Los Angeles'

    const mock = (fetch as unknown) as jest.Mock
    mock.mockResolvedValue(new Response(JSON.stringify({ city })))

    const res = await mockedRequestFactory(ip)

    expect(res.statusCode).toEqual(200)

    const body = JSON.parse(res.body)
    expect(body.city).toEqual(city)

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith(`https://ipinfo.io/${ip}/geo`)
  })
})

async function mockedRequestFactory(ip: string) {
  return runStubFunctionFromBindings(
    httpTrigger,
    [
      {
        type: 'httpTrigger',
        name: 'req',
        direction: 'in',
        data: createHttpTrigger(
          'GET',
          'http://example.com',
          {},
          {},
          undefined,
          { ip },
        ),
      },
      { type: 'http', name: '$return', direction: 'out' },
    ],
    new Date(),
  )
}
