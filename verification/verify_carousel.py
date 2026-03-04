from playwright.sync_api import sync_playwright

def verify_ui(page):
    print("Navigating to Product Details Page...")
    page.goto("http://localhost:5175/product/1")
    page.wait_for_load_state("networkidle")

    # Desktop View
    page.set_viewport_size({"width": 1280, "height": 800})

    # Wait for images to load
    page.wait_for_selector("img", state="visible")
    page.wait_for_timeout(2000) # Give it a bit more time just in case Unsplash is slow

    page.screenshot(path="verification/product_carousel_desktop_loaded.png", full_page=True)

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
