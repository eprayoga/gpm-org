import Image from "next/image";

const GallerySection = () => {
  return (
    <div className=" py-40 px-60">
      <div className="flex gap-10 items-center">
        <div className="text-6xl font-bold italic">GALLERY.</div>
        <hr className="w-full" />
      </div>

      <div className="w-full grid grid-cols-4 grid-rows-2 gap-4 mt-20">
        {/* Gambar besar */}
        <div className="relative col-span-2 row-span-2 overflow-hidden aspect-square">
          <Image
            src="/images/content/about-run.png"
            alt="Image 1"
            className="object-cover w-full h-full grayscale hover:scale-105 hover:grayscale-0 transition-all duration-300"
            width={600}
            height={200}
          />
        </div>

        {/* Gambar kecil */}
        {[2, 3, 4, 5].map((i) => (
          <div key={i} className="relative overflow-hidden aspect-square">
            <Image
              src={`/images/content/about-run.png`}
              alt={`Image ${i}`}
              className="object-cover w-full h-full grayscale hover:scale-105 hover:grayscale-0 transition-all duration-300"
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
