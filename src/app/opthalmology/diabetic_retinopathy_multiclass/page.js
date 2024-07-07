"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import AppBar from "@/components/AppBar";
import { jetbrains_mono } from "@/fonts/fonts";
import * as tf from "@tensorflow/tfjs";

export default function Diabetic_retinopathy() {
  let model = null;

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

  function indexOfMax(arr) {
    if (arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  }

  async function diagnose(image) {
    model = await tf.loadGraphModel(
      process.env.NEXT_PUBLIC_DR_MULTI_MODEL_PATH,
    );
    let prediction = await model.predict(image);
    let predictionArr = await prediction.array();
    console.log(predictionArr);
    await prediction.dispose();
    await image.dispose();
    await model.dispose();
    return indexOfMax(predictionArr[0]);
  }

  async function get_diagnosis() {
    if (fileLeft != "/uploadImage.svg") {
      setOutputLeft("Working...");
      let imageElement = document.querySelector("#leftEye");
      let imageTensor = tf.tidy(() => {
        return tf.browser
          .fromPixels(imageElement, 3)
          .resizeNearestNeighbor([224, 224])
          .expandDims()
          .toFloat()
          .div(255);
      });
      let leftRes = await diagnose(imageTensor);
      console.log(leftRes);
      await imageTensor.dispose();
      switch (leftRes) {
        case 0:
          setOutputLeft("No Diabetic Retinopathy.");
          break;
        case 1:
          setOutputLeft("Mild Diabetic Retinopathy Detected!");
          break;
        case 2:
          setOutputLeft("Moderate Diabetic Retinopathy Detected!");
          break;
        case 3:
          setOutputLeft("Severe Diabetic Retinopathy Detected!");
          break;
        case 4:
          setOutputLeft("Proliferative Diabetic Retinopathy Detected!");
          break;
      }
    }
    if (fileRight != "/uploadImage.svg") {
      setOutputRight("Working...");
      let imageElement = document.querySelector("#rightEye");
      let imageTensor = tf.browser
        .fromPixels(imageElement, 3)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()
        .div(255);
      let rightRes = await diagnose(imageTensor);
      console.log(rightRes);
      await imageTensor.dispose();
      switch (rightRes) {
        case 0:
          setOutputRight("No Diabetic Retinopathy.");
          break;
        case 1:
          setOutputRight("Mild Diabetic Retinopathy Detected!");
          break;
        case 2:
          setOutputRight("Moderate Diabetic Retinopathy Detected!");
          break;
        case 3:
          setOutputRight("Severe Diabetic Retinopathy Detected!");
          break;
        case 4:
          setOutputRight("Proliferative Diabetic Retinopathy Detected!");
          break;
      }
    }
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
