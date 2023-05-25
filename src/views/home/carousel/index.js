import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarousel } from '../../../redux/slices/carouselSlice';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const Carousel = () => {

    const dispatch = useDispatch()
    const {data: slides, success: carouselSuccess} = useSelector(state => state.carousel.getCarousel)
    let autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const [currentSlide, setCurrentSlide] = useState(0)
    const slideLength = slides.length

    const nextSlide = () => {
        setCurrentSlide(currentSlide===slideLength-1 ? 0 : currentSlide+1)
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide===0 ? slideLength-1 : currentSlide-1)
    }

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime)
    }
    
    useEffect(() => {
        setCurrentSlide(0)
        if (!carouselSuccess){
            dispatch(fetchCarousel())
        }
    }, [dispatch, carouselSuccess])

    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval)
    }, [currentSlide])

    return (
        <div className='relative min-h-150px md:min-h-[300px]'>
            <button className='absolute left-0 inset-y-0 text-3xl md:text-5xl hover:bg-slate-800 hover:bg-opacity-20' onClick={prevSlide}><BsChevronLeft /></button>
            <button className='absolute right-0 inset-y-0 text-3xl md:text-5xl hover:bg-slate-800 hover:bg-opacity-20' onClick={nextSlide}><BsChevronRight /></button>
            <div className='flex justify-center absolute bottom-2 md:bottom-3 inset-x-0'>
                {slides?.map((slide, index) => (
                    <div className={index===currentSlide ? "h-1 w-1 md:h-2 md:w-2 bg-primaryL mx-2 rounded-full" : "h-1 w-1 md:h-2 md:w-2 bg-white mx-2 rounded-full"} key={index}></div>
                ))}
            </div>
            {
                slides?.map((slide, index) => {
                    return <div className={index === currentSlide ? "block" : "hidden"} key={index}>
                        <div className='h-[200px] md:h-[500px]'>
                            <img src={slide.imageUrl} alt={slide.caption} className='h-full w-full object-cover'/>
                        </div>
                        <div className='w-full md:w-9/12 md:absolute bottom-3 md:bottom-8 md:left-1/2 md:transform md:-translate-x-1/2'>
                            <p className='p-1 md:p-2 bg-primaryExtraLight bg-opacity-60 text-sm rounded-md text-center'>{slide.caption}</p>
                        </div>
                        <div className='h-[18px] md:h-[40px] bg-primaryDark'></div>
                    </div>
                })
            }
            
            
        </div>
    )
}

export default Carousel