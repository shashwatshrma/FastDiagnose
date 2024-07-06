# FastDiagnose
## About the Project

FastDiagnose aims to use CNNs in order to make it easier for doctors to diagnose the diseases their patients have. 

The diagnosers available are included with the purpose of being easy to use and avoid potential misdiagnosis. 

**Note that the diagnosis made may not always be accurate.**

## Models Used

Currently, FastDiagnose provide the following diagnosers:
- Opthalmology
	- Diabetic Retinopathy (binary) - This predicts whether a patient suffers from diabetic retinopathy or not.
	- Diabetic Retinopathy (severity) - This predicts the severity of diabetic retinopathy (from no diabetic retinopathy to proliferative diabetic retinopathy).

The machine learning models used are implemented using TensorFlowJS and developed using TensorFlow in Python. The code for the models used in this project can be found at:
- https://github.com/shashwatshrma/Diabetic-Retinopathy-CNN
 
## Setting up

First we need to setup the .env file at the root of the project

```
NEXT_PUBLIC_DR_BR_MODEL_PATH="insert CDN link"
NEXT_PUBLIC_DR_MULTI_MODEL_PATH="insert CDN link"
```

Now, depending on our use case, we run the development or production server.

To run the development server:

```
npm install
npm run dev
```

To run the production server:

```
npm install
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.