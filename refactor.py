import re
import os

with open("orus_home.html.bak", "r", encoding="utf-8") as f:
    html = f.read()

# head
head_end = html.find("</head>") + 7
head_part = html[:head_end]

# nav
nav_start = html.find("<nav")
nav_end = html.find("</nav>") + 6
nav_part = html[nav_start:nav_end]

# clean nav
nav_part = nav_part.replace('''<div class="flex items-center gap-4 cursor-pointer" onclick="showPage('home')">''', '''<a href="orus_home.html" class="flex items-center gap-4 cursor-pointer">''')
nav_part = nav_part.replace('''<img src="orus_logo.png" alt="ORUS Logo" class="h-9 w-auto"\n                onerror="this.src='https://placehold.co/120x40?text=ORUS'">\n        </div>''', '''<img src="orus_logo.png" alt="ORUS Logo" class="h-9 w-auto"\n                onerror="this.src='https://placehold.co/120x40?text=ORUS'">\n        </a>''')
nav_part = re.sub(r'<a href="#" onclick="showPage\(\'home\'\)"', '<a href="orus_home.html"', nav_part)
nav_part = re.sub(r'<a href="#" onclick="showPage\(\'flow\', \'Digital TIN ID\'\)"', '<a href="digital_tin_id.html"', nav_part)


# footer
footer_start = html.find("<footer")
body_end = html.find("</body>")
footer_part = html[footer_start:body_end].strip()

# clean footer
footer_part = footer_part.replace('<li><a href="#" class="hover:text-white">New Registration</a></li>', '<li><a href="new_registration.html" class="hover:text-white">New Registration</a></li>')
footer_part = footer_part.replace('<li><a href="#" class="hover:text-white">Secondary Registration</a></li>', '<li><a href="secondary_registration.html" class="hover:text-white">Secondary Registration</a></li>')
footer_part = footer_part.replace('<li><a href="#" class="hover:text-white">Update Registration</a></li>', '<li><a href="update_registration.html" class="hover:text-white">Update Registration</a></li>')
footer_part = footer_part.replace('<li><a href="#" class="hover:text-white">TIN Verification</a></li>', '<li><a href="tin_verification.html" class="hover:text-white">TIN Verification</a></li>')
footer_part = re.sub(r'<li><a href="#" class="hover:text-white">Home</a></li>', '<li><a href="orus_home.html" class="hover:text-white">Home</a></li>', footer_part, count=1)
footer_part = re.sub(r'<script>.*?</script>', '', footer_part, flags=re.DOTALL) # remove script tag

# home page
page_home_start = html.find('<div id="page-home"')
page_home_end = html.find('<!-- USER FLOW PAGE -->')
page_home_part = html[page_home_start:page_home_end].strip()

# clean home page
page_home_part = page_home_part.replace('''<button onclick="showPage('flow', 'New Registration')"''', '<a href="new_registration.html"')
page_home_part = page_home_part.replace('''Get Started\n                    </button>''', '''Get Started\n                    </a>''')
page_home_part = page_home_part.replace('class="w-full sm:w-auto bg-white text-[#03297b] px-10 py-4 rounded font-bold hover:bg-slate-100 transition-all shadow-xl"', 'class="w-full sm:w-auto bg-white text-[#03297b] px-10 py-4 rounded font-bold hover:bg-slate-100 transition-all shadow-xl block text-center"')

def card_replacer(m):
    href = m.group(1).lower().replace(" ", "_").replace("tin", "tin") + ".html"
    return f'<a href="{href}"{m.group(2)}>{m.group(3)}more &rarr;</span>\n                </a>'

page_home_part = re.sub(
    r'<div onclick="showPage\(\'flow\', \'([^\']+)\'\)"([^>]+)>(.*?)more &rarr;</span>\s*</div>',
    card_replacer,
    page_home_part,
    flags=re.DOTALL
)
page_home_part = page_home_part.replace('<div id="page-home" class="active-page page-transition">', '<div>')

# build orus_home.html
with open("orus_home.html", "w", encoding="utf-8") as f:
    f.write(f"{head_part}\n<body class=\"min-h-screen flex flex-col\">\n{nav_part}\n{page_home_part}\n{footer_part}\n</body>\n</html>")

