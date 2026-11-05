# Lesson 6.3 slides 12 to 15: Basic Authentication
# Run with: uvicorn 05_basic_authentication:app --reload
# In Swagger UI (/docs) click "Authorize" and enter user123 (user) or admin456 (admin) as the token.
from fastapi import FastAPI, Depends, Request, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional

# Simple token storage (in production, use a database)
VALID_TOKENS = {
    "user123": {"username": "john_doe", "role": "user"},
    "admin456": {"username": "admin_user", "role": "admin"}
}

# Security scheme
security = HTTPBearer()
app = FastAPI()

async def auth_dependency(request: Request, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Basic authentication dependency"""
    token = credentials.credentials

    # Check if token exists in our "database"
    if token not in VALID_TOKENS:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_info = VALID_TOKENS[token]
    print(f"Auth middleware executed for user: {user_info['username']}")

    # Return user info instead of just "authenticated"
    return user_info

async def admin_dependency(request: Request, user_info: dict = Depends(auth_dependency)):
    """Admin-specific dependency that requires authentication first"""

    # Check if user has admin role
    if user_info.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )

    print(f"Admin middleware executed for: {user_info['username']}")
    return user_info

# Public endpoint - no authentication required
@app.get("/public")
async def public_endpoint():
    return {"message": "Public endpoint - no auth required"}

# Protected endpoint - requires authentication
@app.get("/protected")
async def protected_endpoint(user_info: dict = Depends(auth_dependency)):
    return {
        "message": "Protected endpoint",
        "user": user_info["username"],
        "role": user_info["role"]
    }

# Admin endpoint - requires authentication + admin role
@app.get("/admin")
async def admin_endpoint(user_info: dict = Depends(admin_dependency)):
    return {
        "message": "Admin endpoint",
        "user": user_info["username"],
        "role": user_info["role"]
    }
