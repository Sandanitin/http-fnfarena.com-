import ftplib
import os

def upload_dir(ftp, local_dir, remote_dir):
    try:
        ftp.mkd(remote_dir)
    except:
        pass
    
    ftp.cwd(remote_dir)
    
    for item in os.listdir(local_dir):
        local_path = os.path.join(local_dir, item)
        if os.path.isfile(local_path):
            with open(local_path, 'rb') as f:
                ftp.storbinary(f'STOR {item}', f)
            print(f"Uploaded {item} to {remote_dir}")
        elif os.path.isdir(local_path):
            upload_dir(ftp, local_path, item)
            ftp.cwd('..')

def deploy():
    host = '145.79.212.7'
    user = 'u177524058'
    password = 'Devima@0812'
    
    print("Connecting to FTP...")
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    
    print("Uploading Client to /public_html...")
    ftp.cwd('/public_html')
    
    # Upload client files directly into public_html
    dist_dir = 'FNF_build_client/dist'
    for item in os.listdir(dist_dir):
        local_path = os.path.join(dist_dir, item)
        if os.path.isfile(local_path):
            with open(local_path, 'rb') as f:
                ftp.storbinary(f'STOR {item}', f)
            print(f"Uploaded {item}")
        elif os.path.isdir(local_path):
            upload_dir(ftp, local_path, item)
            ftp.cwd('/public_html')
            
    ftp.quit()
    print("Deployment completed successfully!")

if __name__ == "__main__":
    deploy()
