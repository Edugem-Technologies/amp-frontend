"use client"
// import Swiper core and required modules
import { A11y, Autoplay, Pagination } from "swiper/modules"

import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import { loginSwipperSectionContent } from "@/fixtures/LoginSwiperSectionContent"

const LoginSwiperSection = () => {
    return (
        <>
            <div className="login-swiper-images-container">
                <Swiper
                    // install Swiper modules
                    modules={[Pagination, A11y, Autoplay]}
                    slidesPerView={1}
                    navigation
                    loop={true}
                    autoplay={{ delay: 5000 }}
                    pagination={{ clickable: true, el: ".swiper-experince-pagination" }}
                >
                    {loginSwipperSectionContent.map((content, index) => (
                        <SwiperSlide className="slide" key={index}>
                            <div className=" image-container">
                                <img src={content.img} alt="course details" className="image" />
                            </div>
                            <div className="description">
                                <p>{content.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-experince-pagination"></div>
            </div>
        </>
    )
}

export default LoginSwiperSection
