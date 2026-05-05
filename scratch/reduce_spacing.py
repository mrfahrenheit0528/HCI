import os
import re

files = [
    r"d:\Documents\PorTaxPH\HCI\flask\templates\new_registration.html",
    r"d:\Documents\PorTaxPH\HCI\flask\templates\secondary_registration.html",
    r"d:\Documents\PorTaxPH\HCI\flask\templates\update_registration.html",
    r"d:\Documents\PorTaxPH\HCI\flask\templates\tin_verification.html",
    r"d:\Documents\PorTaxPH\HCI\flask\templates\retrieve_tin.html",
    r"d:\Documents\PorTaxPH\HCI\flask\templates\add_branch_facility.html",
    r"d:\Documents\PorTaxPH\HCI\flask\templates\digital_tin_id.html"
]

for file_path in files:
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Reduce space between h1 and p
    # Replace mt-6 with mt-3 or mt-2
    new_content = content.replace('mt-6', 'mt-3')
    
    # Replace mb-4 or mb-2 on h1 with mb-1
    new_content = re.sub(r'font-black\s+mb-[234]', 'font-black mb-1', new_content)
    
    # If there is a flex gap-6 between elements, reduce it to gap-2 or gap-3
    new_content = new_content.replace('gap-6', 'gap-3')
    
    # Specifically for the header area
    # If the h1 is inside a div, and the p is outside, the gap is controlled by the outer flex or default margins
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Reduced spacing in {file_path}")
