#!/usr/bin/env python3
"""
HTTPS Server for PWA
Generates self-signed certificate and serves over HTTPS
No OpenSSL required!
"""
import http.server
import ssl
import socket
import sys
from pathlib import Path

# Get local IP address
def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

# Generate self-signed certificate using Python
def generate_certificate():
    cert_file = Path("server.pem")
    
    if cert_file.exists():
        print("✅ Using existing SSL certificate")
        return str(cert_file)
    
    print("🔐 Generating self-signed SSL certificate...")
    
    try:
        from cryptography import x509
        from cryptography.x509.oid import NameOID
        from cryptography.hazmat.primitives import hashes
        from cryptography.hazmat.primitives.asymmetric import rsa
        from cryptography.hazmat.primitives import serialization
        import datetime
        import ipaddress
        
        # Generate private key
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
        )
        
        # Generate certificate
        local_ip = get_local_ip()
        subject = issuer = x509.Name([
            x509.NameAttribute(NameOID.COUNTRY_NAME, u"US"),
            x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, u"State"),
            x509.NameAttribute(NameOID.LOCALITY_NAME, u"City"),
            x509.NameAttribute(NameOID.ORGANIZATION_NAME, u"Dev"),
            x509.NameAttribute(NameOID.COMMON_NAME, local_ip),
        ])
        
        cert = x509.CertificateBuilder().subject_name(
            subject
        ).issuer_name(
            issuer
        ).public_key(
            private_key.public_key()
        ).serial_number(
            x509.random_serial_number()
        ).not_valid_before(
            datetime.datetime.now(datetime.UTC)
        ).not_valid_after(
            datetime.datetime.now(datetime.UTC) + datetime.timedelta(days=365)
        ).add_extension(
            x509.SubjectAlternativeName([
                x509.DNSName(u"localhost"),
                x509.IPAddress(ipaddress.ip_address(local_ip)),
            ]),
            critical=False,
        ).sign(private_key, hashes.SHA256())
        
        # Write certificate and key to PEM file
        with open("server.pem", "wb") as f:
            f.write(cert.public_bytes(serialization.Encoding.PEM))
            f.write(private_key.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.TraditionalOpenSSL,
                encryption_algorithm=serialization.NoEncryption()
            ))
        
        print("✅ SSL certificate generated successfully")
        return str(cert_file)
        
    except ImportError:
        print("📦 Installing cryptography package...")
        import subprocess
        subprocess.run([sys.executable, "-m", "pip", "install", "cryptography"], check=True)
        print("✅ Package installed. Please run the script again.")
        exit(0)
    except Exception as e:
        print(f"❌ Error generating certificate: {e}")
        import traceback
        traceback.print_exc()
        exit(1)

# Custom request handler with better error handling
class MyHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        # Custom logging
        print(f"[{self.address_string()}] {format % args}")
    
    def end_headers(self):
        # Add security headers for PWA
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

# Start HTTPS server
def start_server(port=8443):
    cert_file = generate_certificate()
    local_ip = get_local_ip()
    
    # Create server
    server_address = ('0.0.0.0', port)
    httpd = http.server.HTTPServer(server_address, MyHandler)
    
    # Configure SSL with better settings
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.check_hostname = False
    context.verify_mode = ssl.CERT_NONE
    
    try:
        context.load_cert_chain(cert_file)
    except Exception as e:
        print(f"❌ Error loading certificate: {e}")
        print("Regenerating certificate...")
        Path("server.pem").unlink(missing_ok=True)
        cert_file = generate_certificate()
        context.load_cert_chain(cert_file)
    
    # Wrap socket with SSL
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
    
    print("\n" + "="*70)
    print("🚀 HTTPS Server Started Successfully!")
    print("="*70)
    print(f"\n📱 Access from your iPhone Safari:")
    print(f"   https://{local_ip}:{port}/HealthMetrics.html")
    print(f"\n💻 Local access:")
    print(f"   https://localhost:{port}/HealthMetrics.html")
    print("\n⚠️  IMPORTANT - First time iPhone setup:")
    print("   1. Open the URL in Safari on your iPhone")
    print("   2. You'll see 'This Connection Is Not Private' warning")
    print("   3. Tap 'Show Details' or 'Advanced'")
    print("   4. Tap 'Visit This Website' or 'Proceed'")
    print("   5. Confirm again if asked")
    print("   6. Page should load! If not, close Safari completely and retry")
    print("\n💡 Troubleshooting 'Network Connection Lost':")
    print("   • Make sure both devices are on the same WiFi")
    print("   • Check your PC firewall allows port 8443")
    print("   • Try accessing https://localhost:8443/HealthMetrics.html on PC first")
    print("\n✨ For best experience:")
    print("   • Use Safari (not Chrome) on iPhone")
    print("   • Add to Home Screen for PWA mode")
    print("   • Camera permissions will be requested automatically")
    print("\n🛑 Press Ctrl+C to stop the server")
    print("="*70 + "\n")
    
    print("📡 Server is listening and ready for connections...\n")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n✋ Server stopped")
    except Exception as e:
        print(f"\n❌ Server error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        httpd.shutdown()
        print("Server shut down gracefully")

if __name__ == "__main__":
    try:
        start_server()
    except Exception as e:
        print(f"❌ Fatal error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
