import ftplib
import io

host = '145.79.213.144'
user = 'u882069120.lightcoral-ferret-563515.hostingersite.com'
password = 'Nithin06@'

try:
    print("Connecting to FTP...")
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    print("Login successful!")
    
    ftp.cwd('/public_html/admin')
    print("Files in admin:")
    ftp.retrlines('LIST', print)
    
    # Download index.html
    bio = io.BytesIO()
    ftp.retrbinary('RETR index.html', bio.write)
    content = bio.getvalue().decode('utf-8')
    print("\n--- admin/index.html Content ---")
    print(content)
    print("--------------------------------")
    
    ftp.quit()
except Exception as e:
    print("FTP Error:", e)
