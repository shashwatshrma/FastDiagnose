import { jetbrains_mono, jetbrains_mono_light } from "@/fonts/fonts.js";
import Link from "next/link";

export default function AppBar() {
  const appbar = [
    {
      name: "Github",
      page: "https://github.com/shashwatshrma/FastDiagnose",
    },
    {
      name: "About",
      page: "/about",
    },
  ];
  const buttons = appbar.map((page) => (
    <Link
      key={page.name}
      href={page.page}
      className="action:scale-100 m-4 rounded-xl border-2 border-teal-400 bg-gray-800 pb-2 pl-4 pr-4 pt-2 transition hover:scale-105 hover:text-teal-400"
    >
      <div className={jetbrains_mono_light.className}>{page.name}</div>
    </Link>
  ));
  return (
    <>
      <div className="mt-0 flex h-fit w-full border-b-2 border-teal-400 bg-gray-900 text-center">
        <Link
          className="action:scale-100 left-0 m-4 flex-shrink-0 pb-1 pl-4 pr-4 pt-2 text-xl transition hover:scale-105 hover:text-teal-400"
          href="/"
        >
          <div className={jetbrains_mono.className}>FastDiagnose</div>
        </Link>
        <div className="flex flex-grow justify-end text-center">{buttons}</div>
      </div>
    </>
  );
}
