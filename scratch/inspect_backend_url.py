import re

file_path = r"c:\Users\sanda\Desktop\vikrin sir\fnf\local_server\Admin\assets\index-C49M13x1.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

print("File loaded, size:", len(content))

# 1. Search for '8080' or 'localhost'
for m in re.finditer(r"8080|localhost", content, re.IGNORECASE):
    start = max(0, m.start() - 150)
    end = min(len(content), m.end() + 150)
    print(f"--- MATCH at index {m.start()} ---")
    print(content[start:end])
    print("-" * 50)
