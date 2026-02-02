import Image from "next/image";

const AboutSection = () => {
  return (
    <div className="relative w-full px-60">
      <span className="absolute top-0 inline-block rotate-90 origin-bottom-left tracking-widest uppercase text-zinc-500 font-mono text-xs">
        E S T A B L I S H E D <span className="ml-4"></span> M M X X I V
      </span>
      <div className="flex gap-20 justify-between items-start">
        <div className="ml-20">
          <div className="text-8xl font-bold italic">
            <div>THE</div>
            <div
              style={{
                WebkitTextStroke: "2px white",
                color: "transparent",
              }}
            >
              JOURNEY.
            </div>
          </div>
          <div className="font-mono font-bold mt-4 text-zinc-500">
            BELIEVE IN EVERY STEP
          </div>

          <div className="w-full flex flex-col gap-6 mt-8 text-zinc-500 text-lg">
            <p>
              <span className="text-white">Groovy Pace Miles (GPM)</span> bukan
              sekadar komunitas lari. Kami lahir dari keyakinan bahwa hidup yang
              lebih baik dimulai dari langkah yang konsisten.
            </p>
            <p>
              Kami percaya berlari bukan soal siapa yang paling cepat, tetapi
              siapa yang paling menikmati perjalanannya. Setiap langkah punya
              ritme. Setiap ritme punya cerita.
            </p>
            <p>
              Setiap kilometer adalah proses menuju versi diri yang lebih
              kuat—secara fisik, mental, dan karakter. Kami adalah ruang bagi
              mereka yang ingin bergerak maju dalam hidup.
            </p>
          </div>
        </div>

        <div className="relative border border-zinc-800 w-3/5 h-160 p-4">
          <Image
            src="/images/content/about-run.png"
            alt="GPM-RUNNER"
            width={400}
            height={400}
            className="object-cover w-full h-full grayscale"
          />

          <div className="absolute -left-8 -bottom-8 w-60 h-60 p-10 bg-white">
            <Image
              src="/images/content/about-run-2.png"
              alt="GPM-RUNNER-2"
              width={400}
              height={400}
              className="object-cover w-full h-full grayscale"
            />
          </div>
        </div>
      </div>

      <div className="mt-40 flex justify-between">
        <div className="bg-white text-zinc-900 border-zinc-800 p-10">
          <h1 className="text-4xl font-black italic">GROOVY</h1>
          <p className="mt-4 text-md">
            Ritme yang asik, mengalir, dan penuh energi. Saat langkah bertemu
            irama, tubuh dan pikiran bergerak selaras.
          </p>
        </div>
        <div className="bg-white text-zinc-900 border-x border-zinc-800 p-10">
          <h1 className="text-4xl font-black italic">PACE</h1>
          <p className="mt-4 text-md">
            Kami menghargai tempo. Bukan tentang memaksa, melainkan menemukan
            kecepatan yang pas. Konsistensi di atas ego.
          </p>
        </div>
        <div className="bg-white text-zinc-900 border-zinc-800 p-10">
          <h1 className="text-4xl font-black italic">MILES</h1>
          <p className="mt-4 text-md">
            Jarak yang ditempuh dengan dedikasi. Setiap mile mencerminkan
            proses, bukan sekadar angka di jam tangan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
