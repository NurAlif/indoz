from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to chat
        page.goto("http://localhost:5174")

        # Wait for page load
        page.wait_for_load_state("networkidle")

        # Dismiss Onboarding Modal if present
        if page.get_by_role("button", name="Mulai Sekarang").is_visible():
            print("Dismissing Onboarding Modal...")
            page.get_by_role("button", name="Mulai Sekarang").click()

        # Check custom header
        expect(page.get_by_text("IndOz.work")).to_be_visible()
        expect(page.get_by_text("Back to Home")).to_be_visible()
        expect(page.get_by_text("Dian S.")).to_be_visible()

        # Check Main Content
        expect(page.get_by_role("heading", name="Ollie 2.0")).to_be_visible()
        expect(page.get_by_text("Reset Chat")).to_be_visible()

        # Check suggestions chips
        expect(page.get_by_text("Cek Syarat WHV")).to_be_visible()

        # Check Input area
        expect(page.get_by_placeholder("Type your message to Ollie...")).to_be_visible()

        # Check that TopBar "Cari Lowongan" is NOT visible (assuming TopBar has it)
        expect(page.get_by_role("link", name="Cari Lowongan")).not_to_be_visible()

        # Check that Footer text is NOT visible (using specific footer text)
        expect(page.get_by_text("All rights reserved.")).not_to_be_visible()

        # Send a message to check UI
        page.get_by_placeholder("Type your message to Ollie...").fill("Hello verification")
        page.keyboard.press("Enter")

        # Wait for user message to appear
        expect(page.get_by_text("Hello verification")).to_be_visible()

        # Click suggestion
        page.get_by_role("button", name="Cek Syarat WHV").click()

        # Check input is empty after clicking suggestion
        expect(page.get_by_placeholder("Type your message to Ollie...")).to_have_value("")

        # Take screenshot
        page.screenshot(path="verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run()
