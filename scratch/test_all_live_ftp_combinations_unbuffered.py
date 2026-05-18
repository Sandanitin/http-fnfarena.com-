import ftplib
import sys

hosts = ['fnfarena.com', '145.79.212.7', '145.79.213.144']
users = [
    'u205277930', 
    'u906923037', 
    'u177524058', 
    'u882069120', 
    'u882069120.lightcoral-ferret-563515.hostingersite.com'
]
passwords = ['Nithin06@', 'Devima@0812', '3.&av9olrZrb)VRb+rO/']

print("Starting real-time unbuffered FTP login test...", flush=True)

successes = []

for host in hosts:
    for user in users:
        for password in passwords:
            print(f"Testing {host} | {user} | {password}...", end=' ', flush=True)
            try:
                ftp = ftplib.FTP(host, timeout=3)
                ftp.login(user, password)
                print("--> SUCCESS!", flush=True)
                successes.append({
                    "host": host,
                    "user": user,
                    "password": password
                })
                ftp.quit()
            except Exception as e:
                print("FAILED", flush=True)

print("\n--- TEST COMPLETED ---", flush=True)
if successes:
    print(f"Found {len(successes)} working login(s):", flush=True)
    for s in successes:
        print(f"Host: {s['host']} | User: {s['user']} | Pass: {s['password']}", flush=True)
else:
    print("No working logins found.", flush=True)
