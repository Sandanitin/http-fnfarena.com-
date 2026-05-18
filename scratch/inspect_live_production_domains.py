import ftplib

host = 'fnfarena.com'
user = 'u205277930'
password = '3.&av9olrZrb)VRb+rO/'

try:
    print("Connecting to LIVE FTP...")
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    print("Login successful!")
    
    print("\nListing '/domains':")
    ftp.cwd('/domains')
    ftp.retrlines('LIST', print)
    
    subdirs = ftp.nlst()
    print("\nSubdirectories inside /domains:", subdirs)
    
    for subdir in subdirs:
        if subdir not in ['.', '..']:
            print(f"\nListing '/domains/{subdir}':")
            try:
                ftp.cwd(f'/domains/{subdir}')
                ftp.retrlines('LIST', print)
                
                # Check for public_html inside the domain folder
                domain_files = ftp.nlst()
                if 'public_html' in domain_files:
                    print(f"  Found public_html inside /domains/{subdir}! Listing it:")
                    ftp.cwd(f'/domains/{subdir}/public_html')
                    ftp.retrlines('LIST', print)
                    
                    # Check for admin or cms folder
                    inner_files = ftp.nlst()
                    print(f"  Files inside /domains/{subdir}/public_html:", inner_files)
                    
                    if 'admin' in inner_files:
                        print(f"    --> Found admin folder in /domains/{subdir}/public_html! Listing it:")
                        ftp.cwd(f'/domains/{subdir}/public_html/admin')
                        ftp.retrlines('LIST', print)
                        
                        # Read index.html
                        import io
                        bio = io.BytesIO()
                        ftp.retrbinary('RETR index.html', bio.write)
                        print(f"    --> Content of /domains/{subdir}/public_html/admin/index.html:")
                        print(bio.getvalue().decode('utf-8')[:600])
            except Exception as ex:
                print(f"  Failed to list /domains/{subdir}:", ex)
                
    ftp.quit()
except Exception as e:
    print("LIVE FTP Error:", e)
