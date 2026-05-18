import ftplib
import os

host = 'fnfarena.com'
user = 'u205277930'
password = '3.&av9olrZrb)VRb+rO/'

admin_local_dir = r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_admin_build\dist"
cms_local_dir = r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_cms_build\dist"
htaccess_local_file = r"c:\Users\sanda\Desktop\vikrin sir\fnf\FNF_build_client\dist\.htaccess"

def ensure_remote_dir(ftp, path):
    parts = [p for p in path.split('/') if p]
    current = ""
    for part in parts:
        current += "/" + part
        try:
            ftp.cwd(current)
        except Exception:
            try:
                print(f"Creating directory: {current}")
                ftp.mkd(current)
            except Exception as e:
                print(f"Failed to create directory {current}: {e}")

def upload_file(ftp, local_path, remote_path):
    print(f"Uploading {local_path} -> {remote_path}...", end=" ", flush=True)
    try:
        with open(local_path, 'rb') as f:
            ftp.storbinary(f'STOR {remote_path}', f)
        print("Success!", flush=True)
    except Exception as e:
        print(f"FAILED: {e}", flush=True)

def upload_folder(ftp, local_folder, remote_folder_prefix):
    ensure_remote_dir(ftp, remote_folder_prefix)
    
    # List local items
    for item in os.listdir(local_folder):
        local_item_path = os.path.join(local_folder, item)
        if os.path.isfile(local_item_path):
            remote_item_path = remote_folder_prefix + "/" + item
            upload_file(ftp, local_item_path, remote_item_path)
        elif os.path.isdir(local_item_path):
            new_remote_prefix = remote_folder_prefix + "/" + item
            upload_folder(ftp, local_item_path, new_remote_prefix)

try:
    print("Connecting to live production FTP...")
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    print("Login successful!")
    
    # 1. Upload .htaccess
    print("\n--- 1. Uploading .htaccess ---")
    upload_file(ftp, htaccess_local_file, "/domains/fnfarena.com/public_html/.htaccess")
    
    # 2. Upload Admin Panel
    print("\n--- 2. Uploading Admin Panel ---")
    upload_folder(ftp, admin_local_dir, "/domains/fnfarena.com/public_html/admin")
    
    # 3. Upload CMS Panel
    print("\n--- 3. Uploading CMS Panel ---")
    upload_folder(ftp, cms_local_dir, "/domains/fnfarena.com/public_html/cms")
    
    print("\n--- DEPLOYMENT COMPLETED ---")
    
    # Quick listing to verify
    print("\nListing admin folder contents:")
    ftp.cwd("/domains/fnfarena.com/public_html/admin")
    ftp.retrlines('LIST', print)
    
    print("\nListing admin/assets folder contents:")
    ftp.cwd("/domains/fnfarena.com/public_html/admin/assets")
    ftp.retrlines('LIST', print)
    
    ftp.quit()
    print("\nSync completed successfully!")
except Exception as e:
    print("Deployment failed:", e)
