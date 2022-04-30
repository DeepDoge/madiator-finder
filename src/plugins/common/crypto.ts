import crypto from 'crypto'

export function verify(data: string, sign: string, publicKey: string)
{
    if (publicKey.length !== 65) throw new Error("Invalid public key.")
    return crypto.verify(
        'rsa-sha1',
        crypto.createHash('sha1').update(Buffer.from(data)).digest(),
        { key: `-----BEGIN PUBLIC KEY-----\nMEwwDQYJKoZIhvcNAQEBBQADOwAwOAIxA${publicKey}IDAQAB\n-----END PUBLIC KEY-----` },
        Buffer.from(sign, 'base64')
    )
}