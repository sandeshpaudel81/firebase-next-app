import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'
import CenteredLoading from '@/components/common/Loader'

export function withPublic(Component) {
    return function WithPublic(props) {
        const auth = useAuth()
        const router = useRouter()
        if (auth.user) {
            router.push('/admin')
            return <CenteredLoading />
        }
        return <Component {...props} />
    }
}

export function withProtected(Component) {
    return function WithProtected(props) {
        const auth = useAuth()
        const router = useRouter()
        if (!auth.user) {
            router.push('/admin/login')
            return <CenteredLoading />
        }
        return <Component {...props} />
    }
}

export const AdminProtected = ({children}) => {
    const auth = useAuth()
    const router = useRouter()
    if (!auth.user) {
        router.push('/admin/login')
        return <CenteredLoading />
    }
    return (
        children
    )
}