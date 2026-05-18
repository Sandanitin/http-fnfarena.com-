import os

fixes = [
    # 1. Admin JS - Dist
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_admin_build\dist\assets\index-C49M13x1.js",
        "replacements": [
            ("http://localhost:8080/api", "https://fnfarena.com/api"),
            ('basename:"/Admin"', 'basename:"/admin"')
        ]
    },
    # 2. Admin JS - Local Server
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\local_server\Admin\assets\index-C49M13x1.js",
        "replacements": [
            ("http://localhost:8080/api", "https://fnfarena.com/api"),
            ('basename:"/Admin"', 'basename:"/admin"')
        ]
    },
    # 3. Admin index.html - Dist
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_admin_build\dist\index.html",
        "replacements": [
            ("/Admin/", "/admin/")
        ]
    },
    # 4. Admin index.html - Local Server
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\local_server\Admin\index.html",
        "replacements": [
            ("/Admin/", "/admin/")
        ]
    },
    # 5. CMS JS - Dist
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_cms_build\dist\assets\index-CHzHaDYM.js",
        "replacements": [
            ("http://localhost:8080/api", "https://fnfarena.com/api")
        ]
    },
    # 6. CMS JS - Local Server
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\local_server\cms\assets\index-CHzHaDYM.js",
        "replacements": [
            ("http://localhost:8080/api", "https://fnfarena.com/api")
        ]
    },
    # 7. Client JS - Dist
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\FNF_build_client\dist\assets\index-BPKrIAVL.js",
        "replacements": [
            ("http://localhost:8080/api", "https://fnfarena.com/api")
        ]
    },
    # 8. Client JS - Local Server
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\local_server\assets\index-BPKrIAVL.js",
        "replacements": [
            ("http://localhost:8080/api", "https://fnfarena.com/api")
        ]
    }
]

for fix in fixes:
    file_path = fix["file"]
    if not os.path.exists(file_path):
        print(f"Skipping (not found): {file_path}")
        continue
        
    print(f"Processing: {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    modified = False
    original_len = len(content)
    
    for old, new in fix["replacements"]:
        count = content.count(old)
        if count > 0:
            content = content.replace(old, new)
            print(f"  Replaced '{old}' -> '{new}' ({count} occurrences)")
            modified = True
            
    if modified:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  Saved changes! Size change: {original_len} -> {len(content)}")
    else:
        print("  No changes needed.")
        
print("All tasks completed!")
