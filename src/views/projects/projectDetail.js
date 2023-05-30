import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase-config'
import Link from 'next/link'

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
          console.log(docSnap.data())
          setprojectLoading(false)
      } catch(err) {
        console.log(err)
        setprojectLoading(false)
      }
    }
    getData()
  }, [])

  return (
    <div className='container mx-auto py-10'>
      { project ?
      <div>
        <div className='mb-5'>
          <h1 className='text-3xl font-bold'>{project.title}</h1>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold italic'>Objective</p>
          <p>{project.objectives}</p>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold italic'>Methodologies</p>
          <p>{project.methodologies}</p>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold italic'>Project Area</p>
          <p>{project.projectLocation}</p>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold italic'>Targeted Group</p>
          <p>{project.targetedGroup}</p>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold italic'>Project Duration</p>
          <p>{project.duration}</p>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold italic'>Outcomes</p>
          <p>{project.outcomes}</p>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold italic'>Project Report</p>
          <Link href={project.reportUrl} className='text-primaryD hover:underline'>See report</Link>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold italic'>Project Status</p>
          <p className={project.isCompleted ? "text-sdgGreen" : "text-sdgOrange"}>
            {project.isCompleted ? "Completed" : "Ongoing"}
          </p>
        </div>
        <div className='mb-5'>
          <p className='text-lg font-semibold italic'>Collaborators</p>
          <div className='grid grid-cols-4 gap-5'>
            {
              project.collaborators?.map((collab, index) => {
                return <div className='col-span-4 md:col-span-1' key={index}>
                  <img src={collab.imageUrl} className='w-1/2'/>
                  <p>{collab.name}</p>
                </div>
              })
            }
          </div>
        </div>
        <div className='grid grid-cols-3 gap-5 mb-5'>
          <p className='col-span-3 text-lg font-semibold italic'>Pictures</p>
          <div><img src={project.thumbnailImageUrl}/></div>
          {
            project.images?.map((image, index) => {
              return <div className='col-span-3 md:col-span-1' key={index}><img src={image}/></div>
            })
          }
        </div>
      </div>
      : 
      <div></div> 
      }
    </div>
  )
}

export default ProjectDetailView