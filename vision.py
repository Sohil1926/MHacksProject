from openai import OpenAI
import base64
system_prompt = """
You are given an image with numbers. Identify the gallery and find bounding box coordinates with x1, y1, x2, y2 format for the gallery. The 'coordinates' should detail 'x1', 'y1' (top-left corner), and 'x2', 'y2' (bottom-right corner). Each square is 50 wide. Do your best estimate using the x and y coordinates. Output the coordinates in json format at the end.
"""

def call_gpt(base64_image):
    client = OpenAI(api_key="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")
    chat_model = "gpt-4-1106-preview"
    vision_model = "gpt-4-vision-preview"
    response = client.chat.completions.create(
    model=vision_model,
    messages=[
        {
            "role": 'system',
            "content": system_prompt,
        },
        {
        "role": "user",
        "content": [
            {
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image}"
            },
            },
            {
                "type": 'text',
                "text": 'Find a bounding box in x1, y1 (top-left corner), and x2, y2 (bottom-right corner) format.',
            },
        ],
        }
    ],
    max_tokens=1000,
    )

    print(response.choices[0].message.content)


def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

image_path = "modified_floorplan1.png"
base64_image = encode_image(image_path)

call_gpt(base64_image)


