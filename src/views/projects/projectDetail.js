import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase-config'
import Link from 'next/link'
import CenteredLoading from '@/components/common/Loader'

const ProjectDetailView = ({id}) => {

  const [projectLoading, setprojectLoading] = useState(false)
  const [project, setproject] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
          setprojectLoading(true)
          const docRef = doc(db, "projects", id);
          const docSnap = await getDoc(docRef);
          setproject(docSnap.data())
          setprojectLoading(false)
      } catch(err) {
        console.log(err)
        setprojectLoading(false)
      }
    }
    getData()
  }, [id])

  return (
    <div className='container mx-auto px-5 md:px-2 py-10'>
      { !projectLoading && project ?
      <div>
        <div className='mb-5'>
          <h1 className='text-3xl font-bold'>{project?.title}</h1>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold'>Objective</p>
          <p>{project?.objectives}</p>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold'>Methodologies</p>
          <p>{project?.methodologies}</p>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold'>Project Area</p>
          <p>{project?.projectLocation}</p>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold'>Targeted Group</p>
          <p>{project?.targetedGroup}</p>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold'>Project Duration</p>
          <p>{project?.duration}</p>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold'>Outcomes</p>
          <p>{project?.outcomes}</p>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold'>Project Report</p>
          {
            project?.reportUrl.length > 0 ?
            <Link href={project?.reportUrl} target='_blank' className='text-primaryD hover:underline'>See report</Link>:
            null
          }
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold'>Project Status</p>
          <p className={project?.isCompleted ? "text-sdgGreen" : "text-sdgOrange"}>
            {project?.isCompleted ? "Completed" : "Ongoing"}
          </p>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold'>Collaborators</p>
          <div className='grid grid-cols-4 gap-5'>
            {
              project?.collaborators?.map((collab, index) => {
                return <div className='col-span-4 md:col-span-1' key={index}>
                  <img src={collab.imageUrl} alt={collab.name} className='w-1/2'/>
                  <p>{collab.name}</p>
                </div>
              })
            }
          </div>
        </div>
        <div className='grid grid-cols-3 gap-5 mb-5'>
          <p className='col-span-3 text-lg font-semibold'>Pictures</p>
          {
            project?.thumbnailImageUrl.length > 0 ?
            <div className='col-span-3 md:col-span-1'><img alt={project?.title} src={project?.thumbnailImageUrl}/></div>
            : null
          }
          {
            project?.images?.map((image, index) => {
              return <div className='col-span-3 md:col-span-1' key={index}><img src={image} alt={project?.title}/></div>
            })
          }
        </div>
      </div>
      : 
      <CenteredLoading />
      }
    </div>
  )
}

export default ProjectDetailView