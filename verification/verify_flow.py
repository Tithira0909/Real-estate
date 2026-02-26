from playwright.sync_api import sync_playwright
import time

def verify_cevon_flow():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            # 1. Visit Home
            print("Navigating to Home...")
            page.goto("http://localhost:5174")
            time.sleep(2)
            page.screenshot(path="verification/1_home.png")

            # 2. Navigate to Shop (Necklaces)
            print("Navigating to Necklaces...")
            page.click("text=Necklaces")
            time.sleep(2)
            page.screenshot(path="verification/2_shop_necklaces.png")

            # 3. Click first product
            print("Viewing Product...")
            # Wait for products to load
            page.wait_for_selector(".group", timeout=10000)
            products = page.locator(".group")
            if products.count() > 0:
                products.first.click()
                time.sleep(2)
                page.screenshot(path="verification/3_product_detail.png")

                # 4. Add to Cart
                print("Adding to Cart...")
                page.click("text=Add to Bag")
                time.sleep(1)
                page.screenshot(path="verification/4_cart_drawer.png")

                # 5. Go to Checkout
                print("Going to Checkout...")
                page.click("text=Checkout")
                time.sleep(2)
                page.screenshot(path="verification/5_checkout.png")
            else:
                print("No products found in category.")

            # 6. Check Admin Dashboard
            print("Checking Admin...")
            page.goto("http://localhost:5174/admin")
            time.sleep(2)
            page.screenshot(path="verification/6_admin.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_cevon_flow()
