from playwright.sync_api import sync_playwright

def verify_ui(page):
    # Home Page Verification
    print("Navigating to Home Page...")
    page.goto("http://localhost:5173")
    page.wait_for_load_state("networkidle")

    # Mobile View
    page.set_viewport_size({"width": 375, "height": 812})
    # Scroll slightly to trigger glass nav
    page.mouse.wheel(0, 800)
    page.wait_for_timeout(500)
    page.screenshot(path="verification/mobile_categories_scrollable.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            verify_ui(page)
            print("Verification screenshots captured successfully.")
        finally:
            browser.close()
