import Card from "@/components/Card";
import AppBar from "@/components/AppBar";
import { jetbrains_mono, jetbrains_mono_light } from "@/fonts/fonts";

export default function Home() {
  const fields = [
    {
      name: "Opthalmology",
      icon: "/eyeIcon.svg",
      description: "This consists of diagnosers related to eye diseases.",
      page: "/opthalmology",
    },
  ];
  return (
    <>
      <AppBar></AppBar>
      <div className="flex justify-center">
        <div className="mt-8 flex w-1/2 flex-col justify-center">
          <div className="m-2 mb-0 p-2 text-4xl">
            <h1 className={jetbrains_mono.className}>Fields</h1>
          </div>
          <p className="m-2 mt-0 p-2">
            These are the different fields for which diagnosers are available.
          </p>
          <div className="flex">
            <Card modules={fields}></Card>
          </div>
        </div>
      </div>
    </>
  );
}
