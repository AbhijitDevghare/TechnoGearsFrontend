function CategoriesCarousel()
{
    const categories = [
        "All","Mobiles","Headphone",

    ]

    return(
        <>
            <div className="categoryCaraousel">
                {/* <button className="bg-blue-700 w-[100px] h-[25px] flex items-center justify-center rounded-xl text-sm font-semibold cursor-pointer hover:bg-white hover:text-blue-700 transition-all duration-500 ease-out">
                         All
                    </button> */}
                {
                    

                categories.length > 0 &&
                categories.map((category) => (
                    <div key={category} className="">
                        <button className="categoryCarouselButton">
                            {category}
                        </button>

                    </div>
                ))
                }

            </div>
        </>
    )
}

export default CategoriesCarousel