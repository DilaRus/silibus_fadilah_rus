# Lesson 6.3 slide 11: Dependencies
# Run with: uvicorn 04_dependencies:app --reload
from fastapi import FastAPI, Depends, Request

#Different "middleware" as dependencies
async def auth_dependency(request: Request):
    #Authentication Logic
    print ("Auth middleware executed")
    return "authenticated"

async def admin_dependency(request: Request):
    #Admin-specific logic
    print("Admin middleware executed")
    return "admin-verified"

app = FastAPI()

#Apply different dependencies to different endpoints
@app.get("/public")
async def public_endpoint(
    auth: str = Depends(auth_dependency),
    admin: str = Depends(admin_dependency)
):
    return {"message":"Public endpoint"}

@app.get("/admin")
async def admin_endpoint(
    auth: str = Depends(auth_dependency),
    admin: str = Depends(admin_dependency)
):
    return {"message":"Admin endpoint"}
