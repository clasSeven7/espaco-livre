import time
import unittest

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By


class TestLogDividido(unittest.TestCase):

    def setUp(self):
        chrome_options = Options()

        # chrome_options.add_argument("-headless")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")

        self.browser = webdriver.Chrome(options=chrome_options)

        self.browser.get('http://localhost:3000//login//')

    def tearDown(self):
        self.browser.quit()

    def test_login(self):

        time.sleep(1)

        username = self.browser.find_element(
            By.CSS_SELECTOR, 'div.w-full:nth-child(1) > input:nth-child(2)')
        username.send_keys('saulo')

        senha = self.browser.find_element(
            By.CSS_SELECTOR, 'form.w-full > div:nth-child(2) > input:nth-child(2)')
        senha.send_keys('123456789')

        button_login = self.browser.find_element(
            By.XPATH, '/html/body/div/div[2]/form/div[3]/button')
        button_login.click()

        time.sleep(4)

        self.assertIn('/', self.browser.current_url)
