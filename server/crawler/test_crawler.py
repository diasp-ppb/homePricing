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
        value = {"town": u"Serzedo e Perosinho", "district": u"Porto"}
        self.assertDictEqual(page['address'], value)
    
    def test_extract_webpage(self):
        page = read_test_file()
        value = "https://www.imovirtual.com/anuncio/t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-IDExdA.html"
        self.assertEqual(page['webpage'], value)

    def test_extract_images(self):
        page = read_test_file()
        value = [u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6ImhmM2VudzNoYjdnbDEtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.tLJGIRG4kcM83bPZ7TUzq0MS3XcV4ZUaoAlnv5QiOQ0/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6ImM0NWE4eGlob25wcy1BUFQiLCJ3IjpbeyJmbiI6IjRqYWZwbDloM2ZndC1BUFQiLCJzIjoiMTQiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.USgnXMD0mz27P_Ctc_scvS2-lr0eQ6bjZifTo4JtYgM/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6IjRrOGM1bTNkNzQwcy1BUFQiLCJ3IjpbeyJmbiI6IjRqYWZwbDloM2ZndC1BUFQiLCJzIjoiMTQiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.kQ8osRWsh86qFtlL4su00iRDLwd723mhtklWCbuZFS4/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6IjA1djhoczRia2U2bzItQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.Xo_VaRXLbWnBjUwfj0GDTg-KxlAEb3CjeCeVHPoXobk/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6Ijc2cG5iYmczeWd3cy1BUFQiLCJ3IjpbeyJmbiI6IjRqYWZwbDloM2ZndC1BUFQiLCJzIjoiMTQiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.lqUcLIJ6gBiXdI5XNZKCjN5YX9ZIl1EhGSmYwpVfV1w/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6IjBvM3owb2VzN3g5azMtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.vIqnCcgHQ-swNr5zNwxPVV0lB3TX__MhN3P_Bb-ABBs/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6InJiYWRvcjZnMjU4dy1BUFQiLCJ3IjpbeyJmbiI6IjRqYWZwbDloM2ZndC1BUFQiLCJzIjoiMTQiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.s1qzrKFZuYOx7vKKeXNw_emX2V6ebGInJUaW4WHXAvE/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6Imk2NTgxamV4cjFidjEtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.c2qDkRkB14vAmx6ukuhuAONLDKOIH_2EmsiAsp6zKIA/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6ImNsMmRmdmI3d3diMjItQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.ZCB2XaPO_gVT8W2XM15DRwzKuAhsjH9w6GUif4-e01s/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6InY3eG8zNWEwMDhuZzMtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.SQOOJFXuwzFRmN4KzwpNhb7XCGlIU3NxWuURzbGziTw/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6IjBnbWNqOWE0NmM5ejItQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.KTwdgV5OvXOWpHDUh4oudcbyuM36hGvk3QfZeRu3ptk/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6ImVkY3owbnViMTJ1czMtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.sJ8ETzgtzEV6yszTag2bJKsuMCXPhnpNMTNAVA0sV-E/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6InUwN3Bvd2xiM2c0MDItQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.l7AqdRaxDR_CSRtq_2vLUTabian8SaY6CPadHGVsDfo/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6InVqN3EyZTFlZGcwOTMtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.90A51DZl_KYJ2ZcyzvP6oMaW5xPPrUH5CKhkxfS2veI/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6Im5rNWxvc2Y5cTNydi1BUFQiLCJ3IjpbeyJmbiI6IjRqYWZwbDloM2ZndC1BUFQiLCJzIjoiMTQiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.VyIF4tjRRlwjMieGNGaxJsE3IvPDFWRWGDzGH1JBElU/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6IjZldnMxeno3ZjB4NDMtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.FhqDTwhgv0uEZksqTx97-dXV1kBVp8kr5QIcGsDjhTc/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6InJuZ2ZmNTA4ZXZtYjItQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.K6h0TbT0kzSsNKsyyPG-tzIh7lWpttNpgjOC9hPE_ik/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6ImpsNXFkNjd1bzVxZjEtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.6EFg3YOlP0sMCioTV40qHOPYvaSfeOSQCrs87VBwfXw/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6Im1vY25oaHl6Y3pjYTItQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.CVIDFknN6X5CxTim7J7Bx5Zggg27eifCirJi1B-wiSc/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6Im5kN3Q4bXNqMDljbTMtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.pjePhcFxfP7KZVriKt8NIjzqufDsw3BGkyma7Xc1Q9w/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6ImFtdW9qM3F1em83cDItQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.r11GSUlu-wOtbIWTv1y7ER77au8CuGzMcBtSphIpMms/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6Im03M2hvcWlvenA0ci1BUFQiLCJ3IjpbeyJmbiI6IjRqYWZwbDloM2ZndC1BUFQiLCJzIjoiMTQiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.BDq1ySQS_mkpSd01n7aUQydnCIbMp-opllAsnVQDT7Y/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6ImNtOTI4ZzRrYXpubzMtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.zu9I9lWXsWJYktWBZfC2BmnhU8gZwlQWwR3zEUts8MU/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6IjVmeXdoOGFkY3lubi1BUFQiLCJ3IjpbeyJmbiI6IjRqYWZwbDloM2ZndC1BUFQiLCJzIjoiMTQiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.yne1lJaZHesb5RsJn470MbWCLzKJvvNnjhRGd9CxqaI/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6InVwN2xydnd0emtmNTItQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.XomQObTDLUr_r2O8qRbjIPbSqWqi21DZoX1C3KOlEjw/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6InRlZGZjanp5bjVqOTItQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.caODaGYeAKtg5Tz7Zan2TtLX_-B6TbJsu7po1pcqCKs/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6InVyZ2ZxY3BjOWVsbjMtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.B2kilmrb4GI0Qxnga1pMUW55cSstfDaNBRhPQCBs6Pc/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6ImlqamRlZnVkMzRmMTEtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.TgaIN7CXbBO_gNmC1CmgdazCs5mdLG6JfyLEEe1_v1g/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6ImdtcXcweG1odHRqYTEtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.-7VxzcrboHVZDatgNeh-6F--3C2lMLZXp7j45gS-7UI/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6IjFmMXpsNHBpNDRnYTItQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.c6h-HnzC5HPiYbM_bmvsdiMUb4wgX1523NqR1VhMj2Q/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6ImdramVtZzJtdjVlby1BUFQiLCJ3IjpbeyJmbiI6IjRqYWZwbDloM2ZndC1BUFQiLCJzIjoiMTQiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.hwIahEBUL1LcSGMsIeA3DOGvhV-Gmrq1kbCIF-o4yO0/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6Im1qOHpudzd4NHk0ZDMtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.gfunjiiPf8Zdwgnjuf4U6sdDAtbKsay1uqgxd2c3EC0/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6IjJwMmQ4dHNtMnJrbjItQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.pcjIFeYA-Q-Lyy7IGXpFTLk-uGVc9KvO1bzniATVZkE/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6Ing3c2kxaDVzcjFkMjItQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.-7UIa_jS-vs-rF8GelriguskU-LxZPVveJFW7yWI-j4/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6Imc5M2p5MHYxdDJmcjMtQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.uiX9rcFjbpEl1M6fjFCJCSmTHAaK5AhpTgX56CP0zGc/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6InI4NDV4bWxzbW1xYjItQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.M9SSsTQ9SF-zeZfHRMeZklTX29B2nuTVpqn9o0i2e2Q/image;s=1280x1024;q=80', u'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6ImQ5MTN4c212d2duNjItQVBUIiwidyI6W3siZm4iOiI0amFmcGw5aDNmZ3QtQVBUIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.fwh4C7fwXTNflf6FqmvJOxElD1TBo-t4B4ItuEHQOo8/image;s=1280x1024;q=80']
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

    def test_extract_selling_type(self):
        page = read_test_file()
        value = u"buy"
        self.assertEqual(page['selling_type'], value)
    
    def test_extract_house_type(self):
        page = read_test_file()
        value = u"apartment"
        self.assertEqual(page['property_type'], value)

    
def main():
    unittest.main()

def read_test_file():
    with open('testfile.json') as json_data:
        return json.load(json_data)[0]

if __name__ == '__main__':
    main()

    