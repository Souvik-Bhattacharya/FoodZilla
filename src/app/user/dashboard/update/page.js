import { getHost } from '@/app/actions'
import Password from '@/components/user/Password'
import React from 'react'

const page = async () => {
    const host = await getHost()
    return (
        <Password HOST={host} />
    )
}

export default page