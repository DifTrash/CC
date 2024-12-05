from fastapi import FastAPI, File, UploadFile, HTTPException
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = FastAPI()

try:
    model_path = "Diftrash_Model.keras"
    model = tf.keras.models.load_model(model_path)
    print("Model berhasil dimuat!")
except Exception as e:
    print("Gagal memuat model:", e)
    model = None

PLASTIC_TYPES = ['PETE', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS', 'Other']

def preprocess_image(image: Image.Image, target_size: tuple = (128, 128)):
    image = image.resize(target_size)
    image_array = np.array(image)
    image_array = image_array / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not model:
        return HTTPException(status_code=500, detail="Model belum dimuat!")

    if not file:
        return HTTPException(status_code=400, detail="File tidak ada!")

    print("Hello world")

    try:
        file_bytes = await file.read()
        image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
        input_array = preprocess_image(image)
        predictions = model.predict(input_array)
        max_index = np.argmax(predictions[0])
        confidence = float(predictions[0][max_index])
        plastic_type = PLASTIC_TYPES[max_index]

        response = {
            "message": "Prediction success",
            "data": {
                "type": plastic_type,
                "confidence": confidence
            }
        }
        return response
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=f"Error dalam prediksi: {str(e)}")