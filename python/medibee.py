import cv2 as cv
import matplotlib.pyplot as plt
import numpy as np
import easyocr
import tensorflow as tf
from fastapi import UploadFile, File
from PIL import Image
from io import BytesIO
from fastapi import FastAPI
import uvicorn
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

# Creating FastAPI instance
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def read_image(image_encoded):
  pil_image = Image.open(BytesIO(image_encoded))
  return pil_image

def predict(image):
  nparr = np.fromstring(image, np.uint8)
  img = cv.imdecode(nparr, cv.IMREAD_COLOR)

  width=300
  height=300
  dim=(width,height)
  img2 = cv.resize(img,dim,interpolation=cv.INTER_AREA)

  gray = cv.cvtColor(img2,cv.COLOR_BGR2GRAY)

  img_norm = cv.normalize(gray, None, 0.0, 255.0, cv.NORM_MINMAX, dtype=cv.CV_8UC1)

  kernel = np.ones((2,2),np.uint8)
  img_open = cv.morphologyEx(img_norm, cv.MORPH_OPEN, kernel)

  clahe = cv.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
  clahe_img = clahe.apply(img_norm,img_norm)

  ret , img_thresh=cv.threshold(img_norm, 150.0, 255.0, cv.THRESH_BINARY_INV + cv.THRESH_OTSU)

  cv.imwrite("/final_img.jpg",img_thresh)

  (x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
  print("x_train shape :", x_train.shape, 
        "\ny_train shape :", y_train.shape,
        "\nx_test shape  :", x_test.shape,
        "\ny_test shape  :", y_test.shape)

  np.random.seed(0)

  x_train = x_train.astype('float32') / 255
  x_test = x_test.astype('float32') / 255

  model = tf.keras.Sequential()


  # First Convolution Layer, Filters = 64, Kernel Size = 2x2, Stride = 1, Input Size = 28x28x1
  model.add(tf.keras.layers.Conv2D(filters=64, kernel_size=(2,2),strides=(1, 1), padding='same', activation='relu', input_shape=(28,28,1))) 

  # Subsampling Layer (Pooling Layer), Pool Size = 2x2
  model.add(tf.keras.layers.MaxPooling2D(pool_size=(2,2)))
  model.add(tf.keras.layers.Dropout(0.3))



  # Second Convolution Layer, Filters = 32, Kernel Size = 2x2, Stride = 1
  model.add(tf.keras.layers.Conv2D(filters=32, kernel_size=(2,2),strides=(1, 1), padding='same', activation='relu'))

  # Subsampling Layer (Pooling Layer), Pool Size = 2x2
  model.add(tf.keras.layers.MaxPooling2D(pool_size=(2,2)))
  model.add(tf.keras.layers.Dropout(0.3))


  model.add(tf.keras.layers.Flatten())


  # Fully Connected Layer, 1 Hidden Layer, Nodes = 256
  model.add(tf.keras.layers.Dense(256, activation='relu'))
  model.add(tf.keras.layers.Dropout(0.5))


  # Output layer, n = 10
  model.add(tf.keras.layers.Dense(10, activation='softmax'))

  model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

  x_train = x_train.reshape(-1,28, 28,1)
  x_test = x_test.reshape(-1,28, 28, 1)

  # model_log=model.fit(x_train, y_train, batch_size=60, epochs=10, verbose=1, validation_split=.3)

  score = model.evaluate(x_test, y_test, verbose=0)

  reader = easyocr.Reader(['en'])
  output = reader.readtext('/final_img.jpg')

  return output[-1][1].upper()

@app.post('/predict')
async def predict_output(file: UploadFile = File(...)):
  output = predict(await file.read())
  return {"medicine": output}