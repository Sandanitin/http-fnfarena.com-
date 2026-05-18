import ftplib

host = '145.79.213.144'
user = 'u882069120.lightcoral-ferret-563515.hostingersite.com'
password = 'Nithin06@'

try:
    print("Connecting to FTP...")
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    print("Login successful!")
    
    print("\nListing absolute root '/':")
    ftp.cwd('/')
    ftp.retrlines('LIST', print)
    
    print("\nListing '.' current directory:")
    ftp.cwd('')
    ftp.retrlines('LIST', print)
    
    # Check if there are other directories under root
    dirs = ftp.nlst()
    print("Root directories list:", dirs)
    
    ftp.quit()
except Exception as e:
    print("FTP Error:", e)
