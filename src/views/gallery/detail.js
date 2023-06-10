import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { db } from '../../../firebase-config'
import CenteredLoading from '@/components/common/Loader'

const GalleryDetailView = ({id}) => {
    const [gallery, setgallery] = useState(null)
    const [galleryLoading, setgalleryLoading] = useState(false)
    useEffect(() => {
        const getData = async (id) => {
            try {
              setgalleryLoading(true)
              const docRef = doc(db, "gallery", id);
              const docSnap = await getDoc(docRef);
              setgallery(docSnap.data())
              setgalleryLoading(false)
            } catch(err) {
              setgalleryLoading(false)
              toast.error("Error while fetching details.")
            }
        }
        if(db){
            getData(id)
        }
    }, [db, id])
    return (
        <div className='container mx-auto px-5 md:px-2 py-10'>
            {
                galleryLoading 
                ? 
                <CenteredLoading /> 
                :
                <div>
                    <div>
                        <h1 className='font-bold text-2xl'>{gallery?.name}</h1>
                    </div>
                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-8'>
                        {
                            gallery?.images?.map((im, index) => {
                                return <div key={index}><img src={im.image} alt={gallery?.name}/></div>
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default GalleryDetailView