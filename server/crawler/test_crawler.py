import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
import unittest
import subprocess
import json

class ImovirtualCrawlerTests(unittest.TestCase):

    def test_extract_title(self):
        page = read_test_file()
        self.assertEqual(page['title'], "T2 C/Garagem Ind e Arrumo Óptimos Acabamentos-Gaia")
        
        
        

    
def main():
    subprocess.call(['./extract-test-file.sh'])
    unittest.main()

def read_test_file():
    with open('testfile.json') as json_data:
        return json.load(json_data)

if __name__ == '__main__':
    main()

    