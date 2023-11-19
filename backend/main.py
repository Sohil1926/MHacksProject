# Import FastAPI
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from services.vision import call_gpt
from pydantic import BaseModel
from services.label import draw_bounding_box

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a route


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.post("/floorplan/{floorplan}")
async def get_floorplan(floorplan: str, request: Request):
    if floorplan not in ["1", "2", "3"]:
        raise HTTPException(status_code=400, detail="Invalid floorplan")
    image_path = f"./data/{floorplan}.png"
    try:
        event_info = await request.json()
    except:
        event_info = {
            "event": "hackathon",
            "num_people": 500,
            "date": "2023-11-18",
            "from_time": "8:00",
            "to_time": "17:00",
            "location": "Ann Arbor",
            "duration_days": 2,
            "food": "yes",
            "budget": 2000,
        }
    schedule = call_gpt(image_path, event_info)
    floor_img_path = draw_bounding_box(image_path, schedule)
    return {"schedule": schedule, "floorplan": FileResponse(floor_img_path)}
