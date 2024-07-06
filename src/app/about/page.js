import AppBar from "@/components/AppBar";
import { jetbrains_mono } from "@/fonts/fonts";

export default function About() {
  return (
    <>
      <AppBar></AppBar>
      <div className="flex justify-center">
        <div className="mt-8 flex w-1/2 flex-col justify-center">
          <div className="m-2 mb-0 p-2 text-4xl">
            <h1 className={jetbrains_mono.className}>About</h1>
          </div>
          <div className="m-2 mb-0 p-2 pb-0 text-2xl text-teal-400">
            <h2 className={jetbrains_mono.className}>
              Aim behind FastDiagnose
            </h2>
          </div>
          <p className="m-2 mt-0 p-2 text-lg">
            FastDiagnose aims to use CNNs in order to make it easier for doctors
            to diagnose the diseases their patients have. The diagnosers
            available are included with the purpose of being easy to use and
            avoid potential misdiagnosis. Note that the diagnosis made may not
            always be accurate.
          </p>
          <div className="m-2 mb-0 p-2 pb-0 text-2xl text-teal-400">
            <h2 className={jetbrains_mono.className}>Diagnosers available</h2>
          </div>
          <p className="m-2 mt-0 mb-0 p-2 text-lg">
            Currently, FastDiagnose provide the following diagnosers:
          </p>
          <ol className="list-disc m-2 mt-0 p-2 text-lg">
              <li>
                Opthalmology
                <ol className="list-disc m-2 mt-0 p-2 pl-4">
                  <li>Diabetic Retinopathy (binary)</li>
                  <li>Diabetic Retinopathy (severity)</li>
                </ol>
              </li>
            </ol>
        </div>
      </div>
    </>
  );
}
