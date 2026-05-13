import ftplib

host = '145.79.212.7'
user = 'u177524058'
password = 'Devima@0812'

try:
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    ftp.cwd('/public_html')
    print("Files in public_html:")
    files = []
    ftp.retrlines('LIST', files.append)
    
    has_default = False
    for f in files:
        print(f)
        if 'default.php' in f:
            has_default = True
            
    if has_default:
        print("Deleting default.php...")
        ftp.delete('default.php')
        print("Deleted default.php!")
        
    ftp.quit()
except Exception as e:
    print("Error:", e)
