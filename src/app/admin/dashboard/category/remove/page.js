import { getHost } from '@/app/actions'
import Remove from '@/components/admin/category/Remove'
import React from 'react'

const page = async () => {
    const host = await getHost()
    return (
        <Remove HOST={host}/>
    )
}

export default page