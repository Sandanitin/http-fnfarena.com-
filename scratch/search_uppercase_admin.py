import os

dir_to_search = r"c:\Users\sanda\Desktop\vikrin sir\fnf\fnf_admin_build\dist"

print("Searching in:", dir_to_search)

for root, dirs, files in os.walk(dir_to_search):
    for file in files:
        file_path = os.path.join(root, file)
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            if "/Admin" in content:
                print(f"Found '/Admin' in: {file_path}")
                # Print context
                idx = content.find("/Admin")
                print("Context:", content[max(0, idx-50):min(len(content), idx+100)])
                print("-" * 50)
        except Exception as e:
            pass

print("Search complete!")
