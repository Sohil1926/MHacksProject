from PIL import Image, ImageDraw, ImageFont

# Load the image from the directory
img_path = "floorplan1.png"
img = Image.open(img_path)

# Create a drawing context
draw = ImageDraw.Draw(img)

# Get the size of the image
width, height = img.size

# Define the step size for the grid (this can be adjusted)
step_size = 50

# Define the font for labels (default font with size 20, can be adjusted)
try:
    # Trying to use a nicer font if available
    font = ImageFont.truetype("arial", 20)
except IOError:
    # Default font if Arial is not available
    font = ImageFont.load_default()

# Draw vertical and horizontal lines, and label them
for x in range(0, width, step_size):
    draw.line(((x, 0), (x, height)), fill="black", width=1)
    draw.text((x+5, 0), str(x), fill="black", font=font)

for y in range(0, height, step_size):
    draw.line(((0, y), (width, y)), fill="black", width=1)
    draw.text((0, y+5), str(y), fill="black", font=font)

# Number each box in the grid
box_number = 1
for y in range(0, height, step_size):
    for x in range(0, width, step_size):
        # Calculate the center of the box
        center_x = x + step_size // 2
        center_y = y + step_size // 2
        # Draw the box number
        draw.text((center_x, center_y), str(box_number), fill="black", font=font)
        box_number += 1

# Save the modified image
modified_img_path = "modified_" + img_path
img.save(modified_img_path)
