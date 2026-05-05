import os
import re
import glob
import shutil

root = os.getcwd()

templates_dir = os.path.join(root, "templates")
static_dir = os.path.join(root, "static")
static_css_dir = os.path.join(static_dir, "css")
static_js_dir = os.path.join(static_dir, "js")
static_img_dir = os.path.join(static_dir, "images")

os.makedirs(templates_dir, exist_ok=True)
os.makedirs(static_css_dir, exist_ok=True)
os.makedirs(static_js_dir, exist_ok=True)
os.makedirs(static_img_dir, exist_ok=True)

image_files = ["bg.png", "bir_logo.png", "orus_logo.png"]
for image in image_files:
    src = os.path.join(root, image)
    if os.path.exists(src):
        shutil.move(src, os.path.join(static_img_dir, image))

html_files = [f for f in glob.glob("*.html") if os.path.isfile(f)]

css_chunks = []
imports = set()
js_by_file = {}
html_out = {}

style_re = re.compile(r"<style[^>]*>(.*?)</style>", re.IGNORECASE | re.DOTALL)
script_re = re.compile(r"<script\b([^>]*)>(.*?)</script>", re.IGNORECASE | re.DOTALL)

for filename in html_files:
    with open(filename, "r", encoding="utf-8") as f:
        text = f.read()

    for block in style_re.findall(text):
        for imp in re.findall(r"@import[^;]+;", block):
            imports.add(imp.strip())
        cleaned = re.sub(r"@import[^;]+;", "", block).strip()
        if cleaned:
            css_chunks.append(f"/* {filename} */\n{cleaned}\n")

    text = style_re.sub("", text)

    def script_repl(match):
        attrs = match.group(1) or ""
        content = match.group(2) or ""
        if "src=" in attrs:
            return match.group(0)
        if content.strip():
            js_by_file.setdefault(filename, []).append(content.strip())
        return ""

    text = script_re.sub(script_repl, text)

    for image in image_files:
        text = text.replace(f'src="{image}"', f'src="/static/images/{image}"')
        text = text.replace(f"src='{image}'", f"src='/static/images/{image}'")

    if "/static/css/app.css" not in text:
        text = re.sub(r"</head>", "    <link rel=\"stylesheet\" href=\"/static/css/app.css\">\n</head>", text, flags=re.IGNORECASE)

    html_out[filename] = text


css_content = ""
if imports:
    css_content += "\n".join(sorted(imports)) + "\n\n"
css_content += "\n".join(css_chunks)

css_content = re.sub(r"\.nav-item\s*\{[^}]*\}", "", css_content, flags=re.DOTALL)
css_content = re.sub(r"\.nav-item\.active\s*\{[^}]*\}", "", css_content, flags=re.DOTALL)
css_content = re.sub(r"\.accordion-button\.active\s*\{[^}]*\}", "", css_content, flags=re.DOTALL)
css_content = re.sub(r"\.input-base\s*\{[^}]*\}", "", css_content, flags=re.DOTALL)

css_content += """
.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    color: #64748b;
    cursor: pointer;
    transition: color 0.15s ease;
}

.nav-item:hover {
    color: #244093;
}

.nav-item.active {
    color: #244093;
}

.accordion-button.active {
    background-color: #eef2ff;
}

.input-base {
    width: 100%;
    border: 2px solid #f1f5f9;
    padding: 1rem 1.5rem;
    border-radius: 0.25rem;
    font-weight: 700;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.input-base:focus {
    border-color: #1d4ed8;
}
"""

css_content = re.sub(r"url\(['\"]?bg\.png['\"]?\)", "url('/static/images/bg.png')", css_content)

with open(os.path.join(static_css_dir, "app.css"), "w", encoding="utf-8") as f:
    f.write(css_content.strip() + "\n")

for filename, chunks in js_by_file.items():
    js_path = os.path.join(static_js_dir, os.path.splitext(filename)[0] + ".js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write("\n\n".join(chunks).strip() + "\n")

for filename, text in html_out.items():
    if filename in js_by_file:
        script_tag = f"    <script src=\"/static/js/{os.path.splitext(filename)[0]}.js\" defer></script>\n"
        if f"/static/js/{os.path.splitext(filename)[0]}.js" not in text:
            text = re.sub(r"</head>", script_tag + "</head>", text, flags=re.IGNORECASE)

    out_path = os.path.join(templates_dir, filename)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text.strip() + "\n")

    os.remove(os.path.join(root, filename))

print("Restructure complete.")
