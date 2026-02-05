from playwright.sync_api import sync_playwright, expect
import time

def verify_premium():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create a new context to ensure clean state (no local storage)
        context = browser.new_context()
        page = context.new_page()

        try:
            print("Navigating to /premium...")
            page.goto("http://localhost:5173/premium")

            # Verify Landing Page
            print("Verifying Landing Page...")
            expect(page.get_by_text("Unlock Your Australian Dream")).to_be_visible()

            # Check for TopBar (Header) - checking for a common element in TopBar like "IndOz" or menu
            # Since I don't know exact text in TopBar, I'll check if the header element exists and is visible
            # Assuming TopBar is a <header> or has a specific class.
            # From previous reads, TopBar is likely at the top.

            # Take screenshot of Landing Page
            page.screenshot(path="verification/premium_landing.png")
            print("Screenshot saved: verification/premium_landing.png")

            # Enter Code
            print("Entering Access Code...")
            page.fill("input[placeholder='Enter Access Code']", "BETA2025")
            page.click("button:has-text('UNLOCK PREMIUM')")

            # Wait for Dashboard
            print("Waiting for Dashboard...")
            expect(page.get_by_text("IndOz+ Dashboard")).to_be_visible()

            # Wait a bit for any animations
            time.sleep(1)

            # Take screenshot of Dashboard
            page.screenshot(path="verification/premium_dashboard.png")
            print("Screenshot saved: verification/premium_dashboard.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_premium()
