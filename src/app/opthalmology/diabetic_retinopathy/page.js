"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import AppBar from "@/components/AppBar";
import { diagnose } from "@/app/lib/diabetic_retinopathy.js";
import { jetbrains_mono } from "@/fonts/fonts";
import * as tf from "@tensorflow/tfjs";

export default function diabetic_retinopathy() {
  let model=null;
  
  const [fileLeft, setFileLeft] = useState("/uploadImage.svg");
  const [fileRight, setFileRight] = useState("/uploadImage.svg");
  const [outputLeft, setOutputLeft] = useState(
    "Enter image and click the Diagnose button",
  );
  const [outputRight, setOutputRight] = useState(
    "Enter image and click the Diagnose button",
  );

  function show_left(e) {
    setFileLeft(URL.createObjectURL(e.target.files[0]));
  }

  function show_right(e) {
    setFileRight(URL.createObjectURL(e.target.files[0]));
  }
  
  async function diagnose(image)
  {
    if(model == null)
    {
      model = await tf.loadLayersModel("http://localhost:8081/model.json");
    }
    let prediction = model.predict(image);
    console.log(prediction);
    return 0;
  }
  function get_diagnosis() {
    if (fileLeft != "/uploadImage.svg") {
      let imageElement = document.querySelector("#leftEye");
      let imageTensor = tf.browser
        .fromPixels(imageElement, 3)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()
        .div(255);
      let leftRes = diagnose(imageTensor);  
      switch (leftRes) {
        case 0:
          setOutputLeft("No Diabetic Retinopathy.");
          break;
        case 1:
          setOutputLeft("Diabetic Retinopathy Detected!");
          break;
      }
    }
    /*
    if (fileRight != "/uploadImage.svg") {
      let  imageElement = fileRight;
      let imageTensor = tf.browser
        .fromPixels(imageElement, 1)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat();
      let rightRes = diagnose(imageTensor);
      switch (rightRes) {
        case 0:
          setOutputRight("No Diabetic Retinopathy.");
          break;
        case 1:
          setOutputRight("Diabetic Retinopathy Detected!");
          break;
      }
    }
    */
  }

  return (
    <>
      <AppBar></AppBar>
      <div className={jetbrains_mono.className}>
        <div className="flex justify-center">
          <div className="mt-8 flex w-1/2 flex-col justify-center">
            <div className="flex">
              <div className="m-4 mr-0 h-fit w-1/2 rounded-xl rounded-r-none border-r-2 border-dashed bg-gray-800 p-2 text-center">
                <div className="flex flex-col">
                  <Image
                    src={fileLeft}
                    alt="uploadImage"  
                    id="leftEye"
                    priority={true}
                    width={500}
                    height={500}
                    className="max-w-full rounded-xl p-6 pb-2 pt-2"
                  ></Image>
                  <label
                    className="action:scale-100 m-4 h-auto w-fit rounded-xl border-2 border-teal-400 bg-gray-800 p-2 pb-2 pl-4 pr-4 pt-2 text-xl transition hover:scale-105 hover:text-teal-400"
                    htmlFor="left-eye"
                  >
                    Upload Left Eye Fundus Image
                  </label>
                  <input
                    id="left-eye"
                    className="action:scale-100 m-4 hidden h-auto w-fit rounded-xl border-2 border-teal-400 bg-gray-800 pb-2 pl-4 pr-4 pt-2 transition hover:scale-105 hover:text-teal-400"
                    type="file"
                    accept="image/png image/jpeg image/jpg"
                    onChange={show_left}
                  ></input>
                </div>
              </div>
              <div className="m-4 ml-0 flex h-fit w-1/2 flex-col rounded-xl rounded-l-none border-l-2 border-dashed bg-gray-800 p-2 text-center">
                <Image
                  src={fileRight}
                  alt="uploadImage"
                  id="rightEye"
                  priority={true}
                  width={500}
                  height={500}
                  className="max-w-full rounded-xl p-6 pb-2 pt-2"
                ></Image>
                <label
                  className="action:scale-100 m-4 h-auto w-fit rounded-xl border-2 border-teal-400 bg-gray-800 p-2 pb-2 pl-4 pr-4 pt-2 text-xl transition hover:scale-105 hover:text-teal-400"
                  htmlFor="right-eye"
                >
                  Upload Right Eye Fundus Image
                </label>
                <input
                  id="right-eye"
                  className="action:scale-100 m-4 hidden h-auto w-fit rounded-xl border-2 border-teal-400 bg-gray-800 pb-2 pl-4 pr-4 pt-2 transition hover:scale-105 hover:text-teal-400"
                  type="file"
                  accept="image/png image/jpeg image/jpg"
                  onChange={show_right}
                ></input>
              </div>
            </div>
            <div className="flex justify-center">
              <Button text="Get Diagnosis" fun={get_diagnosis}></Button>
            </div>
            <div className="m-4 flex justify-center">
              <p
                disabled
                className="flex w-1/2 resize-none justify-center rounded-xl rounded-r-none border-r-2 border-dashed bg-gray-800 p-2 text-center"
              >
                {outputLeft}
              </p>
              <p
                disabled
                className="flex w-1/2 resize-none justify-center rounded-xl rounded-l-none border-l-2 border-dashed bg-gray-800 p-2 text-center"
              >
                {outputRight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
