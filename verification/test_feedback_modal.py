from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Wait for server to be ready
    base_url = "http://localhost:5173"

    print(f"Navigating to {base_url}...")
    try:
        page.goto(base_url, timeout=30000)
    except Exception as e:
        print(f"Error connecting to server: {e}")
        browser.close()
        return

    # Set onboarding completed to avoid overlapping modal
    # Also fix JSON string for premium code
    page.evaluate("localStorage.setItem('indoz_onboarding_completed', 'true')")

    # Reload page to apply onboarding
    page.reload()
    print("Reloaded page with onboarding completed.")

    print("Navigated to home.")

    # Check for Feedback button in TopBar
    feedback_btn = page.get_by_role("button", name="Feedback").first
    expect(feedback_btn).to_be_visible()
    print("Feedback button visible in TopBar.")

    # Click it
    feedback_btn.click()
    print("Clicked Feedback button.")

    # Check for Modal
    expect(page.get_by_role("heading", name="Berikan Masukan")).to_be_visible()
    print("Modal opened.")

    # Interact with stars
    modal = page.locator(".fixed.inset-0").filter(has_text="Berikan Masukan")
    modal_stars = modal.locator("button:has(svg.lucide-star)")

    expect(modal_stars.first).to_be_visible()

    count = modal_stars.count()
    print(f"Found {count} stars in modal.")
    if count >= 5:
        modal_stars.nth(4).click()
        print("Clicked 5th star.")
    else:
        print("Could not find stars!")

    # Check if submit button is enabled
    submit_btn = page.get_by_role("button", name="Kirim Feedback")
    expect(submit_btn).to_be_enabled()
    print("Submit button enabled.")

    # Select Category
    modal.locator("select").select_option("Fitur")
    print("Selected 'Fitur'.")

    # Type comment
    modal.locator("textarea").fill("This is a test feedback from Playwright.")
    print("Filled comment.")

    # Take screenshot
    page.screenshot(path="verification/feedback_modal_filled.png")
    print("Screenshot taken.")

    # Close modal
    close_btn = modal.locator("button").filter(has=page.locator("svg.lucide-x"))
    close_btn.click()
    expect(page.get_by_role("heading", name="Berikan Masukan")).not_to_be_visible()
    print("Modal closed.")

    # Test Premium Header
    print("Testing Premium Header...")

    # Set premium code properly as JSON string
    page.evaluate("localStorage.setItem('indoz_premium_code', JSON.stringify('PREMIUM'))")

    # Go to premium dashboard
    page.goto(base_url + "/premium")
    print("Navigated to Premium Dashboard.")
    page.wait_for_load_state("networkidle")

    # Debug: Print buttons
    buttons = page.get_by_role("button").all()
    print(f"Found {len(buttons)} buttons:")
    for btn in buttons:
        try:
            print(f"- '{btn.text_content()}' (visible: {btn.is_visible()})")
        except:
            print("- (error reading button)")

    # Check for Feedback button in Premium Header
    premium_feedback_btns = page.get_by_role("button", name="Feedback")
    count = premium_feedback_btns.count()
    print(f"Found {count} Feedback buttons on Premium page.")

    if count > 0:
        premium_feedback_btns.last.click()
        expect(page.get_by_role("heading", name="Berikan Masukan")).to_be_visible()
        print("Premium Feedback modal opened.")
        page.screenshot(path="verification/premium_feedback_modal.png")
    else:
        print("No Feedback button found on Premium page!")
        page.screenshot(path="verification/premium_page_failed.png")

    browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
