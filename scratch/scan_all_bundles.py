import re
import os

files = [
    r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_admin_build\dist\assets\index-C49M13x1.js",
    r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_cms_build\dist\assets\index-CHzHaDYM.js",
    r"c:\Users\sanda\Desktop\vikrin sir\fnf\FNF_build_client\dist\assets\index-BPKrIAVL.js"
]

for file_path in files:
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue
        
    print(f"\n=================== {os.path.basename(file_path)} ===================")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    print("Loaded size:", len(content))
    matches = list(re.finditer(r"8080|localhost|127\.0\.0\.1", content, re.IGNORECASE))
    print(f"Found {len(matches)} matches")
    
    for m in matches[:10]: # show up to 10 matches
        start = max(0, m.start() - 100)
        end = min(len(content), m.end() + 100)
        print(f"Match at {m.start()}:")
        print(content[start:end])
        print("-" * 40)
