# random_number.py: a local MCP server that talks over stdio
import random
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Random Number")

@mcp.tool()
def get_number(low: int = 1, high: int = 100) -> int:
    """Return a random whole number between low and high."""
    return random.randint(low, high)

if __name__ == "__main__":
    mcp.run(transport="stdio")