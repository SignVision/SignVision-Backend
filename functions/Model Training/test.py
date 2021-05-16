import os
import numpy as np 
import pandas as pd 
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras
from keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPool2D, Flatten, Dense, Dropout
from keras.callbacks import EarlyStopping 
import cv2

new_model = tf.keras.models.load_model('./model/my-model2.h5')


for filename in os.listdir('./data/asl_alphabet_test/'):

    temp_img = cv2.imread('./data/asl_alphabet_test/'+filename)
    temp_img = cv2.resize(temp_img, (32, 32))    

    img_array = keras.preprocessing.image.img_to_array(temp_img)
    img_batch = np.expand_dims(img_array, axis=0)
    img_preprocessed = tf.keras.applications.resnet50.preprocess_input(img_batch)

    prediction = new_model.predict(img_preprocessed)
    prediction = np.argmax(prediction[0])

    outputs = ['A', 'B', 'C', 'D', 'del', 'E', 'F', 'G', 'H', 'I', 'J',
                'K', 'L', 'M', 'N', 'nothing', 'O', 'P', 'Q', 'R', 'S', 'space',
                'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    if (prediction < len(outputs)):
        print(filename, outputs[prediction])
