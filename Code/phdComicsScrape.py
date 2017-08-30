from bs4 import BeautifulSoup
from urllib import urlretrieve
import urllib2
import re

for i in range(1748, 1967):

    url = "http://www.phdcomics.com/comics/archive.php?comicid=%d" %i
    html = urllib2.urlopen(url)
    content = html.read()
    soup = BeautifulSoup(content, "html.parser")


    if len(soup.find_all(lambda x:x.name=="meta" and re.match(".*gif", x.get('content')))) > 0:
        img = soup.find_all(lambda x:x.name=="meta" and re.match(".*gif", x.get('content')))[0].get('content')
        print "[+] Fetched Comic " + "%d" %i + ": " + img
        outfile = "/Users/sayantansarkar/Code/SayantanTribute/images/" + "%d" %i + ".gif"
        urlretrieve(img, outfile)
    print "done"