# define flows
flows = {
    'new_registration': {
        'title': 'New Registration',
        'desc': 'Application for Taxpayer Identification Number (TIN).',
        'content': """
                    <div class="space-y-10">
                        <div class="flex items-center gap-6 border-b pb-8">
                            <div class="w-14 h-14 bg-blue-900 text-white rounded flex items-center justify-center font-black text-xl">1</div>
                            <div>
                                <h3 class="text-lg font-bold">Select Taxpayer Category</h3>
                                <p class="text-xs text-slate-500">Choose the registration type that applies to you.</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="border-2 border-blue-700 bg-blue-50 p-8 rounded cursor-pointer relative shadow-sm">
                                <span class="absolute top-4 right-4 text-blue-700"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg></span>
                                <h4 class="font-bold text-blue-900 mb-2">Individual</h4>
                                <p class="text-xs text-blue-700">Self-employed, Professionals, or Employees.</p>
                            </div>
                            <div class="border-2 border-slate-100 p-8 rounded cursor-pointer hover:border-blue-200 shadow-sm transition-all">
                                <h4 class="font-bold text-slate-900 mb-2">Non-Individual</h4>
                                <p class="text-xs text-slate-500">Corporations, Partnerships, or Organizations.</p>
                            </div>
                        </div>
                        <button class="w-full bg-[#03297b] text-white py-4 rounded font-bold uppercase tracking-widest text-xs hover:bg-blue-900">Proceed to Application</button>
                    </div>"""
    },
    'tin_verification': {
        'title': 'TIN Verification',
        'desc': 'Check your registration status or verify a TIN.',
        'content': """
                    <div class="max-w-lg mx-auto py-10">
                        <h3 class="text-xl font-black text-center mb-8">TIN Inquiry Portal</h3>
                        <div class="space-y-6">
                            <div>
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Enter TIN</label>
                                <input type="text" placeholder="000-000-000-000" class="w-full border-2 border-slate-100 px-6 py-4 rounded focus:border-blue-700 outline-none font-bold tracking-widest">
                            </div>
                            <button class="w-full bg-[#03297b] text-white py-4 rounded font-bold uppercase tracking-widest text-xs">Verify Registration</button>
                        </div>
                        <p class="text-center text-[10px] mt-8 text-slate-400">Your information is protected under the Data Privacy Act of 2012.</p>
                    </div>"""
    },
    'update_registration': {
        'title': 'Update Registration',
        'desc': 'Update your existing BIR records securely.',
        'content': """
                    <div class="space-y-8">
                        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
                            <p class="text-xs text-yellow-800 font-bold italic">Note: You must have an active ORUS account to update your profile online.</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="p-6 border rounded hover:shadow-md cursor-pointer transition-all">
                                <h4 class="font-bold mb-2">Change Contact Details</h4>
                                <p class="text-xs text-slate-500">Email, Phone, or Emergency contacts.</p>
                            </div>
                            <div class="p-6 border rounded hover:shadow-md cursor-pointer transition-all">
                                <h4 class="font-bold mb-2">Add/Update Business Activity</h4>
                                <p class="text-xs text-slate-500">Register new branch or change line of business.</p>
                            </div>
                        </div>
                    </div>"""
    },
    'secondary_registration': {
        'title': 'Secondary Registration',
        'desc': 'Apply for ATP, register Books of Accounts, or Permits to Use (PTU).',
        'content': """
                    <div class="space-y-8">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="p-6 border rounded hover:shadow-md cursor-pointer transition-all">
                                <h4 class="font-bold mb-2">Authority to Print (ATP)</h4>
                                <p class="text-xs text-slate-500">Apply to print receipts and invoices.</p>
                            </div>
                            <div class="p-6 border rounded hover:shadow-md cursor-pointer transition-all">
                                <h4 class="font-bold mb-2">Books of Accounts</h4>
                                <p class="text-xs text-slate-500">Register manual or computerized books.</p>
                            </div>
                            <div class="p-6 border rounded hover:shadow-md cursor-pointer transition-all">
                                <h4 class="font-bold mb-2">Permit to Use (PTU)</h4>
                                <p class="text-xs text-slate-500">For CRM/POS machines or computerized accounting.</p>
                            </div>
                        </div>
                    </div>"""
    },
    'digital_tin_id': {
        'title': 'Digital TIN ID',
        'desc': 'Generate your official digital TIN ID card.',
        'content': """<div class="flex flex-col items-center py-10">
                    <div class="w-full max-w-sm bg-blue-900 rounded-xl p-6 text-white mb-10 shadow-2xl relative overflow-hidden">
                        <div class="flex justify-between items-start mb-6">
                            <div class="text-[8px] font-black leading-tight uppercase">Bureau of Internal Revenue<br>Digital TIN ID</div>
                            <div class="text-[8px] font-bold opacity-50">ORUS 2.0</div>
                        </div>
                        <div class="flex gap-4 mb-6">
                            <div class="w-20 h-24 bg-white/10 rounded border border-white/20"></div>
                            <div>
                                <div class="text-[10px] font-bold mb-2">DELA CRUZ, JUAN P.</div>
                                <div class="text-lg font-black tracking-widest">123-456-789</div>
                            </div>
                        </div>
                        <div class="text-[7px] text-white/40">Verified On: 20 FEB 2024</div>
                    </div>
                    <button class="bg-[#03297b] text-white px-12 py-3 rounded font-bold uppercase tracking-widest text-xs">Download Digital ID</button>
                </div>"""
    }
}

for name, flow in flows.items():
    page_html = f"""{head_part}
<body class="min-h-screen flex flex-col">
    {nav_part}
    
    <div class="flex-grow bg-slate-50">
        <div class="bg-[#03297b] py-16 px-6 md:px-24 text-white">
            <div class="max-w-7xl mx-auto">
                <nav class="text-[10px] font-black tracking-widest mb-6 opacity-60 flex items-center gap-2 uppercase">
                    <a href="orus_home.html" class="hover:underline">Home</a>
                    <span>/</span>
                    <span>{flow['title']}</span>
                </nav>
                <h1 class="text-3xl md:text-5xl font-black mb-4">{flow['title']}</h1>
                <p class="text-blue-100 opacity-80 max-w-3xl text-sm md:text-base">{flow['desc']}</p>
            </div>
        </div>

        <div class="max-w-4xl mx-auto px-6 -mt-10 mb-24">
            <div class="bg-white rounded shadow-2xl p-10 min-h-[400px]">
{flow['content']}
            </div>
        </div>
    </div>

    {footer_part}
</body>
</html>"""
    
    with open(f"{name}.html", "w", encoding="utf-8") as f:
        f.write(page_html)

print("HTML generation successful.")
