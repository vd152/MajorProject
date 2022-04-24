#import nessarary libraries
from keras.models import load_model
import numpy as np
import cv2

model2 =load_model('./mymodel.h5')
p = 'C:\\Users\\Vidhi\\Desktop\\major project\\Flower_Classification_Tensorflow.js\\train\\data\\train\\dandelion\\10043234166_e6dd915111_n.jpg'
finalimgs = []
size = 64,64

imgf = cv2.imread(p)
imgf = cv2.resize(imgf,size)
finalimgs.append(imgf)
trainp = np.array(finalimgs)

trainp = trainp.astype('float32') / 255.0

pred = model2.predict(trainp)
cla=np.argmax(pred,axis=1)

print(cla)