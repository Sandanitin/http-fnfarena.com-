import ftplib

host = '145.79.212.7'
user = 'u177524058'
password = 'Devima@0812'

try:
    print("Connecting to old FTP...")
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    print("Login successful!")
    
    print("\nListing absolute root '/':")
    ftp.cwd('/')
    ftp.retrlines('LIST', print)
    
    dirs = ftp.nlst()
    print("Root list:", dirs)
    
    ftp.quit()
except Exception as e:
    print("Old FTP Error:", e)
