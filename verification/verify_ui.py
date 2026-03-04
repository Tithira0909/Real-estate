from playwright.sync_api import sync_playwright
import time
import os

def take_screenshots(page, name, url):
    print(f"Testing {name} at {url}...")
    page.goto(url)
    time.sleep(2) # Let data load

    # Desktop
    page.set_viewport_size({"width": 1280, "height": 800})
    time.sleep(1)
    page.screenshot(path=f"verification/screenshots/{name}_desktop.png", full_page=True)

    # Mobile
    page.set_viewport_size({"width": 375, "height": 667})
    time.sleep(1)
    page.screenshot(path=f"verification/screenshots/{name}_mobile.png", full_page=True)


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        base_url = "http://localhost:5174" # Based on previous logs

        try:
            take_screenshots(page, "1_home", f"{base_url}/")
            take_screenshots(page, "2_shop", f"{base_url}/shop/All")

            # Navigate to product page for testing
            page.goto(f"{base_url}/shop/All")
            time.sleep(2)
            products = page.locator(".group")
            if products.count() > 0:
                products.first.click()
                time.sleep(2)
                # Now on product page, take screenshot

                # Desktop
                page.set_viewport_size({"width": 1280, "height": 800})
                time.sleep(1)
                page.screenshot(path=f"verification/screenshots/3_product_desktop.png", full_page=True)

                # Mobile
                page.set_viewport_size({"width": 375, "height": 667})
                time.sleep(1)
                page.screenshot(path=f"verification/screenshots/3_product_mobile.png", full_page=True)

                # Add to cart for checkout test
                print("Adding to cart...")
                page.click("text=Add to Bag")
                time.sleep(1)

                take_screenshots(page, "4_checkout", f"{base_url}/checkout")

            take_screenshots(page, "5_admin", f"{base_url}/admin")

        except Exception as e:
            print(f"Error occurred: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    if not os.path.exists('verification/screenshots'):
        os.makedirs('verification/screenshots')
    main()
