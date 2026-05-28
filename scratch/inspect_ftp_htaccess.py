import ftplib
import io

host = 'fnfarena.com'
user = 'u205277930'
password = '3.&av9olrZrb)VRb+rO/'

try:
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    
    # 1. Inspect api/.htaccess
    ftp.cwd('/domains/fnfarena.com/public_html/api')
    bio = io.BytesIO()
    ftp.retrbinary('RETR .htaccess', bio.write)
    print("=== api/.htaccess ===")
    print(bio.getvalue().decode('utf-8'))
    
    # 2. Inspect api/.env
    bio = io.BytesIO()
    ftp.retrbinary('RETR .env', bio.write)
    print("\n=== api/.env ===")
    print(bio.getvalue().decode('utf-8'))
    
    ftp.quit()
except Exception as e:
    print("Error:", e)
