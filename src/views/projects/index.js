import ProjectBox from '@/components/common/ProjectBox'
import { fetchProjects } from '@/redux/slices/projectSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ProjectList = () => {
  const dispatch = useDispatch();
  const {data: projects, success: projectSuccess} = useSelector(state => state.project.getProject);

    useEffect(() => {
        if (!projectSuccess){
            dispatch(fetchProjects())
        }
    }, [dispatch, projectSuccess]);
  return (
        <div className='container mx-auto px-5 py-10 md:py-20'>
            <div className='border-l-8 border-primary px-5'>
                <h2 className='text-primary font-bold text-3xl'>Our <span className='text-primaryDark'>Projects</span></h2>
                <p className='uppercase text-gray-600 text-sm font-medium mt-2'>since 2000</p>
            </div>
          <div className='grid grid-cols-2 gap-10 mt-5 md:mt-10'>
              {projects.map((project) => (
                  <ProjectBox project={project} key={project.id}/>
              ))}
          </div>
      </div>
  )
}

export default ProjectList