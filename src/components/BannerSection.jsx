import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.webp";
import banner4 from "../assets/banner4.jpg";

const BannerSection = () => {
  return (
    <div className="relative">
      <div className="carousel w-full">
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src={banner1}
            className="w-full lg:h-[600px] object-cover"
            alt="Banner 1"
          />
          <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 transform flex justify-between">
            <a
              href="#slide4"
              className="btn btn-circle bg-red-500 hover:bg-red-700 text-white text-xl"
            >
              ❮
            </a>
            <a
              href="#slide2"
              className="btn btn-circle bg-red-500 hover:bg-red-700 text-white text-xl"
            >
              ❯
            </a>
          </div>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src={banner2}
            className="w-full lg:h-[600px] object-cover"
            alt="Banner 2"
          />
          <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 transform flex justify-between">
            <a
              href="#slide1"
              className="btn btn-circle bg-red-500 hover:bg-red-700 text-white text-xl"
            >
              ❮
            </a>
            <a
              href="#slide3"
              className="btn btn-circle bg-red-500 hover:bg-red-700 text-white text-xl"
            >
              ❯
            </a>
          </div>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src={banner3}
            className="w-full lg:h-[600px] object-cover"
            alt="Banner 3"
          />
          <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 transform flex justify-between">
            <a
              href="#slide2"
              className="btn btn-circle bg-red-500 hover:bg-red-700 text-white text-xl"
            >
              ❮
            </a>
            <a
              href="#slide4"
              className="btn btn-circle bg-red-500 hover:bg-red-700 text-white text-xl"
            >
              ❯
            </a>
          </div>
        </div>

        {/* Slide 4 */}
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src={banner4}
            className="w-full lg:h-[600px] object-cover"
            alt="Banner 4"
          />
          <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 transform flex justify-between">
            <a
              href="#slide3"
              className="btn btn-circle bg-red-500 hover:bg-red-700 text-white text-xl"
            >
              ❮
            </a>
            <a
              href="#slide1"
              className="btn btn-circle bg-red-500 hover:bg-red-700 text-white text-xl"
            >
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
