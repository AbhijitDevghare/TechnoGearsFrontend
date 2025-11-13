import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HorizontalProductCarousel({ title, children }) {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="relative w-full px-6 py-8 mt-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
            
            <button 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-base-300 rounded-full p-2 shadow-md hover:bg-base-400 z-10"
                onClick={scrollLeft}
            >
                <ChevronLeft size={24} />
            </button>
            
            <div 
                ref={carouselRef} 
                className="flex overflow-x-auto no-scrollbar space-x-4 p-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {children}
            </div>
            
            <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-base-300 rounded-full p-2 shadow-md hover:bg-base-400 z-10"
                onClick={scrollRight}
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
}

export default HorizontalProductCarousel;
