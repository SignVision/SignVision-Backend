import numpy as np 
import pandas as pd 
import tensorflow as tf
from tensorflow import keras
import sys
import cv2


def evaluate(filename):
    
    new_model = tf.keras.models.load_model('./Model Training/model/my-model2.h5')

    temp_img = cv2.imread('./'+filename)
    temp_img = cv2.resize(temp_img, (32, 32))  

    img_array = keras.preprocessing.image.img_to_array(temp_img)
    img_batch = np.expand_dims(img_array, axis=0)
    img_preprocessed = tf.keras.applications.resnet50.preprocess_input(img_batch)

    prediction = new_model.predict(img_preprocessed)
    prediction = np.argmax(prediction[0])

    outputs = ['A', 'B', 'C', 'D', 'del', 'E', 'F', 'G', 'H', 'I', 'J',
                'K', 'L', 'M', 'N', 'nothing', 'O', 'P', 'Q', 'R', 'S', 'space',
                'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


    print(outputs[prediction])


if __name__ == "__main__":
    evaluate(sys.argv[1])
    sys.stdout.flush()