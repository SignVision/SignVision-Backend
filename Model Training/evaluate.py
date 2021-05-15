import numpy as np 
import pandas as pd 
import tensorflow as tf
from tensorflow import keras
import sys


def evaluate(filename):
    new_model = tf.keras.models.load_model('./model/my-model.h5')

    img = keras.preprocessing.image.load_img("../" + filename)
    img_array = keras.preprocessing.image.img_to_array(img)
    img_batch = np.expand_dims(img_array, axis=0)
    img_preprocessed = tf.keras.applications.resnet50.preprocess_input(img_batch)

    prediction = new_model.predict(img_preprocessed)
    prediction = np.argmax(prediction[0])

    outputs = ['A', 'B', 'C', 'D', 'del', 'E', 'F', 'G', 'H', 'I', 'J'
                'K', 'L', 'M', 'N', '', 'O', 'P', 'Q', 'R', 'S', ' ',
                'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


    print(outputs[prediction])


if __name__ == "__main__":
    evaluate(sys.argv[1])
    sys.stdout.flush()