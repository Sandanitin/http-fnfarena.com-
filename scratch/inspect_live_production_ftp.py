import ftplib

host = 'fnfarena.com'
user = 'u205277930'
password = '3.&av9olrZrb)VRb+rO/'

try:
    print("Connecting to LIVE FTP...")
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    print("Login successful!")
    
    print("\nListing absolute root '/':")
    ftp.cwd('/')
    ftp.retrlines('LIST', print)
    
    print("\nChecking public_html:")
    try:
        ftp.cwd('/public_html')
        ftp.retrlines('LIST', print)
        
        # Check if there is an admin or cms folder in /public_html
        subdirs = ftp.nlst()
        print("Files/folders inside /public_html:", subdirs)
        
        if 'admin' in subdirs:
            print("\nAdmin folder exists! Listing /public_html/admin:")
            ftp.cwd('/public_html/admin')
            ftp.retrlines('LIST', print)
            
            # Let's inspect index.html inside admin folder
            import io
            bio = io.BytesIO()
            ftp.retrbinary('RETR index.html', bio.write)
            print("\nContent of /public_html/admin/index.html:")
            print(bio.getvalue().decode('utf-8')[:500])
        else:
            print("Admin folder does NOT exist in /public_html!")
            
    except Exception as e:
        print("Failed to navigate /public_html:", e)
        
    ftp.quit()
except Exception as e:
    print("LIVE FTP Error:", e)
