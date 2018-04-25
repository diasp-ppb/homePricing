#!bin/sh

rm testfile.json
scrapy crawl imovirtual -a testing=True -a test_url="https://www.imovirtual.com/anuncio/t2-c-garagem-ind-e-arrumo-optimos-acabamentos-gaia-IDExdA.html#c3727fa678" -o testfile.json