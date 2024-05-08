import DonorsHomeView from '@/views/home/DonorsHomeView';
import NewsBox from '@/components/common/NewsBox';
import Layout from '@/views/Layout';
import Carousel from '@/views/home/carousel';
import Link from 'next/link';
import { MdKeyboardArrowRight } from "react-icons/md";
import { fetchProjects } from '@/redux/slices/projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ProjectBox from '@/components/common/ProjectBox';
import { fetchNews } from '@/redux/slices/newsSlice';
import CenteredLoading from '@/components/common/Loader';
import {NextSeo} from 'next-seo'

export default function Home() {
    const dispatch = useDispatch();
    const {data: projects, success: projectSuccess, loading:projectLoading} = useSelector(state => state.project.getProject);
    const {data: news, success: newsSuccess, loading:newsLoading} = useSelector(state => state.news.getNews);
    const {loading:dpLoading} = useSelector(state => state.donorsPartners.getDonorsPartners);
    const {loading:carouselLoading} = useSelector(state => state.carousel.getCarousel)

    useEffect(() => {
        if (!projectSuccess){
            dispatch(fetchProjects())
        }
    }, [dispatch, projectSuccess]);

    useEffect(() => {
        if (!newsSuccess){
            dispatch(fetchNews())
        }
    }, [dispatch, newsSuccess]);


  return (
    <>
        <NextSeo
            title="Home | KADAM Myagdi"
            description="Kaligandaki Community Development Munch (KADAM), registered according to the Institution Registration Act of 2034 BS  in the local administration in Myagdi district in 2056 BS, is an unbroken community-based national NGO dedicated to promoting human rights and empowerment in the community."
            keywords="kadam myagdi, vmgo of ngo, vision of ngo"
            openGraph={{
                type: 'website',
                url: 'https://kadammyagdi.org.np',
                description: "Kaligandaki Community Development Munch (KADAM), registered according to the Institution Registration Act of 2034 BS  in the local administration in Myagdi district in 2056 BS, is an unbroken community-based national NGO dedicated to promoting human rights and empowerment in the community.",
                images: [{
                    url: 'https://www.kadammyagdi.org.np/assets/meta_images/homepage.png',
                    width: 1200,
                    height: 630,
                    alt: 'Kaligandaki Community Development Munch (KADAM) - Official Website',
                }],
                site_name: 'Kaligandaki Community Development Munch (KADAM) Myagdi'
            }}
        />
    
    <main>
        {
            carouselLoading? 
            <div className='h-screen w-screen fixed top-0 left-0 z-[100] bg-[rgb(255,255,255,0.8)] p-10'>
                <div className='mt-48'><CenteredLoading /></div>
            </div>:null
        }
        
        <Carousel />

        {/* Message From Chairperson */}
        <div className='bg-primaryExtraLight'>
            <div className='container mx-auto py-20 px-5'>
                <div className='border-l-8 border-primary px-5'>
                    <h2 className='text-primary font-bold text-3xl'>Message From <span className='text-primaryDark'>Chairman</span></h2>
                    <p className='uppercase text-gray-600 text-sm font-medium mt-2'>Welcome message | What is Kadam? | What We Do</p>
                </div>
                <div className='grid grid-cols-4 mt-5 md:mt-10 gap-5'>
                    <div className='col-span-4 md:col-span-1'>
                        <div>
                            <img src='/assets/chairman-image.png' alt='Hari Prasad Paudel - Chairman, KADAM' className='w-5/12 mx-auto border-2 border-primary'/>
                        </div>
                    </div>
                    <div className='col-span-4 md:col-span-3'>
                        <div>
                            <h2 className='uppercase text-xl font-semibold text-primary'>Hari Prasad Paudel</h2>
                            <p className='text-sm font-medium text-gray-400'>Chairman, KADAM</p>
                        </div>
                        <p className='mt-8'>संस्थाको आधिकारिक सूचनामूलक वेबसाइटमा यहाँ लाई स्वागत छ।
                            कालिगण्डकी सामुदायिक विकास मञ्च (कदम) म्याग्दी २०५६ सालमा स्थानिय प्रशासनमा संस्था दर्ता ऐन २०३४ अनुसार दर्ता भै अविच्छिन्न समुदायमा कार्यरत मानव अधिकारमुखि अविच्छिन्न उत्तराधिकारीवाला राष्ट्रिय गैह्रसरकारी संस्था हो। संस्था स्थापना हुनु अगाबै वि.सं. २०५५ साल देखि अनवरत रुपमा संस्था स्थापनाका उद्देश्य र नागरिक सरोकारका विषयमा केन्द्रित रही म्याग्दी पर्वत बाग्लुङ जिल्लामा कार्यरत रहेको छ। संस्थाले नेपाल सरकारले लिएका दिगो विकास लक्ष्य तथा सहस्राब्दी विकास लक्ष्य अनुरुप आफ्ना कार्यक्रमहरु सञ्चालन गरिरहेको छ। अधिकारमुखी अवधारणामा रहेर स्थानीय आवश्यकता अनुसार स्थानीय साझेदार संस्थाहरु का साथै बिभिन्न दातृनिकाय संगको सहकार्यमा लक्षित वर्ग केन्द्रित भै स्वास्थ्य, महिला स्वास्थ्य, शिक्षा, आय आर्जन का क्षेत्रमा जनचेतना मुलक कार्यक्रम, आवश्यता सम्वोधन गर्नका लागि सामाग्री सहयोग, स्थानिय सरकार संगको सहकार्यमा निर्माणका काममा साझेदारी गर्नुका साथै पैरवी समेत गर्ने कार्य गरिरहेको छ। 
                            वेबसाइट अवलोकन गरिसकेपछी केही जिज्ञासा वा सुझावहरु भएमा सुझाव तथा प्रतिक्रिया दिनुहुन अनुरोध गर्दछु।
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Projects */}
        <div className='bg-slate-900'>
            <div className='container mx-auto px-5 py-10 md:py-20'>
                <div className='border-l-8 border-primary px-5'>
                    <h2 className='text-primary font-bold text-3xl'>Our <span className='text-white'>Projects</span></h2>
                    <p className='uppercase text-gray-400 text-sm font-medium mt-2'>since 2000</p>
                </div>
                {
                    projectLoading
                    ?
                    <CenteredLoading />
                    :
                    <div className='grid grid-cols-2 gap-10 mt-5 md:mt-10'>
                        {projects?.filter((item, index) => index<4).map((project) => (
                            <ProjectBox project={project} key={project.id}/>
                        ))}
                    </div>
                }
                <div className='flex justify-end mt-5'>
                    <Link href="/projects" className='uppercase text-gray-400 hover:text-white'>
                        <p className='flex items-center font-medium'>See More <MdKeyboardArrowRight className='ml-3'/></p>
                    </Link>
                </div>
            </div>
        </div>

        {/* News */}
        <div className='bg-white'>
            <div className='container mx-auto px-5 py-10 md:py-20'>
                <div className='border-l-8 border-primary px-5'>
                    <h2 className='text-primary font-bold text-3xl'>News / <span className='text-primaryDark'>Events</span></h2>
                    <p className='uppercase text-gray-600 text-sm font-medium mt-2'>Programs | Meetups | Affairs</p>
                </div>
                {
                    newsLoading
                    ?
                    <CenteredLoading />
                    :
                    news.length > 0 
                    ?
                    <div className='grid grid-cols-4 gap-10 mt-5 md:mt-10'>
                        {news.map((item, index) => {
                            if (index < 4) {
                                return <NewsBox news={item} key={item.id}/>
                            }
                        }
                        )}
                    </div>
                    :
                    <p className='mt-5 md:mt-10 text-center text-red-600'>Oops, No news have been uploaded yet.</p>
                }
                <div className='flex justify-end mt-5'>
                    <Link href="/news" className='uppercase text-gray-600 hover:text-black'>
                        <p className='flex items-center font-medium'>See more <MdKeyboardArrowRight className='ml-3'/></p>
                    </Link>
                </div>
            </div>
        </div>

        {/* Get Involved */}
        <div className='bg-slate-900'>
            <div className='container mx-auto px-5 py-10 md:py-20'>
                <div className='border-l-8 border-primary px-5'>
                    <h2 className='text-primary font-bold text-3xl'>Get <span className='text-white'>Involved</span></h2>
                    <p className='uppercase text-gray-400 text-sm font-medium mt-2'>become part of the organization</p>
                </div>
                <div className='grid grid-cols-2 gap-10 mt-5 md:mt-10'>
                    <div className='col-span-2 md:col-span-1 grid grid-cols-3 px-20 gap-5 md:gap-2'>
                        <div className='col-span-3 md:col-span-1 md:pt-[100px]'>
                            <div className='bg-sdgOrange'>
                                <h3 className='uppercase font-semibold text-white p-2'>Career / Volunteer</h3> 
                                <Link href="/donate"><p className='text-slate-200 pl-2 hover:text-primaryDark'>Vacancies</p></Link>
                                <img src="/assets/vacancies.png" alt='Job vacancies in KADAM'/>
                            </div>
                        </div>
                        <div className='col-span-3 md:col-span-1'>
                            <div className='bg-sdgYellow'>
                                <h3 className='uppercase font-semibold text-white p-2'>Donate For Change</h3>
                                <Link href="/donate"><p className='text-slate-200 pl-2 hover:text-primaryDark'>Donate now</p></Link>
                                <img src="/assets/donation.png" alt='Donate for KADAM'/>
                            </div>
                        </div>
                        <div className='col-span-3 md:col-span-1 md:pt-[100px]'>
                            <div className='bg-sdgGreen'>
                                <h3 className='uppercase font-semibold text-white p-2'>Work In A Team</h3>
                                <Link href="/donate"><p className='text-slate-200 pl-2 hover:text-primaryDark'>Become a member</p></Link>
                                <img src="/assets/workwithus.png" alt='Work with us in KADAM'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2 md:col-span-1'>
                        <img src="/assets/get-involved-image.png" alt='Work with us in KADAM Myagdi'/>
                    </div>
                </div>
            </div>
        </div>

        {/* Donors and Partners */}
        <div className='bg-primaryExtraLight'>
            <div className='container mx-auto px-5 py-10 md:py-20'>
                <div className='border-l-8 border-primary px-5'>
                    <h2 className='text-primary font-bold text-3xl'>Donors <span className='text-primaryDark'>& Partners</span></h2>
                    <p className='uppercase text-gray-600 text-sm font-medium mt-2'>With whom we work</p>
                </div>
                {
                    dpLoading
                    ?
                    <CenteredLoading />
                    :
                    <div>
                        <DonorsHomeView />
                        <div className='flex justify-end mt-5'>
                            <Link href="/about/donors-partners" className='uppercase text-gray-600 hover:text-black'>
                                <p className='flex items-center font-medium'>See details <MdKeyboardArrowRight className='ml-3'/></p>
                            </Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    </main>
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
