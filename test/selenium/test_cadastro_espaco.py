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

        button_cadastro_espaco = self.browser.find_element(
            By.XPATH, '.text-primary-foreground')
        button_cadastro_espaco.click()

        time.sleep(2)

        titulo_espaco = self.browser.find_element(
            By.CSS_SELECTOR, 'input.border-input:nth-child(2)')
        titulo_espaco.send_keys('Espaço de Teste')

        descricao_espaco = self.browser.find_element(
            By.CSS_SELECTOR, 'textarea.border-input')
        descricao_espaco.send_keys('Descrição do espaço de teste')

        avancar1 = self.browser.find_element(
            By.XPATH, '/html/body/div/div[2]/div/div/div[2]/button')
        avancar1.click()

        time.sleep(2)

        cidade = self.browser.find_element(
            By.CSS_SELECTOR, '#cidade')
        cidade.send_keys('São Paulo')

        rua = self.browser.find_element(
            By.CSS_SELECTOR, '#rua')
        rua.send_keys('Rua de Teste')

        bairro = self.browser.find_element(
            By.CSS_SELECTOR, '#bairro')
        bairro.send_keys('Bairro de Teste')

        observacao_espaco = self.browser.find_element(
            By.CSS_SELECTOR, '#observacao')
        observacao_espaco.send_keys('Observação do espaço de teste')

        avancar2 = self.browser.find_element(
            By.XPATH, '/html/body/div[1]/div[2]/div/div[1]/div[3]/button')
        avancar2.click()

        time.sleep(2)

        button_horarios = self.browser.find_element(
            By.XPATH, '/html/body/div[1]/div[2]/div/div[1]/div[2]/div[1]/div[1]/div[1]/button')
        button_horarios.click()

        time.sleep(2)

        button_dias = self.browser.find_element(
            By.XPATH, '/html/body/div/div[2]/div/div[1]/div[2]/div[2]/div[1]/div[1]/button')
        button_dias.click()

        time.sleep(2)

        avancar3 = self.browser.find_element(
            By.XPATH, '/html/body/div/div[2]/div/div[1]/div[3]/button')
        avancar3.click()

        time.sleep(2)

        valor = self.browser.find_element(
            By.CSS_SELECTOR, '#valor_desejado')
        valor.send_keys('100')

        taxa_limpeza = self.browser.find_element(
            By.CSS_SELECTOR, '#taxa_limpeza')
        taxa_limpeza.send_keys('10')

        avancar4 = self.browser.find_element(
            By.XPATH, '/html/body/div/div[2]/div/div[1]/div[3]/button')
        avancar4.click()

        time.sleep(10)

        button_publicar = self.browser.find_element(
            By.XPATH, '/html/body/div/div[2]/div/div[1]/div[4]/button')
        button_publicar.click()

        time.sleep(5)

        self.assertIn('/', self.browser.current_url)
