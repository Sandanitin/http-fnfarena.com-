import ftplib

host = 'fnfarena.com'

credentials = [
    {
        "name": "u177524058 (Devima@0812)",
        "user": "u177524058",
        "pass": "Devima@0812"
    },
    {
        "name": "u882069120 (Nithin06@)",
        "user": "u882069120",
        "pass": "Nithin06@"
    },
    {
        "name": "u882069120 full user (Nithin06@)",
        "user": "u882069120.lightcoral-ferret-563515.hostingersite.com",
        "pass": "Nithin06@"
    }
]

for cred in credentials:
    print(f"\nTrying {cred['name']}...")
    try:
        ftp = ftplib.FTP(host)
        ftp.login(cred["user"], cred["pass"])
        print(f"SUCCESS with {cred['name']}!")
        print("Current directory:", ftp.pwd())
        print("Files:")
        ftp.retrlines('LIST', print)
        ftp.quit()
    except Exception as e:
        print(f"FAILED: {e}")
