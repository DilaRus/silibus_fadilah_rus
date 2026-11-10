# postgres_server.py: a read-only PostgreSQL MCP server
import os
from dotenv import load_dotenv
from mcp.server.fastmcp import FastMCP
from sqlalchemy import create_engine, text

load_dotenv()
engine = create_engine(os.environ["DATABASE_URL"])
mcp = FastMCP("Postgres")

@mcp.tool()
def list_tables() -> list[str]:
    """List the tables in the database."""
    sql = text("SELECT table_name FROM information_schema.tables "
               "WHERE table_schema = 'public' ORDER BY table_name")
    with engine.connect() as conn:
        return [row[0] for row in conn.execute(sql)]

@mcp.tool()
def run_query(sql: str) -> list[dict]:
    """Run one read-only SQL query and return up to 50 rows."""
    with engine.connect() as conn:
        conn.execute(text("SET TRANSACTION READ ONLY"))
        rows = conn.exec_driver_sql(sql).mappings().fetchmany(50)
    return [dict(row) for row in rows]

if __name__ == "__main__":
    mcp.run(transport="stdio")