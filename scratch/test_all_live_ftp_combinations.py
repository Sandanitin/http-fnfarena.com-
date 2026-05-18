import ftplib

hosts = ['fnfarena.com', '145.79.212.7', '145.79.213.144']
users = [
    'u205277930', 
    'u906923037', 
    'u177524058', 
    'u882069120', 
    'u882069120.lightcoral-ferret-563515.hostingersite.com'
]
passwords = ['Nithin06@', 'Devima@0812', '3.&av9olrZrb)VRb+rO/']

print("Starting exhaustive FTP login test...")

successes = []

for host in hosts:
    for user in users:
        for password in passwords:
            # Skip known matches if they are already tested and correct/incorrect for staging
            print(f"Testing {host} | {user} | {password}...")
            try:
                ftp = ftplib.FTP(host, timeout=5)
                ftp.login(user, password)
                print(f"--> SUCCESS! {host} | {user} | {password}")
                successes.append({
                    "host": host,
                    "user": user,
                    "password": password,
                    "pwd": ftp.pwd()
                })
                # Check what folders are under this login
                try:
                    print("Files:")
                    ftp.retrlines('LIST', lambda line: print("  " + line))
                except Exception as e:
                    print("  Failed to list:", e)
                ftp.quit()
            except Exception as e:
                # print(f"  Failed: {e}")
                pass

print("\n--- TEST COMPLETED ---")
if successes:
    print(f"Found {len(successes)} working login(s):")
    for s in successes:
        print(f"Host: {s['host']} | User: {s['user']} | Pass: {s['password']} | PWD: {s['pwd']}")
else:
    print("No working logins found.")
