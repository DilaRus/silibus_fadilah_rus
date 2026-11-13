import cv2 as cv
import os

# Get the current working directory
CURRENT_DIR = os.getcwd()

# Get the path to the image
DATA_PATH = os.path.join(CURRENT_DIR, "data")
image_path = os.path.join(DATA_PATH, "Astronaut.png")

if os.path.exists(image_path):
    img = cv.imread(image_path)

# rotate the image by 45 degrees
# Get the dimensions of the image
height, width = img.shape[:2]

# Calculate the center of the image
center = (width // 2, height // 2)

# Get the rotation matrix for rotating the image by 45 degrees
angle = 45

# cv.getRotationMatrix2D(center, angle, scale) returns a 2x3 affine transformation matrix
# that can be used to rotate the image around the specified center point by the given angle.
rotation_matrix = cv.getRotationMatrix2D(center, angle, 1.0)

# Apply the rotation to the image
rotated_img = cv.warpAffine(img, rotation_matrix, (width, height))    


# display the original and rotated images
cv.imshow("Original Image", img)
cv.imshow("Rotated Image", rotated_img)

# Wait for a key press before closing the windows
cv.waitKey(0)
cv.destroyAllWindows()