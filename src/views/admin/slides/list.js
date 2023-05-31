import PrimaryButton from '@/components/common/button';
import { fetchCarousel } from '@/redux/slices/carouselSlice';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const SlideList = () => {
  const dispatch = useDispatch();
    const {data: slides, success: carouselSuccess} = useSelector(state => state.carousel.getCarousel)

    useEffect(() => {
        if (!carouselSuccess){
            dispatch(fetchCarousel())
        }
    }, [dispatch, carouselSuccess])
  return (
    <div>
      <div className='flex justify-end py-2'>
        <PrimaryButton url='/admin/slides/add' dispText='Add New'/>
      </div>
      <div className="antialiased bg-gray-100 text-gray-600 px-5">
          <div className="flex flex-col justify-center">
              <div className="w-full bg-white">
                  <div className="overflow-x-auto p-3">
                      <table className="table-auto w-full">
                          <thead className="text-xs font-semibold uppercase text-gray-800 bg-gray-300">
                              <tr>
                                  <th className="p-2">
                                      <div className="font-semibold text-left">Image</div>
                                  </th>
                                  <th className="p-2">
                                      <div className="font-semibold text-left">Caption</div>
                                  </th>
                                  <th className="p-2">
                                      <div className="font-semibold text-left">Status</div>
                                  </th>
                                  <th className="p-2">
                                      <div className="font-semibold text-left">Uploaded Datetime</div>
                                  </th>
                                  <th></th>
                              </tr>
                          </thead>

                          <tbody className="text-sm divide-y divide-gray-400">
                              {slides.map((slide) => (
                              <tr key={slide.id}>
                                  <td className="p-2">
                                      <img src={slide.imageUrl} alt={slide.caption} className='h-[50px] w-[50px] object-cover'/>
                                  </td>
                                  <td className="p-2">
                                      <div className="font-medium">
                                          {slide.caption}
                                      </div>
                                  </td>
                                  <td className="p-2">
                                      <input type="checkbox" className="w-5 h-5" checked={slide.is_active} readOnly/>
                                  </td>
                                  <td className="p-2">
                                      <div className="font-medium">
                                          {slide.datetime}
                                      </div>
                                  </td>
                                  <td className="p-2">
                                      <div className="flex justify-center">
                                          <Link href={`/admin/slides/${slide.id}`}>
                                              <FaEdit className='text-2xl text-primary hover:text-primaryDark'/>
                                          </Link>
                                      </div>
                                  </td>
                              </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default SlideList