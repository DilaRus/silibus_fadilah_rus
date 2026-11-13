import os
import cv2

# Get the current working directory
CURRENT_DIR = os.getcwd()

# Construct the full path to the image
DATA_PATH = os.path.join(CURRENT_DIR, "data")
image_path = os.path.join(DATA_PATH, "Astronaut.png")

# Grayscale image
image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

# Check if the image was loaded successfully
if image is not None:
    # Save the grayscale image
    cv2.imwrite(os.path.join(DATA_PATH, "Astronaut_gray.png"), image)
    print("Grayscale image saved successfully!")

    