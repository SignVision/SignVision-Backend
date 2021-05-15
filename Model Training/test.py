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

new_model = tf.keras.models.load_model('./Model Training/model/my-model.h5')


for filename in os.listdir('./Model Training/data/asl_alphabet_test/'):
    img = keras.preprocessing.image.load_img('./Model Training/data/asl_alphabet_test/'+filename)
    img_array = keras.preprocessing.image.img_to_array(img)
    img_batch = np.expand_dims(img_array, axis=0)
    img_preprocessed = tf.keras.applications.resnet50.preprocess_input(img_batch)

    prediction = new_model.predict(img_preprocessed)
    prediction = np.argmax(prediction[0])

    outputs = ['A', 'B', 'C', 'D', 'del', 'E', 'F', 'G', 'H', 'I', 'J'
                'K', 'L', 'M', 'N', 'nothing', 'O', 'P', 'Q', 'R', 'S', 'space',
                'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    print(filename, outputs[prediction])
