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

early_stop = EarlyStopping(monitor='loss', patience=2)

data_dir = './Model Training/data/asl_alphabet_train'
test_dir = './Model Training/data/asl_alphabet_test'
categories = os.listdir(data_dir)

length = 0
train_images_names_and_paths = {}

for cat in categories:
    train_images_names_and_paths[cat] = os.listdir(data_dir + '/' + cat)
    length += len(os.listdir(data_dir + '/' + cat))

dim1 = []
dim2 = []

for cat, name_list in train_images_names_and_paths.items():
    for name in name_list:
        dim1.append(plt.imread(data_dir + '/' + cat + '/' + name).shape[0])
        dim2.append(plt.imread(data_dir + '/' + cat + '/' + name).shape[1])
    break

test_inputs = os.listdir(test_dir)

image_gen = ImageDataGenerator(rescale=1/255)

train_gen = image_gen.flow_from_directory(data_dir,
                                         target_size=(200,200),
                                         class_mode="categorical",
                                         color_mode="rgb",
                                         shuffle=True,
                                         batch_size=32)

target_shape = (np.mean(dim1, dtype=np.int32), np.mean(dim2, dtype=np.int32))

input_shape = (200, 200, 3)

model = tf.keras.Sequential(
  [
      tf.keras.layers.Conv2D(kernel_size=(3,3), input_shape=input_shape ,filters=32, activation='relu'),
      tf.keras.layers.MaxPool2D(pool_size=(2,2)),

      tf.keras.layers.Conv2D(kernel_size=(3,3),input_shape=input_shape ,filters=32, activation='relu'),
      tf.keras.layers.MaxPool2D(pool_size=(2,2)),

      tf.keras.layers.Conv2D(kernel_size=(3,3), input_shape=input_shape,filters=64, activation='relu'),
      tf.keras.layers.MaxPool2D(pool_size=(2,2)),
      
      tf.keras.layers.Conv2D(kernel_size=(3,3), input_shape=input_shape,filters=64, activation='relu'),
      tf.keras.layers.MaxPool2D(pool_size=(2,2)),

      tf.keras.layers.Conv2D(kernel_size=(3,3), input_shape=input_shape,filters=128, activation='relu'),
      tf.keras.layers.MaxPool2D(pool_size=(2,2)),
      
      tf.keras.layers.Conv2D(kernel_size=(3,3), input_shape=input_shape,filters=128, activation='relu'),
      tf.keras.layers.MaxPool2D(pool_size=(2,2)),

      tf.keras.layers.Flatten(),
      tf.keras.layers.Dense(1024, activation='relu'),
      tf.keras.layers.Dropout(rate=0.5),
      tf.keras.layers.Dense(512, activation='relu'),
      tf.keras.layers.Dropout(rate=0.5),
      tf.keras.layers.Dense(29, activation='softmax')
  ])

model.compile(optimizer='rmsprop',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

model.summary()

model.fit(train_gen, epochs=20, callbacks=[early_stop])
