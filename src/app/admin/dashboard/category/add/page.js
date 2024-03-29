import { getHost } from '@/app/actions'
import Add from '@/components/admin/category/Add'
import React from 'react'

const page = async () => {
    const host = await getHost()
    return (
        <Add HOST={host} />
    )
}

export default page