import re

files = [
    r"f:\Project Folder\HCI\tin_verification_form.html",
    r"f:\Project Folder\HCI\business_search_form.html"
]

floating_container = 'relative w-full'
floating_input = 'block px-4 py-3 w-full bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-xl text-slate-900 focus:outline-none focus:border-[#244093] focus:bg-white focus:ring-4 focus:ring-[#244093]/10 transition-all duration-200 text-sm font-semibold peer hover:border-slate-300 hover:bg-white'
floating_label = 'absolute text-sm font-bold text-slate-500 duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-left left-4 px-1 peer-focus:text-[#244093] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 pointer-events-none rounded-sm bg-white peer-placeholder-shown:bg-transparent'
static_floating_label = 'absolute text-sm font-bold text-slate-500 transform -translate-y-4 scale-75 top-2 z-10 origin-left left-4 bg-white px-1 pointer-events-none rounded-sm'

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Clean up the style blocks first by removing the block definitions entirely
    content = re.sub(r'\s*\.floating-container\s*{[^}]*}', '', content)
    content = re.sub(r'\s*\.floating-input\s*{[^}]*}', '', content)
    content = re.sub(r'\s*\.floating-input:not\([^)]+\)\s*{[^}]*}', '', content)
    content = re.sub(r'\s*\.floating-label\s*{[^}]*}', '', content)
    content = re.sub(r'\s*\.static-floating-label\s*{[^}]*}', '', content)

    # Now replace the classes in the HTML body
    content = content.replace('static-floating-label', static_floating_label)
    content = content.replace('floating-label', floating_label)
    content = content.replace('floating-input', floating_input)
    content = content.replace('floating-container', floating_container)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Inlining complete!")
