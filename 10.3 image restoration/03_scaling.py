import numpy as np
import cv2 as cv
import os

# Get the current working directory
CURRENT_DIR = os.getcwd()

# Get the path to the image
DATA_PATH = os.path.join(CURRENT_DIR, "data")
image_path = os.path.join(DATA_PATH, "Astronaut.png")

if os.path.exists(image_path):
    img = cv.imread(image_path)

# Extract dimensions. shape returns (height, width, channels)
height, width = img.shape[:2]

# cv.INTER_CUBIC uses a 4x4 pixel neighborhood to calculate the new pixel value.
# enlarging image
res = cv.resize(img,(2*width, 2*height), interpolation = cv.INTER_CUBIC)

# display the original and resized images
cv.imshow("Original Image", img)
cv.imshow("Resized Image", res)

# Wait for a key press before closing the windows
cv.waitKey(0)
cv.destroyAllWindows()    