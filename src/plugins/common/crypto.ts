import crypto from 'crypto'

export function verify(data: string, sign: string, publicKey: string)
{
    /* const key = Buffer.from(publicKey, 'base64');
    console.log(key) */
    return crypto.verify(
        'rsa-sha256',
        Buffer.from(data),
        { key: `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----` },
        Buffer.from(sign, 'base64')
    )
}