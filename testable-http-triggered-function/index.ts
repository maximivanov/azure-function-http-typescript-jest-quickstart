import { AzureFunction, Context } from '@azure/functions'
import { getIpInfo } from './ipinfo'
import { responseFactory, FunctionResponse } from './util/responseFactory'

const httpTrigger: AzureFunction = async function (
  context: Context,
): Promise<FunctionResponse> {
  const ip = context.req.query.ip
  if (!ip) {
    return responseFactory({ code: 'inputValidationFailed' }, 400)
  }

  const ipInfo = await getIpInfo(ip)

  return responseFactory({ city: ipInfo.city })
}

export default httpTrigger
