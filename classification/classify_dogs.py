import tensorflow as tf
import tensorflow.keras as keras
from tqdm import tqdm
import cv2
import numpy as np
import pydot

from sklearn.utils import shuffle
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import confusion_matrix,roc_curve,auc


from keras.utils.np_utils import to_categorical
from keras.preprocessing.image import ImageDataGenerator
from keras.applications.vgg16 import VGG16,preprocess_input
from keras.layers import Dense,Flatten,Dropout,Concatenate,GlobalAveragePooling2D,Lambda,ZeroPadding2D
from keras.layers import SeparableConv2D,BatchNormalization,MaxPooling2D,Conv2D
from IPython.display import SVG
from keras.utils.vis_utils import model_to_dot

%matplotlib inline
import pandas as pd
import os,shutil,math,scipy,cv2
import numpy as np
import matplotlib.pyplot as plt
import random as rn


from sklearn.utils import shuffle
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import confusion_matrix,roc_curve,auc

from PIL import Image
from PIL import Image as pil_image
from PIL import ImageDraw

from time import time
from glob import glob
from tqdm import tqdm
from skimage.io import imread
from IPython.display import SVG

from scipy import misc,ndimage
from scipy.ndimage.interpolation import zoom


from keras import backend as K
from keras.utils.np_utils import to_categorical
from keras import layers
from keras.preprocessing.image import save_img
from keras.utils.vis_utils import model_to_dot
from keras.applications.vgg16 import VGG16,preprocess_input
from keras.applications.xception import Xception
from keras.applications.nasnet import NASNetMobile
from keras.models import Sequential,Input,Model
from keras.layers import Dense,Flatten,Dropout,Concatenate,GlobalAveragePooling2D,Lambda,ZeroPadding2D
from keras.layers import SeparableConv2D,BatchNormalization,MaxPooling2D,Conv2D
from keras.preprocessing.image import ImageDataGenerator
from keras.optimizers import Adam,SGD
from keras.utils.vis_utils import plot_model
from keras.callbacks import ModelCheckpoint,EarlyStopping,TensorBoard,CSVLogger,ReduceLROnPlateau,LearningRateScheduler

from os import listdir
from os.path import isfile, join
DATA_PATH = 'data/images'

classes = listdir(DATA_PATH)
print(len(classes))

stats = []
for each in classes:
    train_count = len(listdir(join(DATA_PATH, each)))
    stats.append([train_count, each])

stats.sort()

shortlisted = ['n02107683-Bernese_mountain_dog', 'n02088094-Afghan_hound', 'n02112018-Pomeranian', 'n02092002-Scottish_deerhound', 'n02099601-golden_retriever']

X = []
Z = []
imgsize = 150

def training_data(label,data_dir):
    for img in tqdm(listdir(data_dir)):
        path = join(data_dir,img)
        img = cv2.imread(path,cv2.IMREAD_COLOR)
        img = cv2.resize(img,(imgsize,imgsize))
        
        X.append(np.array(img))
        Z.append(str(label))
paths=[]

for index, dog in enumerate(shortlisted):
    path = join(DATA_PATH, dog)
    images = listdir(path)
    label = dog.split('-')[-1]
    training_data(label, path)

X = np.array(X)




