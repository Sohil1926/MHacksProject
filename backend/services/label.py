import cv2
import easyocr
import numpy as np

def preprocess_image(image_path):
    # Load the image using OpenCV
    image = cv2.imread(image_path)
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Apply thresholding
    _, binary = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    return binary, image  # Return both the binary and the original image

def find_activity_by_room(schedule, room):
    # Find the activity that matches the room number
    for day in schedule:
        for activity in day['activities']:
            if str(activity['room']) == room:
                return activity['name']
    return None

def draw_bounding_box(image_path, schedule):
    # Preprocess the image
    binary, original_image = preprocess_image(image_path)

    # Initialize EasyOCR reader
    reader = easyocr.Reader(['en'])  # You can add more languages if needed

    # Use EasyOCR to get bounding box info for each word in the binary image
    results = reader.readtext(binary)

    # Create a list of room numbers from the schedule
    room_numbers = list(set([str(activity['room']) for day in schedule for activity in day['activities']]))

    # Iterate over each text instance detected by EasyOCR
    for (bbox, text, prob) in results:
        if text.strip() in room_numbers:
            # Get the bounding box coordinates
            (top_left, top_right, bottom_right, bottom_left) = bbox
            x, y = top_left
            w = top_right[0] - top_left[0]
            h = bottom_left[1] - top_left[1]

            # Find the activity name
            activity_name = find_activity_by_room(schedule, text.strip())
            if activity_name:
                # Calculate position for text and arrow
                text_x, text_y = int(x), int(y + h + 50)
                arrow_start = (int(x + w/2), int(y + h))
                arrow_end = (int(x + w/2), int(y + h + 30))

                # Draw a black rectangle as text background
                (text_width, text_height), _ = cv2.getTextSize(activity_name, cv2.FONT_HERSHEY_SIMPLEX, 1, 2)
                cv2.rectangle(original_image, (text_x, text_y - text_height - 5), (text_x + text_width, text_y + 5), (0, 0, 0), -1)

                # Draw a bounding box around the text on the original image
                cv2.rectangle(original_image, (int(x), int(y)), (int(x + w), int(y + h)), (0, 0, 255), 2)
                # Draw an arrow pointing to the floor
                cv2.arrowedLine(original_image, arrow_start, arrow_end, (255, 0, 0), 5, tipLength=0.5)
                # Write the activity name in white text
                cv2.putText(original_image, activity_name, (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

    # Save the image with bounding box
    cv2.imwrite(f'backend/output/{image_path.split("/")[-1]}', original_image)

    return f'backend/output/{image_path.split("/")[-1]}'