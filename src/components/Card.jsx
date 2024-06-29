import { jetbrains_mono } from "@/fonts/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Card({ modules }) {
  return modules.map((module) => (
    <>
      <Link
        className="m-4 flex h-fit w-64 flex-col rounded-xl border-2 border-transparent bg-gray-800 p-2 text-center transition hover:scale-105 hover:border-current hover:border-teal-400 active:scale-100"
        href={module.page}
      >
        <Image
          src={module.icon}
          alt={module.name}
          width={500}
          height={500}
          className="w-fit p-6 pb-2 pt-2 dark:invert"
        ></Image>
        <h2 className="p-2 pl-4 pr-4 text-xl">
          <div className={jetbrains_mono.className}>{module.name}</div>
        </h2>
        <p className="p-2 text-base text-gray-400">{module.description}</p>
      </Link>
    </>
  ));
}
