import React, { useEffect } from 'react'

const NewsDetail = ({id}) => {
    useEffect(() => {
        console.log(id)
    }, [])
    
    return (
        <div>
            NewsDetail
        </div>
    )
}

export default NewsDetail