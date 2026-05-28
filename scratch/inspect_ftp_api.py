import ftplib

host = 'fnfarena.com'
user = 'u205277930'
password = '3.&av9olrZrb)VRb+rO/'

try:
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    ftp.cwd('/domains/fnfarena.com/public_html/api')
    print("Files inside /domains/fnfarena.com/public_html/api:")
    ftp.retrlines('LIST', print)
    ftp.quit()
except Exception as e:
    print("Error:", e)
111