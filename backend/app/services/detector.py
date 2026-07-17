import cv2
import os
from ultralytics import YOLO

# Load YOLO model
model = YOLO("yolov8n.pt")

# Output folder
OUTPUT_DIR = "app/outputs"
os.makedirs(OUTPUT_DIR, exist_ok=True)
ROAD_OBJECTS = [
    "person",
    "car",
    "truck",
    "bus",
    "motorcycle",
    "bicycle",
    "traffic light",
    "stop sign"
]

def detect_video(video_path):

    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        return {"error": "Could not open video"}

    # Video properties
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)

    # Output video path
    output_path = os.path.join(
        OUTPUT_DIR,
        "processed_" + os.path.basename(video_path)
    )

    # Video writer
    writer = cv2.VideoWriter(
        output_path,
        cv2.VideoWriter_fourcc(*"mp4v"),
        fps,
        (width, height)
    )

    frame_count = 0
    detections = []

    while True:
        success, frame = cap.read()

        if not success:
            break

        frame_count += 1

        # Run YOLO
        results = model(frame)

        # Draw boxes on frame
        annotated_frame = results[0].plot()

        # Save annotated frame
        writer.write(annotated_frame)

        # Save detections
        for result in results:
            for box in result.boxes:

                class_id = int(box.cls[0])
                class_name = model.names[class_id]
                confidence = float(box.conf[0])

        if confidence > 0.60 and class_name in ROAD_OBJECTS:
            detections.append(
                {
                    "frame": frame_count,
                    "class": class_name,
                    "confidence": round(confidence, 2)
                }
            )
            
        

    cap.release()
    writer.release()

    return {
        "message": "Detection completed",
        "frames_processed": frame_count,
        "total_detections": len(detections),
        "detections": detections,
        "output_video": output_path
    }