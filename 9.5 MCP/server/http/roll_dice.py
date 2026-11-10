# roll_dice.py: an MCP server that talks over HTTP
import random
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Dice Roller")

@mcp.tool()
def roll_dice(n_dice: int) -> list[int]:
    """Roll n_dice six-sided dice and return the results."""
    return [random.randint(1, 6) for _ in range(n_dice)]

if __name__ == "__main__":
    # Serves on http://127.0.0.1:8000/mcp
    mcp.run(transport="streamable-http")