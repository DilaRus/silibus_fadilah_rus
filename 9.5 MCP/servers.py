# servers.py: every MCP server the agent can use
import os
import sys

STDIO = os.path.join(os.path.dirname(__file__), "server", "stdio")
tavily_api_key=os.getenv("TAVILY_API_KEY")
SERVERS = {
    # Local server: the client starts it for you
    "random_number": {
        "command": sys.executable,
        "args": [os.path.join(STDIO, "random_number.py")],
        "transport": "stdio",
    },
    # HTTP server: start it yourself first
    "roll_dice": {
        "url": "http://localhost:8000/mcp",
        "transport": "streamable_http",
    },
    # remote server:tavily web search
    "tavily": {
        "url": "https://mcp.tavily.com/mcp/",
        "transport": "streamable_http",
        "headers": {"Authorization": f"Bearer {tavily_api_key}"},
    },
    # your own posgres server: read only, started by the client
    "postgres": {
        "command": sys.executable,
        "args": [os.path.join(STDIO, "postgres_server.py")],
        "transport": "stdio",
    },
}
