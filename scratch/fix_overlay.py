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

for file_path in files:
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update hero padding to provide more bottom space
    # Replace py-10 or py-20 or py-16 with pt-20 pb-32 or pt-20 pb-40
    new_content = re.sub(r'hero-bg\s+py-(?:10|16|20)', 'hero-bg pt-20 pb-40', content)
    
    # 2. Standardize negative margin on the content card to prevent overlap
    # Replace -mt-8, -mt-10, -mt-20 with -mt-20 (since pb-40 is large enough)
    new_content = re.sub(r'-mt-(?:8|10|20)', '-mt-24', new_content)
    
    # 3. Ensure the text above doesn't get squashed (mx-auto max-w-2xl etc)
    # No changes needed here usually, but let's make sure text is centered if it wasn't
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Fixed overlay issues in {file_path}")
