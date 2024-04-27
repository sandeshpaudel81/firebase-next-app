import PrimaryButton from '@/components/common/button';
import { fetchProjects } from '@/redux/slices/projectSlice';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
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
        <div className='grid grid-cols-4 gap-5 py-5 md:py-10'>
            <div className='col-span-4 flex justify-end'>
                <PrimaryButton url='/admin/projects/add' dispText='Add New'/>
            </div>
            { projects?.map((project) => {
                return <Link key={project.id} href={`/admin/projects/${project.id}`} className='col-span-4 md:col-span-1'>
                    <div className=' bg-primaryExtraLight hover:bg-primaryLight rounded-md p-2 group'>
                        <p className={project.isCompleted ? "text-sdgGreen text-[12px]" : "text-sdgOrange text-[12px]"}>
                            {project.isCompleted ? "Completed" : "Ongoing"}
                        </p>
                        <p className='font-medium text-lg md:text-xl'>{project.title}</p>
                    </div>
                </Link>
            })}
            
        </div>
    )
}

export default ProjectList