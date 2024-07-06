import AppBar from "@/components/AppBar";
import Card from "@/components/Card";
import { jetbrains_mono } from "@/fonts/fonts";

export default function Opthalmology() {
  const predictors = [
    {
      name: "Diabetic Retinopathy",
      icon: "/eyeIcon.svg",
      description:
        "This diagnostic model takes a fundus image and is able to determine the stage of diabetic retinopathy.",
      page: "/opthalmology/diabetic_retinopathy",
    },
  ];
  return (
    <>
      <AppBar></AppBar>
      <div className="flex justify-center">
        <div className="mt-8 flex w-1/2 flex-col justify-center">
          <div className="m-2 mb-0 p-2 text-4xl">
            <h1 className={jetbrains_mono.className}>Diseases</h1>
          </div>
          <p className="m-2 mt-0 p-2">
            Select which disease you want to diagnose.
          </p>
          <div className="flex">
            <Card modules={predictors}></Card>
          </div>
        </div>
      </div>
    </>
  );
}
