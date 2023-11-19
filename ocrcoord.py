import cv2
import pytesseract
import numpy as np

# Set the Tesseract path in the script
pytesseract.pytesseract.tesseract_cmd = '/opt/homebrew/bin/tesseract'

def preprocess_image(image_path):
    # Load the image using OpenCV
    image = cv2.imread(image_path)
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Apply thresholding
    _, binary = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    
    return binary, image  # Return both the binary and the grayscale image

def draw_bounding_box(image_path, rooms):
    # Preprocess the image
    binary, original_image = preprocess_image(image_path)  # Receive the grayscale image too

    # Use Tesseract to get bounding box info for each word in the binary image
    data = pytesseract.image_to_data(binary, lang='eng', config='--psm 6', output_type=pytesseract.Output.DICT)

    # Iterate over each text instance
    for i, text in enumerate(data["text"]):
        if int(data["conf"][i]) > 60:  # Confidence threshold is 60
            for room in rooms:
                if text.strip() == room["room"]:
                    # Get the bounding box coordinates
                    x, y, w, h = data["left"][i], data["top"][i], data["width"][i], data["height"][i]
                    # Draw a bounding box around the text on the original image
                    cv2.rectangle(original_image, (x, y), (x + w, y + h), (0, 0, 255), 2)
                    # Put the room component as a label
                    cv2.putText(original_image, room["component"], (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

    # Save the image with bounding box
    cv2.imwrite('output_with_boxes.png', original_image)

# Your room-component mapping
rooms = [
    {"room": "14", "component": "Main Hackathon Arena"},
    {"room": "11", "component": "Team Collaboration Room 1"},
    {"room": "10", "component": "Team Collaboration Room 2"},
    {"room": "2", "component": "Hackathon Help Desk"},
    {"room": "3", "component": "Quiet Workspace"},
    {"room": "18", "component": "Food and Refreshments Area"},
    {"room": "8", "component": "Sponsor Booths Area"},
    {"room": "9", "component": "Hardware Projects Area"},
    {"room": "15", "component": "Audio-Visual Technical Support"},
    {"room": "16", "component": "Software Testing Lab"}
]

# Test the function
draw_bounding_box('floorplan.png', rooms)
