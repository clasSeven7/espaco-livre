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

    def test_cadastro_locatario(self):

        time.sleep(1)

        button_criar = self.browser.find_element(
            By.XPATH, '/html/body/div/div[2]/div[5]/button')
        button_criar.click()

        time.sleep(4)

        button_locatario = self.browser.find_element(
            By.XPATH, '/html/body/div[3]/div[2]/a[1]/button')
        button_locatario.click()

        time.sleep(5)

        usuario = self.browser.find_element(
            By.CSS_SELECTOR, '#nome_usuario > div:nth-child(2) > input:nth-child(2)')
        usuario.send_keys('pablo')

        email = self.browser.find_element(
            By.CSS_SELECTOR, '#email > div:nth-child(2) > input:nth-child(2)')
        email.send_keys('pablo@gmail.com')

        senha = self.browser.find_element(
            By.CSS_SELECTOR, '#senha > div:nth-child(2) > input:nth-child(2)')
        senha.send_keys('123456789')

        cpf = self.browser.find_element(
            By.CSS_SELECTOR, '#cpf > div:nth-child(2) > input:nth-child(2)')
        cpf.send_keys('12345678901')

        data_nascimento = self.browser.find_element(
            By.CSS_SELECTOR, '#data_de_nascimento > div:nth-child(2) > input:nth-child(2)')
        data_nascimento.send_keys('01/01/2000')

        checkbox_termos = self.browser.find_element(
            By.CSS_SELECTOR, '.peer')
        checkbox_termos.click()
        time.sleep(1)

        self.browser.execute_script("window.scrollBy(0, 500);")
        time.sleep(1)

        cidade = self.browser.find_element(
            By.CSS_SELECTOR, '#cidade > div:nth-child(2) > input:nth-child(2)')
        cidade.send_keys('Patos')

        cep = self.browser.find_element(
            By.CSS_SELECTOR, '#cep > div:nth-child(2) > input:nth-child(2)')
        cep.send_keys('12345678')

        enderoco = self.browser.find_element(
            By.CSS_SELECTOR, '#endereco > div:nth-child(2) > input:nth-child(2)')
        enderoco.send_keys('Rua pereira dos santos')

        telefone = self.browser.find_element(
            By.CSS_SELECTOR, '#telefone > div:nth-child(2) > input:nth-child(2)')
        telefone.send_keys('839123456789')

        button_cadastrar = self.browser.find_element(
            By.XPATH, '/html/body/div/div[2]/button')
        button_cadastrar.click()
        time.sleep(4)

        self.assertIn('/login', self.browser.current_url)
