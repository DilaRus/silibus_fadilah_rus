from ultralytics import YOLO
import os

# Set the path to the best model
model_path = os.path.join("runs", "detect", "train", "weights", "best.pt")

# Load a model
model = YOLO(model_path) # load a custom model

# Predict with the model & save results to runs/detect/predict
results = model("https://ultralytics.com/images/bus.jpg", save=True) # predict on an image

# Show the results
results[0].show() # display the results