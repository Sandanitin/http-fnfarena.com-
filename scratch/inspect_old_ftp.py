import ftplib
import io

host = '145.79.212.7'
user = 'u177524058'
password = 'Devima@0812'

try:
    print("Connecting to OLD FTP...")
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    print("Login successful!")
    
    ftp.cwd('/public_html')
    print("Listing files in /public_html:")
    files = ftp.nlst()
    print(files)
    
    # Try to check if .htaccess exists
    print("\nDetailed listing in /public_html:")
    ftp.retrlines('LIST', print)
    
    try:
        ftp.cwd('/public_html/admin')
        print("\nListing files in /public_html/admin:")
        ftp.retrlines('LIST', print)
        
        # Read index.html
        print("\nReading admin/index.html:")
        bio = io.BytesIO()
        ftp.retrbinary('RETR index.html', bio.write)
        print("--- admin/index.html ---")
        print(bio.getvalue().decode('utf-8')[:500])
        print("-------------------------")
    except Exception as e:
        print("Could not retrieve admin/index.html from old FTP:", e)
        
    ftp.quit()
except Exception as e:
    print("OLD FTP Error:", e)
