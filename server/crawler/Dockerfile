FROM debian:stretch

WORKDIR /usr/src/app

RUN apt-get update && \
	apt-get install --assume-yes --no-install-recommends \
		gcc \
		libffi-dev \
		libssl-dev \
		libxml2-dev \
		libxslt1-dev \
		python-pip \
		python-dev \
		zlib1g-dev && \
	apt-get clean && \
	rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN pip install --upgrade pip
RUN	pip install --upgrade \
		setuptools \
		wheel && \
	pip install --upgrade scrapy

RUN pip install pymongo

RUN pip install html2text

CMD /bin/sh /usr/src/app/test-crawler.sh && /bin/sh /usr/src/app/run-crawler.sh