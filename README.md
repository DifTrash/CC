# DifTrash API

The plastic classification system API allows users to upload images for identification into categories 1-7 using a machine learning model, providing confidence levels and recycling guidelines. The API also stores classification history and offers educational materials to support effective plastic waste management and raise public awareness.

## Table of Contents
- [Python Predict Model](#python-predict-model)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [API Endpoint](#response-type)
- [Node.js API](#nodejs-api)
  - [Requirements](#requirements-1)
  - [Installation](#installation-1)
  - [API Endpoints](#api-endpoints)
  - [BackendURL](#backend-service-url)
- [License](#license)

## Python Predict Model

### Requirements
- Python 3.x
- FastAPI
- TensorFlow 2.18.0
- Keras
- Google Cloud Firestore
- uvicorn
- pillow

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/DifTrash/CC.git
    cd repository-name/predict-api
    ```

2. Set up virtual environment and install dependencies:
    ```sh
    python -m venv env
    source env/bin/activate  # For Windows: .\env\Scripts\activate
    pip install -r requirements.txt
    ```

3. Configure Firestore credentials.

4. Run the application:
    ```sh
    fastapi dev main.py
    ```

## Response Type

```
{
  "message": prediction_status,
  "data": {
    "type": plastic_type,
    "confidence": confidence
  }
}
```
## Node.js API

### Requirements
- Node.js
- Express
- Google Cloud Firestore
- Google Cloud Storage
- Multer
- firebase

### Installation

  1. Navigate to the Node.js API directory:
    ```sh
    cd ../backend-api
    ```

 2. Install all requirements:
    ```sh
    npm install
    ```
    
 3. Run the application:
    ```sh
    npm run dev
    ```
    ---
### API Endpoints

#### Response Type
 ```
  {
      status:"success" | "error",
      data: unknown
  }
  ```

#### 1. POST : `/auth/signup`

  ```
  Description:
  Authenticate a user.

  Body:
  form-data:

  username    : text | string
  email       : text | string
  password    : text | string
  ```

#### 2. POST : `/auth/signin`

  ```
  Description:
  Authenticate a user.
  
  Body:
  form-data:
  
  email       : text | string
  password    : text | string
  ```

#### 3. POST : `/auth/signout`

  ```
  Description:
  Log out the current user.
  ```

  ---

#### 4. POST : `/predict/model/:uid`

  ```
  Description:
  Upload a file for model prediction.
  
  Body:
  form-data:
  
  file        : File | The file to be analyzed.
  ```

#### 5. POST : `/predict/get/:uid`
  ```
  Description:
  Retrieve prediction results for a specific user as prediction history
  ```
  ---

#### 6. POST : `/profile/update/:uid`

  ```
  Description:
  Update the user profile image.
  
  Body:
  form-data:
  
  Username    : text | string
  file        : File | The file to be analyzed.
  ```

#### 7. POST : `/profile/get/:uid`
  ```
  Description:
  Capture specific user profile details as profile view
  ```
