import Image from "next/image";

const TeamSection = () => {
  return (
    <div className="mt-40 py-40 px-80 bg-zinc-900">
      <div className="flex justify-between items-end">
        <div className="text-9xl font-bold italic">
          <div>THE</div>
          <div
            style={{
              WebkitTextStroke: "2px white",
              color: "transparent",
            }}
          >
            TEAM.
          </div>
        </div>
        <p className="w-80 text-right uppercase font-mono">
          Kumpulan individu yang disatukan oleh satu hal: kemauan untuk bergerak
          dan berkembang. Di GPM, kamu tidak berlari sendirian.
        </p>
      </div>

      <div className="mt-40 grid grid-cols-3 gap-8">
        <div className="w-full">
          <div className="w-full overflow-hidden h-150">
            <Image
              src="/images/content/about-run.png"
              alt="GPM-RUNNER"
              width={400}
              height={400}
              className="object-cover w-full h-full grayscale hover:scale-105 hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="w-full mt-6 flex justify-between items-end">
            <h1 className="text-2xl font-bold italic">David "The Noss"</h1>
            <p className="text-xs font-mono text-zinc-500">LEAD PACER</p>
          </div>
        </div>
        <div className="w-full mt-20">
          <div className="w-full overflow-hidden h-150">
            <Image
              src="/images/content/about-run.png"
              alt="GPM-RUNNER"
              width={400}
              height={400}
              className="object-cover w-full h-full grayscale hover:scale-105 hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="w-full mt-6 flex justify-between items-end">
            <h1 className="text-2xl font-bold italic">Ajo "Knalpot"</h1>
            <p className="text-xs font-mono text-zinc-500">ROUTE ENGINEER</p>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full overflow-hidden h-150">
            <Image
              src="/images/content/about-run.png"
              alt="GPM-RUNNER"
              width={400}
              height={400}
              className="object-cover w-full h-full grayscale hover:scale-105 hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="w-full mt-6 flex justify-between items-end">
            <h1 className="text-2xl font-bold italic">Asep Gibrig</h1>
            <p className="text-xs font-mono text-zinc-500">Culture Lead</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
