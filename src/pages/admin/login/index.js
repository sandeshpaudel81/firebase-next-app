import { withPublic } from '@/hooks/route'
import LoginView from '@/views/admin/auth/login'
import React from 'react'

const Login = () => {
    return (
        <div>
            <LoginView />
        </div>
    )
}

export default withPublic(Login)