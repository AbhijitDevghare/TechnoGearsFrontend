import HeroImg from "../../assets/hero.avif";

function HeroSection() {
  return (
    <>
      <br /> <br />

      <section 
        className="relative w-full h-[50vh] flex items-center justify-center bg-cover bg-center" 
        style={{ backgroundImage: `url(${HeroImg})` }} // ✅ Correct way to use imported images
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Hero Content */}
        <div className="relative text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Discover the Future of Technology</h1>
          <p className="text-lg md:text-xl mb-6">Shop the latest gadgets, electronics, and more at unbeatable prices.</p>

          {/* Call-to-Action Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
            Shop Now
          </button>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
