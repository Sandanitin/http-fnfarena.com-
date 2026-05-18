import ftplib
import os

host = '145.79.213.144'
user = 'u882069120.lightcoral-ferret-563515.hostingersite.com'
password = 'Nithin06@'

local_file = r"c:\Users\sanda\Desktop\vikrin sir\fnf\FNF_build_client\dist\.htaccess"

try:
    print("Connecting to FTP...")
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    print("Login successful!")
    
    ftp.cwd('/public_html')
    
    print(f"Uploading {local_file} as .htaccess...")
    with open(local_file, 'rb') as f:
        ftp.storbinary('STOR .htaccess', f)
        
    print("Upload complete!")
    
    # Confirm by listing
    print("Current directory listing:")
    ftp.retrlines('LIST', print)
    
    ftp.quit()
except Exception as e:
    print("FTP Error:", e)
