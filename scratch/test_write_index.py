import ftplib
import io

host = '145.79.213.144'
user = 'u882069120.lightcoral-ferret-563515.hostingersite.com'
password = 'Nithin06@'

local_file = r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_admin_build\dist\index.html"

try:
    print("Connecting...")
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    print("Logged in!")
    
    # 1. Read current content
    ftp.cwd('/public_html/admin')
    bio = io.BytesIO()
    ftp.retrbinary('RETR index.html', bio.write)
    content_before = bio.getvalue().decode('utf-8')
    print("Content size BEFORE write:", len(content_before))
    
    # 2. Read local file content
    with open(local_file, 'r', encoding='utf-8') as f:
        local_content = f.read()
    print("Local file content size:", len(local_content))
    
    # 3. Perform write
    print("Writing local content to remote index.html...")
    ftp.storbinary('STOR index.html', io.BytesIO(local_content.encode('utf-8')))
    print("Write complete!")
    
    # 4. Read back remote content
    bio2 = io.BytesIO()
    ftp.retrbinary('RETR index.html', bio2.write)
    content_after = bio2.getvalue().decode('utf-8')
    print("Content size AFTER write:", len(content_after))
    
    # 5. Check if they match
    if local_content == content_after:
        print("Success! Remote file matches local file!")
    else:
        print("FAIL! Remote file does NOT match local file!")
        print("Remote content:")
        print(content_after[:200])
        
    ftp.quit()
except Exception as e:
    print("Error:", e)
