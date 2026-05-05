import os
import re

files = [
    r"d:\Documents\PorTaxPH\HCI\flask\templates\new_registration.html",
    r"d:\Documents\PorTaxPH\HCI\flask\templates\secondary_registration.html",
    r"d:\Documents\PorTaxPH\HCI\flask\templates\update_registration.html",
    r"d:\Documents\PorTaxPH\HCI\flask\templates\tin_verification.html",
    r"d:\Documents\PorTaxPH\HCI\flask\templates\retrieve_tin.html",
    r"d:\Documents\PorTaxPH\HCI\flask\templates\add_branch_facility.html"
]

# Pattern to match the back arrow link and its surrounding flex structure
pattern = re.compile(r'<a href="(?:orus_home\.html|/)" class="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 group">.*?</a>', re.DOTALL)

for file_path in files:
    if not os.path.exists(file_path):
        print(f"Skipping {file_path}, not found.")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove the back arrow
    new_content = pattern.sub('', content)
    
    # Clean up potentially broken flex containers or gaps
    # Specifically look for <div class="flex items-center gap-6"> and change to something simpler or centered
    if 'flex items-center gap-6' in new_content:
        new_content = new_content.replace('flex items-center gap-6', 'flex items-center justify-center text-center')
        new_content = new_content.replace('md:items-end justify-between', 'items-center justify-center text-center')
    
    # Remove "Test" from New Registration
    new_content = new_content.replace('New Registration Test', 'New Registration')
    
    # Remove "test" from Home page badge (oops)
    if 'orus_home.html' in file_path:
         new_content = new_content.replace('Online Tax Registration test', 'Online Tax Registration and Update System')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Processed {file_path}")

# Special check for orus_home.html since I edited it manually
home_path = r"d:\Documents\PorTaxPH\HCI\flask\templates\orus_home.html"
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()
new_content = content.replace('Online Tax Registration test', 'Online Tax Registration and Update System')
with open(home_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"Processed {home_path}")
