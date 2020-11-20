import fetch from 'node-fetch'

interface IpInfoResponse {
  ip: string
  city: string
  region: string
  country: string
  loc: string
  postal: string
  timezone: string
  readme: string
}

export async function getIpInfo(ip: string): Promise<IpInfoResponse> {
  const url = `https://ipinfo.io/${ip}/geo`

  const res = await fetch(url)
  const json = res.json()

  return json
}
