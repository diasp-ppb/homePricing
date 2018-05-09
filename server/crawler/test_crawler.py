# -*- coding: utf-8 -*-

import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
import unittest
import subprocess
import json

class ImovirtualCrawlerTests(unittest.TestCase):

    def test_extract_title(self):
        page = read_test_file()
        value = u"T2 C/Garagem Ind e Arrumo Óptimos Acabamentos-Gaia"
        self.assertEqual(page['title'],value)

    def test_extract_price(self):
        page = read_test_file()
        value = 122500
        self.assertEqual(page['price'], value)

    def test_extract_area(self):
        page = read_test_file()
        value = 116
        self.assertEqual(page['area'], value)

    def test_extract_tipology(self):
        page = read_test_file()
        value = "T2"
        self.assertEqual(page['tipology'], value)

    def test_extract_characteristics(self):
        page = read_test_file()
        value = [u"Aquecimento Central", u"Arrecadação", u"Cozinha Equipada", u"Elevador", u"Estores Eléctricos", u"Fibra Óptica", u"Gás Canalizado", u"Marquise", u"Parqueamento (1 carro)", u"Porta Blindada", u"Suite", u"Varanda", u"Vista de cidade"]
        self.assertEqual(page['characteristics'], value)

    def test_extract_description(self):
        page = read_test_file()
        value = u"  \n\nComercializado por: Sara Santos Negócios\n\nLicença AMI: 9721\n\n  \n  \n\nT2 com cozinha equipada, aquecimento central completo, suite, varanda,\nroupeiros garagem individual mais 1 arrumo na cave, junto a transportes e\nescolas..etc\n\n"
        self.assertEqual(page['description'], value)

    def test_extract_address(self):
        page = read_test_file()
        value = {"county": u"Vila Nova de Gaia", "town": u"Serzedo e Perosinho", "zipcode": "4415-076", "district": u"Porto"}
        self.assertDictEqual(page['address'], value)
    
    def test_extract_webpage(self):
        page = read_test_file()
        value = "https://www.imovirtual.com/anuncio/t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-IDExdA.html"
        self.assertEqual(page['webpage'], value)

    def test_extract_images(self):
        page = read_test_file()
        value = ["https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_1_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-vila-nova-de-gaia_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_2_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-adicionar-fotografias_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_3_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-apartamentos_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_4_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-venda_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_5_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-porto_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_6_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_7_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_8_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_9_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_10_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_11_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_12_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_13_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_14_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_15_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_16_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_17_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_18_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_19_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_20_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_21_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_22_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_23_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_24_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_25_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_26_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_27_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_28_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_29_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_30_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_31_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_32_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_33_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_34_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_35_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_36_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg", "https://imovirtualpt-images.akamaized.net/images_imovirtualpt/9267946_37_1280x1024_t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-_rev148.jpg"]
        self.assertEqual(page['images'], value)

    def test_extract_coordinates(self):
        page = read_test_file()
        value = [41.0773924, -8.6018271]
        self.assertEqual(page['coordinates'], value)

    def test_extract_bathrooms(self):
        page = read_test_file()
        value = 2
        self.assertEqual(page['bathrooms'], value)

    def test_extract_energy_certificate(self):
        page = read_test_file()
        value = "C"
        self.assertEqual(page['energyCertificate'], value)

    def test_extract_condition(self):
        page = read_test_file()
        value = "Usado"
        self.assertEqual(page['condition'], value)

    def test_extract_negotiable(self):
        page = read_test_file()
        value = u"Sim"
        self.assertEqual(page['negotiable'], value)

    
def main():
    unittest.main()

def read_test_file():
    with open('testfile.json') as json_data:
        return json.load(json_data)[0]

if __name__ == '__main__':
    main()

    