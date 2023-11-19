from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time

# Set up the driver (assumes ChromeDriver is in your PATH)
driver = webdriver.Chrome()

# Open the page
driver.get("https://www.tripadvisor.com/Search?ssrc=h&q=detroit")

# Let the page load
time.sleep(5)  # Adjust the sleep time if necessary

# Wait for the elements to load
wait = WebDriverWait(driver, 10)
elements = wait.until(EC.presence_of_all_elements_located(
    (By.CSS_SELECTOR, "div[data-widget-type='LOCATIONS'] div[class*='result-card']")))

# Extract and print the hotel IDs
for element in elements:
    onclick_attr = element.get_attribute('onclick')
    if onclick_attr:
        # Extract the hotel ID using regular expression
        match = re.search(r"Hotel_Review-(g\d+-d\d+)", onclick_attr)
        if match:
            hotel_id = match.group()
            print(hotel_id)

# Clean up by closing the browser window
driver.quit()
