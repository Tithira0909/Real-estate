from playwright.sync_api import sync_playwright, expect
import time

def verify_ui(page):
    print("Navigating to Admin Dashboard (Should redirect to Login)...")
    page.goto("http://localhost:5175/admin/login")
    page.wait_for_load_state("networkidle")

    # Try valid login
    page.fill('input[type="text"]', 'admin')
    page.fill('input[type="password"]', 'admin')
    page.click('button[type="submit"]')
    page.wait_for_timeout(2000)

    page.screenshot(path="verification/admin_dashboard_accessed.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()
        # Enable console logs to debug
        page.on("console", lambda msg: print(f"Browser console: {msg.text}"))
        try:
            verify_ui(page)
            print("Verification screenshots captured successfully.")
        finally:
            browser.close()
