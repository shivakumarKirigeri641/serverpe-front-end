import os

files = {
    r"C:\Users\shiva\source\repos\serverpe-front-end\src\components\WhyChooseMe.jsx": "WhyChooseMe",
    r"C:\Users\shiva\source\repos\serverpe-front-end\src\components\Navbar.jsx": "Navbar",
    r"C:\Users\shiva\source\repos\serverpe-front-end\src\components\Hero.jsx": "Hero",
    r"C:\Users\shiva\source\repos\serverpe-front-end\src\components\ContactUs.jsx": "ContactUs",
    r"C:\Users\shiva\source\repos\serverpe-front-end\src\components\VehicleAlerts.jsx": "VehicleAlerts",
    r"C:\Users\shiva\source\repos\serverpe-front-end\src\components\Services.jsx": "Services",
}

for filepath, component_name in files.items():
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        content = f.read()
    
    marker = f"export default {component_name};"
    idx = content.find(marker)
    if idx == -1:
        print(f"SKIP {filepath}: marker not found")
        continue
    
    # Keep everything up to and including the first occurrence of the marker
    truncated = content[:idx + len(marker)] + "\n"
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(truncated)
    
    print(f"OK {filepath}: truncated at line with '{marker}'")

print("Done.")
