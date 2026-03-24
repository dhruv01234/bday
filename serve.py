import qrcode
from pathlib import Path

# GitHub Pages URL
GITHUB_PAGES_URL = "https://dhruv01234.github.io/bday/"

def generate_qr_code(url):
    """Generate QR code for the URL"""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=15,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    img.save('qrcode.png')
    print(f"\n✅ QR Code generated: qrcode.png")
    print(f"\n📱 Share this link: {url}")
    print(f"\n💡 Open qrcode.png to scan or share with others!")

if __name__ == "__main__":
    print("=" * 60)
    print("🎉 Birthday Website QR Code Generator")
    print("=" * 60)
    
    generate_qr_code(GITHUB_PAGES_URL)
