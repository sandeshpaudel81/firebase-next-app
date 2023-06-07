import Layout from '@/views/Layout'
import ContactView from '@/views/contact'
import React from 'react'

const Contact = () => {
    return (
        <div>
            <ContactView />
        </div>
    )
}

export default Contact

Contact.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };