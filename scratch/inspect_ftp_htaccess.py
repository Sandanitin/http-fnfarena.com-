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
    
    ftp.cwd('/public_html')
    print("Listing files:")
    files = ftp.nlst()
    print(files)
    
    # Try to list with -la to see hidden files
    print("\nDetailed listing:")
    ftp.retrlines('LIST', print)
    
    # Try to download .htaccess
    print("\nTrying to read .htaccess:")
    bio = io.BytesIO()
    try:
        ftp.retrbinary('RETR .htaccess', bio.write)
        print("--- .htaccess Content ---")
        print(bio.getvalue().decode('utf-8'))
        print("-------------------------")
    except Exception as e:
        print("Could not retrieve .htaccess:", e)
        
    ftp.quit()
except Exception as e:
    print("FTP Error:", e)
