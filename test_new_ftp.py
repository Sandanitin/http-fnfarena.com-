import ftplib

host = '145.79.213.144'
full_user = 'u882069120.lightcoral-ferret-563515.hostingersite.com'
short_user = 'u882069120'
password = 'Nithin06@'

print("Trying full username...")
try:
    ftp = ftplib.FTP(host)
    ftp.login(full_user, password)
    print("Success with full username!")
    print(ftp.pwd())
    ftp.quit()
except Exception as e:
    print("Failed with full username:", e)

print("\nTrying short username...")
try:
    ftp = ftplib.FTP(host)
    ftp.login(short_user, password)
    print("Success with short username!")
    print(ftp.pwd())
    ftp.quit()
except Exception as e:
    print("Failed with short username:", e)
