import Link from 'next/link'
import React from 'react'

const ProjectBox = ({project}) => {
  return (
    <div className='col-span-2 md:col-span-1'>
        <Link href={`/projects/${project.id}`}>
          <div className='grid grid-cols-5 bg-slate-300 shadow-sm shadow-white hover:shadow-md hover:shadow-white duration-500 rounded-lg overflow-hidden group'>
              <div className='col-span-5 md:col-span-2 overflow-hidden'>
                  {
                    project?.thumbnailImageUrl.length > 0 ? 
                    <img src={project?.thumbnailImageUrl} alt={project.title} className="w-full h-[150px] md:h-[200px] object-cover object-center"/> :
                    project?.images.length > 0 ?
                    <img src={project?.images[0]} alt={project.title} className="w-full h-[150px] md:h-[200px] object-cover object-center"/> :
                    <img src='/assets/meta_images/projects.png' alt={project.title} className="w-full h-[150px] md:h-[200px] object-cover object-center"/>
                  }
              </div>
              <div className='col-span-5 md:col-span-3 relative p-2'>
                  <div className='w-5 h-5 rotate-45 bg-slate-300 absolute left-1/2 -top-2 md:top-1/2 md:-left-2'></div>
                  <p className={project.isCompleted ? "text-sdgGreen text-[12px]" : "text-sdgOrange text-[12px]"}>
                    {project.isCompleted ? "Completed" : "Ongoing"}
                  </p>
                  <h2 className='font-bold text-xl group-hover:text-primaryD'>{project.title}</h2>
                  <p className='h-16 md:h-24 overflow-hidden'>{project.objectives}</p>
                  <button className='bg-primary text-white px-5 py-2 rounded-lg mt-5 group-hover:bg-primaryDark'>See More...</button>
              </div>
          </div>
        </Link>
    </div>
  )
}

export default ProjectBox