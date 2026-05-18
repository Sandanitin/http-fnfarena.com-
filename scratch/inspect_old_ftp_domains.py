import ftplib

host = '145.79.212.7'
user = 'u177524058'
password = 'Devima@0812'

try:
    print("Connecting to old FTP...")
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    print("Login successful!")
    
    print("\nListing '/domains':")
    ftp.cwd('/domains')
    ftp.retrlines('LIST', print)
    
    dirs = ftp.nlst()
    print("Domains list:", dirs)
    
    ftp.quit()
except Exception as e:
    print("Old FTP Error:", e)
