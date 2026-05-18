import ftplib
import os

host = '145.79.213.144'
user = 'u882069120.lightcoral-ferret-563515.hostingersite.com'
password = 'Nithin06@'

files_to_upload = [
    # 1. Admin index.html
    {
        "local": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_admin_build\dist\index.html",
        "remote_dir": "/public_html/admin",
        "remote_name": "index.html"
    },
    # 2. Admin JS bundle
    {
        "local": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_admin_build\dist\assets\index-C49M13x1.js",
        "remote_dir": "/public_html/admin/assets",
        "remote_name": "index-C49M13x1.js"
    },
    # 3. CMS JS bundle (main)
    {
        "local": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_cms_build\dist\assets\index-CHzHaDYM.js",
        "remote_dir": "/public_html/cms/assets",
        "remote_name": "index-CHzHaDYM.js"
    },
    # 4. CMS JS bundle (in case it is also in admin/cms)
    {
        "local": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_cms_build\dist\assets\index-CHzHaDYM.js",
        "remote_dir": "/public_html/admin/cms/assets",
        "remote_name": "index-CHzHaDYM.js"
    },
    # 5. Client JS bundle
    {
        "local": r"c:\Users\sanda\Desktop\vikrin sir\fnf\FNF_build_client\dist\assets\index-BPKrIAVL.js",
        "remote_dir": "/public_html/assets",
        "remote_name": "index-BPKrIAVL.js"
    },
    # 6. Backend CORS Filter
    {
        "local": r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_backend\app\Filters\Cors.php",
        "remote_dir": "/public_html/api/app/Filters",
        "remote_name": "Cors.php"
    }
]

def make_dirs(ftp, path):
    parts = path.split('/')
    current = ""
    for part in parts:
        if not part:
            continue
        current += "/" + part
        try:
            ftp.mkd(current)
            print(f"Created remote directory: {current}")
        except:
            pass

try:
    print("Connecting to FTP...")
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    print("Login successful!")
    
    for item in files_to_upload:
        local_path = item["local"]
        remote_dir = item["remote_dir"]
        remote_name = item["remote_name"]
        
        if not os.path.exists(local_path):
            print(f"Skipping {local_path} (local file not found)")
            continue
            
        print(f"\nTargeting: {remote_dir}/{remote_name}")
        make_dirs(ftp, remote_dir)
        
        ftp.cwd(remote_dir)
        with open(local_path, 'rb') as f:
            ftp.storbinary(f'STOR {remote_name}', f)
        print(f"Uploaded successfully to {remote_dir}/{remote_name}!")
        
    ftp.quit()
    print("\nAll files successfully synced to production!")
except Exception as e:
    print("FTP Error during mass sync:", e)
