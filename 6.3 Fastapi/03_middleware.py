# Lesson 6.3 slide 9: BaseHTTPMiddleware
# Run with: uvicorn 03_middleware:app --reload   and watch the terminal logs when you call "/".
from fastapi import FastAPI, Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

class FuelSensorMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, jalan):

        # 1. BEFORE DRIVING (Authentication & Safety)
        fuel_level_empty = False
        print("SENSOR: Checking fuel level before ignition...")
        if fuel_level_empty:
            print("SENSOR: Tank is empty. Kenot start!")
            return Response(content="Error: Out of fuel", status_code=401)

        # 2. DURING DRIVING
        # If fuel is not empty, we can jalan
        trip_result = await jalan(request)

        # 3. AFTER REACHING (Logging)
        print("SENSOR: Trip finished. Logging fuel economy to dashboard.")
        return trip_result

app = FastAPI()
app.add_middleware(FuelSensorMiddleware)

# From the presenter notes (slide 9): an endpoint to trigger the middleware.
@app.get("/")
def root():
    return {"message": "Middleware example. Check your terminal for logs."}
