import os
import ftplib

fixes = [
    # 1. Admin JS - Dist
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_admin_build\dist\assets\index-C49M13x1.js",
        "replacements": [
            ('basename:"/admin"', 'basename:(window.location.pathname.startsWith("/FNF/Admin") ? "/FNF/Admin" : (window.location.pathname.startsWith("/FNF/admin") ? "/FNF/admin" : "/admin"))')
        ]
    },
    # 2. Admin JS - Local Server
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\local_server\admin\assets\index-C49M13x1.js",
        "replacements": [
            ('basename:"/admin"', 'basename:(window.location.pathname.startsWith("/FNF/Admin") ? "/FNF/Admin" : (window.location.pathname.startsWith("/FNF/admin") ? "/FNF/admin" : "/admin"))')
        ]
    },
    # 3. Admin index.html - Dist
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_admin_build\dist\index.html",
        "replacements": [
            ('src="/admin/assets/', 'src="assets/'),
            ('href="/admin/assets/', 'href="assets/')
        ]
    },
    # 4. Admin index.html - Local Server
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\local_server\admin\index.html",
        "replacements": [
            ('src="/admin/assets/', 'src="assets/'),
            ('href="/admin/assets/', 'href="assets/')
        ]
    },
    # 5. CMS JS - Dist
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_cms_build\dist\assets\index-CHzHaDYM.js",
        "replacements": [
            ('basename:"/cms"', 'basename:(window.location.pathname.includes("/FNF/CMS") ? "/FNF/CMS" : (window.location.pathname.includes("/FNF/cms") ? "/FNF/cms" : "/cms"))')
        ]
    },
    # 6. CMS JS - Local Server
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\local_server\cms\assets\index-CHzHaDYM.js",
        "replacements": [
            ('basename:"/cms"', 'basename:(window.location.pathname.includes("/FNF/CMS") ? "/FNF/CMS" : (window.location.pathname.includes("/FNF/cms") ? "/FNF/cms" : "/cms"))')
        ]
    },
    # 7. CMS index.html - Dist
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_cms_build\dist\index.html",
        "replacements": [
            ('src="/cms/assets/', 'src="assets/'),
            ('href="/cms/assets/', 'href="assets/')
        ]
    },
    # 8. CMS index.html - Local Server
    {
        "file": r"c:\Users\sanda\Desktop\vikrin sir\fnf\local_server\cms\index.html",
        "replacements": [
            ('src="/cms/assets/', 'src="assets/'),
            ('href="/cms/assets/', 'href="assets/')
        ]
    }
]

# Step 1: Perform search and replace in local files
for fix in fixes:
    file_path = fix["file"]
    if not os.path.exists(file_path):
        print(f"Skipping (not found): {file_path}")
        continue
        
    print(f"Processing: {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    modified = False
    for old, new in fix["replacements"]:
        count = content.count(old)
        if count > 0:
            content = content.replace(old, new)
            print(f"  Replaced '{old}' -> '{new}' ({count} occurrences)")
            modified = True
            
    if modified:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print("  Saved!")
    else:
        print("  No replacements needed.")

# Step 2: Upload to FTP
host = '145.79.213.144'
user = 'u882069120.lightcoral-ferret-563515.hostingersite.com'
password = 'Nithin06@'

files_to_upload = [
    {
        "local": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_admin_build\dist\index.html",
        "remote_dir": "/public_html/admin",
        "remote_name": "index.html"
    },
    {
        "local": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_admin_build\dist\assets\index-C49M13x1.js",
        "remote_dir": "/public_html/admin/assets",
        "remote_name": "index-C49M13x1.js"
    },
    {
        "local": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_cms_build\dist\index.html",
        "remote_dir": "/public_html/cms",
        "remote_name": "index.html"
    },
    {
        "local": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_cms_build\dist\assets\index-CHzHaDYM.js",
        "remote_dir": "/public_html/cms/assets",
        "remote_name": "index-CHzHaDYM.js"
    },
    {
        "local": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_cms_build\dist\assets\index-CHzHaDYM.js",
        "remote_dir": "/public_html/admin/cms/assets",
        "remote_name": "index-CHzHaDYM.js"
    }
]

print("\nStarting FTP sync for relative and dynamic routing fixes...")
try:
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    print("Login successful!")
    
    for item in files_to_upload:
        local_path = item["local"]
        remote_dir = item["remote_dir"]
        remote_name = item["remote_name"]
        
        if not os.path.exists(local_path):
            continue
            
        print(f"Uploading {local_path} to {remote_dir}/{remote_name}...")
        try:
            ftp.cwd(remote_dir)
        except:
            # try making dir
            parts = remote_dir.split('/')
            curr = ""
            for p in parts:
                if not p: continue
                curr += "/" + p
                try: ftp.mkd(curr)
                except: pass
            ftp.cwd(remote_dir)
            
        with open(local_path, 'rb') as f:
            ftp.storbinary(f'STOR {remote_name}', f)
        print("  Upload complete!")
        
    ftp.quit()
    print("FTP Sync completed successfully!")
except Exception as e:
    print("FTP Error:", e)
