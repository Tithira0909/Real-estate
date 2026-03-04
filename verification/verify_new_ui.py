from playwright.sync_api import sync_playwright

def verify_ui(page):
    # 1. Home Page Verification
    print("Navigating to Home Page...")
    page.goto("http://localhost:5173")
    page.wait_for_load_state("networkidle")

    # Desktop View
    page.set_viewport_size({"width": 1280, "height": 800})
    page.screenshot(path="verification/new_home_desktop.png", full_page=True)

    # Mobile View
    page.set_viewport_size({"width": 375, "height": 812})
    # Scroll slightly to trigger glass nav
    page.mouse.wheel(0, 100)
    page.wait_for_timeout(500)
    page.screenshot(path="verification/new_home_mobile.png", full_page=True)

    # 2. Shop Page Verification
    print("Navigating to Shop Page...")
    page.goto("http://localhost:5173/shop/All")
    page.wait_for_load_state("networkidle")
    page.set_viewport_size({"width": 1280, "height": 800})
    page.screenshot(path="verification/new_shop_desktop.png", full_page=True)

    page.set_viewport_size({"width": 375, "height": 812})
    page.screenshot(path="verification/new_shop_mobile.png", full_page=True)

    # 3. Product Details Page Verification
    print("Navigating to Product Details Page...")
    page.goto("http://localhost:5173/product/1")
    page.wait_for_load_state("networkidle")
    page.set_viewport_size({"width": 1280, "height": 800})
    page.screenshot(path="verification/new_product_desktop.png", full_page=True)

    page.set_viewport_size({"width": 375, "height": 812})
    page.screenshot(path="verification/new_product_mobile.png", full_page=True)

    # We will skip the cart drawer screenshot for now since the database backend may be disconnected or products may be loading differently

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
