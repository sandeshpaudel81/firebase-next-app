import React from "react"

export default function ImageViewer() {

    // function closeModal() {
    //     setShowModal(false)
    // }

    // function handleClick(value) {
    //     setShowModal(true)
    // }

    return (
        <div className="min-h-screen w-screen fixed top-0 left-0 z-[100] bg-[rgb(0,0,0,0.8)] p-10">
            <img src="/assets/car1.jpg" className="max-w-full max-h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
        </div>
    )
}