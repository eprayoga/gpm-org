import { Button } from "@/components/ui/button";
import { products } from "@/data/product-data";
import Image from "next/image";
import Link from "next/link";

const ShopSection = () => {
  return (
    <div className="mt-40 py-40 px-80 bg-zinc-900">
      <div className="flex justify-between items-end">
        <div className="text-8xl font-bold italic">SHOP.</div>
        <Link
          href={"/store"}
          className="text-right text-xs uppercase font-mono border-b border-white hover:scale-105 transition-all duration-300"
        >
          LIHAT SEMUA PRODUK
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2">
        {products.slice(0, 2).map((item) => (
          <div key={item.id} className="w-full p-10 border border-zinc-800">
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={item.variants[0].images[0]}
                alt="Image 1"
                className="object-cover w-full h-full grayscale hover:scale-105 hover:grayscale-0 transition-all duration-300"
                width={600}
                height={600}
              />
            </div>
            <div className="w-full flex justify-between items-start gap-6 mt-6">
              <div>
                <h1 className="text-2xl font-bold italic">{item.name}</h1>
                <p className="text-xs font-mono text-zinc-500 mt-2">
                  {item.description}
                </p>
              </div>
              <Button
                className="font-mono font-bold rounded-none cursor-pointer text-xs px-8 py-6"
                asChild
              >
                <Link href={`/store/product/${item.id}`}>LIHAT DETAIL</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopSection;
