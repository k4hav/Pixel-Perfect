# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| `main` (latest) | ✅ Active support |
| Older releases | ❌ No longer supported |

---

## 🔒 Reporting a Vulnerability

**Please do NOT open a public GitHub Issue for security vulnerabilities.**

If you discover a security vulnerability in PixelPerfect, please report it responsibly by:

1. **Opening a private security advisory** on GitHub:  
   Go to the repo → **Security** tab → **Report a vulnerability**

2. **Include the following in your report:**
   - Description of the vulnerability
   - Steps to reproduce it
   - Potential impact
   - Suggested fix (if you have one)

---

## Response Timeline

| Step | Timeframe |
|---|---|
| Acknowledgement of report | Within **48 hours** |
| Confirmation & assessment | Within **7 days** |
| Patch release (if valid) | Within **30 days** |

---

## Scope

Since PixelPerfect processes all images **client-side** with no backend server, the attack surface is limited. However, we take seriously:

- **XSS vulnerabilities** via malicious image metadata
- **Prototype pollution** in dependencies
- **Dependency vulnerabilities** (npm audit issues)
- **iframe security** related to the Spline 3D embed

---

## Out of Scope

- Issues in `node_modules` already reported upstream
- Self-XSS (attacks requiring user to paste code themselves)
- Theoretical vulnerabilities with no practical exploit

---

Thank you for helping keep PixelPerfect secure. 💜
